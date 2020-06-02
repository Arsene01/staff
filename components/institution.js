const { toNumber, toDateString, today } = require('./date-transform.js');

module.exports = class Institution {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.clear();
  }
  clear() { this.institution = null; this.institution = {}; }
  setName(name) {
    if (this.institution.name) return this;
    if (['nominative', 'dative', 'genitive', 'accusative'].every((c) =>  name[c] ? true: false)) {
      this.institution.name = name;
    }
    return this;
  }
  setType(type) {
    if (this.institution.type) return this;
    if (['nominative', 'dative', 'genitive', 'accusative'].every((c) =>  type[c] ? true: false)) {
      this.institution.type = type;
    }
    return this;
  }
  setHeadPosition(headPosition) {
    if (this.institution.headPosition) return this;
    if (['nominative', 'dative', 'genitive', 'accusative'].every((c) =>  headPosition[c] ? true: false)) {
      this.institution.headPosition = headPosition;
    }
    return this;
  }
  setHeadName(headName) {
    if (this.institution.headName) return this;
    if (['lastname', 'firstname', 'middlename'].every((n) =>  headName[n] ? true: false)) {
      this.institution.headName = headName;
    }
    return this;
  }
  setCallSign(callSign) {
    if (!this.institution.callSign) return this.institution.callSign = callSign;
    return this;
  }
}
