module.exports = class Address {
  constructor(registration, dispatcher) {
    this.registration = registration;
    this.dispatcher = dispatcher;
  }
  get region() {
    return this
      .dispatcher
      .stateOf('regions')
      .find((r) => r.id === registration.regionId);
  }
  get area() {
    return this
      .dispatcher
      .stateOf('areas')
      .find((a) => a.id === registration.areaId);
  }
  get city() {
    return this
      .dispatcher
      .stateOf('cities')
      .find((c) => c.id === registration.cityId);
  }
  get locality() {
    return this
      .dispatcher
      .stateOf('localities')
      .find((l) => l.id === registration.localityId);
  }
  get street() {
    return this
      .dispatcher
      .stateOf('streets')
      .find((s) => s.id === registration.streetId);
  }
  get house() {
    if (!this.registration.house) return null;
    return this.registration.house;
  }
  get building() {
    if (!this.registration.building) return null;
    return this.registration.building;
  }
  get apartment() {
    if (!this.registration.apartment) return null;
    return this.registration.apartment;
  }
  get address() {
    return [
      this.region,
      this.area,
      this.city,
      this.locality,
      this.street,
      this.house,
      this.building,
      this.apartment
    ].filter((e) => e ? true : false).join(', ');
  }
  regionId(region) {
    const result = this.dispatcher.stateOf('regions').find((r) => r.name === region);
    return result ? result.id : null;
  }
  areaId(area) {
    const result = this.dispatcher.stateOf('areas').find((a) => a.name === area);
    return result ? result.id : null;
  }
  cityId(city) {
    const result = this.dispatcher.stateOf('cities').find((c) => c.name === city);
    return result ? result.id : null;
  }
  localityId(locality) {
    const result = this.dispatcher.stateOf('localities').find((l) => l.name === locality);
    return result ? result.id : null;
  }
  streetId(street) {
    const result = this.dispatcher.stateOf('streets').find((s) => s.name === street);
    return result ? result.id : null;
  }
  registerAddress(
    { region, area, city, locality, street, house, building, apartment }
  ) {
    if (!this.regionId(region)) return null;
    const result = { regionId: this.regionId(region) };
    if (this.areaId(area)) result.areaId = this.areaId(area);
    if (this.cityId(city)) result.cityId = this.cityId(city);
    if (this.localityId(locality)) result.localityId = this.localityId(locality);
    if (this.streetId(street)) result.streetId = this.streetId(street);
    if (house) result.house = house;
    if (building) result.building = building;
    if (apartment) result.apartment = apartment;
    return result;    
  }
}
