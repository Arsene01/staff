module.exports = class Address {
  static getAddress(
    { regionId, areaId, rest },
    dispatcher
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
  static registerAddress(address, dispatcher) {
    const state = dispatcher.stateOf('address-data');
    const reg = address.split(', ');
    const region = state.find((r) => r.name === reg[0]);
    if (!region) return null;
    return { regionId: region.id, rest: reg.slice(1).join(', ') };
  }
}
