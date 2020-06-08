module.exports = class Address {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  addressSourceName(element) {
    return element[element.length - 1] !== "y"
      ? element + "s"
      : element.substring(0, element.length - 1) + "ies";
  }
  getAddressElement(type, id) {
    return this.dispatcher
      .stateOf(this.addressSourceName(type))
      .find((e) => e.id === id);
  }
  getNameById(property, id) {
    const result = this.getAddressElement(property, id);
    return result ? result.name : null;
  }
  getAddress({
    zipcode,
    regionId,
    areaId,
    cityId,
    localityId,
    streetId,
    house,
    building,
    apartment,
  }) {
    return [
      zipcode,
      this.getNameById("region", regionId),
      areaId ? this.getNameById("area", areaId) : null,
      cityId ? this.getNameById("city", cityId) : null,
      localityId ? this.getNameById("locality", localityId) : null,
      streetId ? this.getNameById("street", streetId) : null,
      house ? "д. " + house : null,
      building ? "корп. " + building : null,
      apartment ? "кв. " + apartment : null,
    ]
      .filter((e) => (e ? true : false))
      .join(", ");
  }
  getElementId(property, value) {
    const result = this.dispatcher
      .stateOf(this.addressSourceName(property))
      .find((r) => r.name === value);
    return result ? result.id : null;
  }
  regionId(region) {
    return this.getElementId("region", region);
  }
  areaId(area) {
    return this.getElementId("area", area);
  }
  cityId(city) {
    return this.getElementId("city", city);
  }
  localityId(locality) {
    return this.getElementId("locality", locality);
  }
  streetId(street) {
    return this.getElementId("street", street);
  }
  registerAddress({
    zipcode,
    region,
    area,
    city,
    locality,
    street,
    house,
    building,
    apartment,
  }) {
    if (!zipcode || !this.regionId(region)) return null;
    const result = { zipcode, regionId: this.regionId(region) };
    if (this.areaId(area)) result.areaId = this.areaId(area);
    if (this.cityId(city)) result.cityId = this.cityId(city);
    if (this.localityId(locality))
      result.localityId = this.localityId(locality);
    if (this.streetId(street)) result.streetId = this.streetId(street);
    if (house) result.house = house;
    if (building) result.building = building;
    if (apartment) result.apartment = apartment;
    return result;
  }
};
