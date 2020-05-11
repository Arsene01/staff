const { toNumber, toDateString } = require('./date-transform.js');
const { changeEnding } = require('./cases.js')

module.exports = class Person {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.clear();
  }
  clear() { this.person = null; }
  get id() { return this.person ? this.person._id: null; }
  get birthdate() {
    if (!this.person._birthdate) return null;
    return toDateString(this.person._birthdate);
  }
  lastname(toCase) {
    if (!this.isValid()) return null;
    const endingSource = this.dispatcher.stateOf('lastname-endings');
    const result = this
      .findInSource({ id: this.person._lastnameId }, 'lastnames')
      .value;
    return changeEnding(result, endingSource, toCase);
  }
  firstname(toCase) {
    if (!this.isValid()) return null;
    const endingSource = this.dispatcher.stateOf('firstname-endings');
    const result = this
      .findInSource({ id: this.person._firstnameId }, 'firstnames')
      .value;
    return changeEnding(result, endingSource, toCase);
  }
  middlename(toCase) {
    if (!this.isValid()) return null;
    const endingSource = this.dispatcher.stateOf('middlename-endings');
    const result = this
      .findInSource({ id: this.person._middlenameId }, 'middlenames')
      .value;
    return changeEnding(result, endingSource, toCase);
  }
  fullname(toCase) {
    if (!this.isValid()) return null;
    return [
      this.lastname(toCase),
      this.firstname(toCase),
      this.middlename(toCase)
    ].join(' ');
  }
  isValid() {
    return (
      this.person._lastnameId &&
      typeof this.person._lastnameId === 'number' &&
      this.person._firstnameId &&
      typeof this.person._firstnameId === 'number' &&
      this.person._middlenameId &&
      typeof this.person._middlenameId === 'number' &&
      this.person._birthdate &&
      typeof this.person._birthdate === 'number'
    );
  }
  setLastname(l) {
    if (this.lastnameId) return;
    this.person._lastnameId = this.findInSource({ value: l}, 'lastnames').id;
  }
  setFirstname(f) {
    if (this.firstnameId) return;
    this.person._firstnameId = this.findInSource({ value: f}, 'firstnames').id;
  }
  setMiddlename(m) {
    if (this.middlenameId) return;
    this.person._middlenameId = this.findInSource({ value: m}, 'middlenames').id;
  }
  set birthdate(b) {
    if (this.birthdateId) return;
    this.person._birthdate = toNumber(b);
  }
  newPerson() { this.person = {}; }
  registerData(data, range, dataSourceName) {
    if (!dataSourceName) return;
    if (!range) return;
    if (!range.end) range.end = 2958525;
    this.dispatcher.add({ data, range }, dataSourceName);
  }
  registerPerson() {
    if (!this.isValid()) return;
    const id = this.dispatcher.stateOf('persons').length + 1;
    this.dispatcher.add({ id }, 'persons');
    this.person._id = id;
    this.registerData(
      this.person,
      { start: this.person._birthdate },
      'personData'
    );
  }
  loadPerson(person) {
    this.clear();
    this.person = person;
  }
  filterInSource(config, dataSourceName) {
    return this.dispatcher.filterInSource(config, dataSourceName);
  }
  findInSource(config, dataSourceName) {
    return this.dispatcher.findInSource(config, dataSourceName);
  }
}
