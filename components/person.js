const { toNumber, toDateString, today } = require('./date-transform.js');
const { changeEnding } = require('./cases.js');
const RC = require('./range.js');
const Department = require('./departments.js');

module.exports = class Person {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.clear();
  }
  clear() { this.person = null; this.person = {}; }
  isWithin(record, date) {
    return record.range.start <= date && date <= record.range.end;
  }
  isInputValid(personId, date, toCase) {
    if (!personId || typeof personId !== 'number') return false;
    if (!date || typeof date !== 'number') return false;
    return true;
  }
  get id() { return this.person ? this.person.id: null; }
  get birthdate() {
    if (!this.person.birthdate) return null;
    return toDateString(this.person.birthdate);
  }
  lastname(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date, toCase)) return;
    const id = this
      .filterInSource({ relevant: { personId }}, 'person-data')
      .find((r) => this.isWithin(r, date))
      .data.lastnameId;
    const endingSource = this.dispatcher.stateOf('lastname-endings');
    const result = this
      .findInSource({ id }, 'lastnames')
      .value;
    return changeEnding(result, endingSource, toCase);
  }
  firstname(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date, toCase)) return;
    const id = this
      .filterInSource({ relevant: { personId }}, 'person-data')
      .find((r) => this.isWithin(r, date))
      .data.firstnameId;
    const endingSource = this.dispatcher.stateOf('firstname-endings');
    const result = this
      .findInSource({ id }, 'firstnames')
      .value;
    return changeEnding(result, endingSource, toCase);
  }
  middlename(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date, toCase)) return;
    const id = this
      .filterInSource({ relevant: { personId }}, 'person-data')
      .find((r) => this.isWithin(r, date))
      .data.middlenameId;
    const endingSource = this.dispatcher.stateOf('middlename-endings');
    const result = this
      .findInSource({ id }, 'middlenames')
      .value;
    return changeEnding(result, endingSource, toCase);
  }
  fullname(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date, toCase)) return;
    return [
      this.lastname(personId, date, toCase),
      this.firstname(personId, date, toCase),
      this.middlename(personId, date, toCase)
    ].join(' ');
  }
  isValid() {
    return (
      this.person.lastnameId &&
      typeof this.person.lastnameId === 'number' &&
      this.person.firstnameId &&
      typeof this.person.firstnameId === 'number' &&
      this.person.middlenameId &&
      typeof this.person.middlenameId === 'number' &&
      this.person.birthdate &&
      typeof this.person.birthdate === 'number' &&
      this.person.gender
    );
  }
  setLastname(l) {
    if (!this.person.lastnameId) {
      this.person.lastnameId = this.findInSource({ value: l}, 'lastnames').id;
    }
    return this;
  }
  setFirstname(f) {
    if (!this.person.firstnameId) {
      this.person.firstnameId = this.findInSource({ value: f}, 'firstnames').id;
    }
    return this;
  }
  setMiddlename(m) {
    if (!this.person.middlenameId) {
      this.person.middlenameId = this.findInSource({ value: m}, 'middlenames').id;
    }
    return this;
  }
  setBirthdate(b) {
    if (!this.person.birthdate) this.person.birthdate = toNumber(b);
    return this;
  }
  setGender(gender) {
    if (!['мужской', 'женский'].includes(gender)) return;
    if (!this.person.gender) this.person.gender = gender;
    return this;
  }
  createPerson() {
    if (!this.isValid) return;
    this.registerPerson();
    this.clear();
    return true;
  }
  registerData(relevant, data, range, dataSourceName) {
    if (!dataSourceName) return;
    if (!range) return;
    if (!range.end) range.end = 2958525;
    this.dispatcher.add({ relevant, data, range }, dataSourceName);
  }
  registerPerson() {
    if (!this.isValid()) return;
    const id = this.dispatcher.stateOf('persons').length + 1;
    this.dispatcher.add({ id }, 'persons');
    this.dispatcher.add(
      {
        relevant: { personId: id },
        data: {
          lastnameId: this.person.lastnameId,
          firstnameId: this.person.firstnameId,
          middlenameId: this.person.middlenameId,
          birthdate: this.person.birthdate,
          gender: this.person.gender
        },
        range: { start: this.person.birthdate, end: 2958525 }
      },
      'person-data'
    );
  }
  filterInSource(config, dataSourceName) {
    return this.dispatcher.filterInSource(config, dataSourceName);
  }
  findInSource(config, dataSourceName) {
    return this.dispatcher.findInSource(config, dataSourceName);
  }
  registerAddress(personId, address, range) {
    if (!personId || !address || !range || !range.start) return;
    if (!range.end) range.end = 2958525;
    this.registerData(
      { personId },
      { ...address },
      range,
      'address-data'
    );
  }
  raiseRange(personId, rangeId, start) {
    if (!personId || !rangeId || !start) return;
    this
        .dispatcher
        .getDataSource('person-ranges')
        .source
        .fixRanges({ relevant: { personId }, range: { start, end: 2958525}});
    this.dispatcher.add(
      {
        relevant: { personId, rangeId },
        range: { start, end: 2958525 }
      },
      'person-ranges'
    );
  }
  getRange(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date, toCase)) return;
    const result = this
      .dispatcher
      .filterInSource({ relevant: { personId }}, 'person-ranges')
      .find((r) => r.range.start <= date && date <= r.range.end);
    if (!result) return;
    return (new RC(this.dispatcher)).getRange(result.relevant.rangeId, toCase);
  }
  getPersonFullname(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date, toCase)) return;
    const result = this
      .dispatcher
      .filterInSource({ relevant: { personId }}, 'person-data')
      .find((r) => r.range.start <= date && date <= r.range.end);
    if (!result) return;
    P.loadPerson({...result, _id: result.relevant.personId });
    return P.fullname(toCase);
  }
  getPosition(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date, toCase)) return;
    const result = this
      .dispatcher
      .filterInSource({ relevant: { personId }}, 'position-service')
      .find((r) => r.range.start <= date && date <= r.range.end);
    if (!result) return;
    return (new Department(this.dispatcher)).getPositionFullname(result.relevant.positionId, toCase);
  }
  getRangeFullnamePosition(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date, toCase)) return;
    return [
      this.getRange(personId, date, toCase),
      this.fullname(personId, date, toCase) + ',',
      this.getPosition(personId, date, toCase)
    ].join(' ');
  }
  addServicePeriod(service, range) {
    if (!range.start) return;
    if (!range.end) range.end = 2958525;
    if (!service.typeId) return;
    if (!service.exemptionMultiplyer) service.exemptionMultiplyer = 1;
    this.registerData(
      { personId: this.id },
      { ...service },
      { ...range },
      'service'
    );
  }
}
