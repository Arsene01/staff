module.exports = class Address {
  static getAddress(
    dispatcher,
    { regionId, areaId, rest }
  ) {
    const address = [];
    const state = dispatcher.stateOf('address-data');
    const region = state.find((r) => r.id === regionId);
    if (!region) return null;
    address.push(region.name);
    if (areaId && region.areas) address.push(region.areas.find((a) => a.id === areaId).name);
    if (rest) address.push(rest);
    return address.join(', ');
  }
}
