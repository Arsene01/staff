module.exports = class Address {
  constructor(dispatcher, registration = {}) {
    this.dispatcher = dispatcher;
    this.registration = registration;
  }
  addressSourceName(element) {
    return element[element.length - 1] !== "y"
      ? element + "s"
      : element.substring(0, element.length - 1) + "ies";
  }
  getAddressElement(element) {
    return this.dispatcher
      .stateOf(this.addressSourceName(element))
      .find((e) => e.id === this.registration[`${element}Id`]);
  }
  get region() {
    return this.getAddressElement("region");
  }
  get area() {
    return this.getAddressElement("area");
  }
  get city() {
    return this.getAddressElement("city");
  }
  get locality() {
    return this.getAddressElement("locality");
  }
  get street() {
    return this.getAddressElement("street");
  }
  get house() {
    if (!this.registration.house) return null;
    return `д. ${this.registration.house}`;
  }
  get building() {
    if (!this.registration) return null;
    if (!this.registration.building) return null;
    return `корп. ${this.registration.building}`;
  }
  get apartment() {
    if (!this.registration.apartment) return null;
    return `кв. ${this.registration.apartment}`;
  }
  get zipcode() {
    return this.registration.zipcode ? this.registration.zipcode : null;
  }
  get address() {
    return [
      this.zipcode,
      this.region ? this.region.name : null,
      this.area ? this.area.name : null,
      this.city ? this.city.name : null,
      this.locality ? this.locality.name : null,
      this.street ? this.street.name : null,
      this.house,
      this.building,
      this.apartment,
    ]
      .filter((e) => (e ? true : false))
      .join(", ");
  }
  regionId(region) {
    const result = this.dispatcher
      .stateOf("regions")
      .find((r) => r.name === region);
    return result ? result.id : null;
  }
  areaId(area) {
    const result = this.dispatcher
      .stateOf("areas")
      .find((a) => a.name === area);
    return result ? result.id : null;
  }
  cityId(city) {
    const result = this.dispatcher
      .stateOf("cities")
      .find((c) => c.name === city);
    return result ? result.id : null;
  }
  localityId(locality) {
    const result = this.dispatcher
      .stateOf("localities")
      .find((l) => l.name === locality);
    return result ? result.id : null;
  }
  streetId(street) {
    const result = this.dispatcher
      .stateOf("streets")
      .find((s) => s.name === street);
    return result ? result.id : null;
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
    if (!zipcode) return null;
    if (!this.regionId(region)) return null;
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
