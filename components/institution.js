const { toNumber, toDateString, today } = require('./date-transform.js');

module.exports = class Institution {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.clear();
  }
  clear() { this.institution = null; this.institution = {}; }
  setPropertyToInstitution(property, value) {
    if (this.institution[property]) return this;
    if (['nominative', 'dative', 'genitive', 'accusative'].every((c) =>  value[c] ? true: false)) {
      this.institution[property] = value;
    }
    return this;
  }
  getIdOf(value, source) {
    const result = this.dispatcher.findInSource(value, source);
    return result ? result.id : this.dispatcher.stateOf(source).length + 1;
  }
  setName(name) {
    return this.setPropertyToInstitution('name', name);
  }
  setType(type) {
    return this.setPropertyToInstitution('type', type);
  }
  setCallSign(callSign) {
    if (!this.institution.callSign) this.institution.callSign = callSign;
    return this;
  }
  createInstitution(start = toNumber(today())) {
    return {
      relevant: {
        institutionId: this.dispatcher.stateOf('institutions').length + 1
      },
      data: {
        nameId: this.getIdOf(this.getIdOf(this.institution.name, 'institution-names')),
        typeId: this.getIdOf(this.institution.type, 'institution-types')
      },
      range: { start, end: 2958525 }
    };
  }
  setAddressTo(institutionId, address, start) {
    if (!institutionId || !address || !start) return;
    if (!range.end) range.end = 2958525;
    this.dispatcher.add(
      {
        relevant: { institutionId },
        data: {...address},
        range: { start, end: 2958525 }
      },
      'address-data'
    );
  }
}
