const Address = require("./address.js");
const { toNumber, toDateString, today } = require("./date-transform.js");
const { getCase } = require("./cases.js");

module.exports = class Institution {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.clear();
  }
  clear() {
    this.institution = null;
    this.institution = {};
  }
  setPropertyToInstitution(property, value) {
    if (this.institution[property]) return this;
    if (
      ["nominative", "dative", "genitive", "accusative"].every((c) =>
        value[c] ? true : false
      )
    ) {
      this.institution[property] = value;
    }
    return this;
  }
  getIdOf(value, source) {
    const result = this.dispatcher.findInSource(value, source);
    if (!result)
      this.dispatcher.add(
        {
          ...value,
          id: this.dispatcher.stateOf(source).length + 1,
        },
        source
      );
    return result ? result.id : this.dispatcher.stateOf(source).length;
  }
  isWithin(record, date) {
    return record.range.start <= date && date <= record.range.end;
  }
  getData(id, date = toNumber(today())) {
    if (!id || typeof id !== "number" || typeof date !== "number") return;
    return this.dispatcher
      .filterInSource({ relevant: { institutionId: id } }, "institution-data")
      .find((r) => this.isWithin(r, date));
  }
  getName(institutionId, date = toNumber(today()), toCase) {
    if (!this.getData(institutionId, date)) return;
    const result = this.dispatcher.findInSource(
      { id: this.getData(institutionId, date).data.nameId },
      "institution-names"
    );
    return result ? result[getCase(toCase)] : null;
  }
  getType(institutionId, date = toNumber(today()), toCase) {
    if (!this.getData(institutionId, date)) return;
    const result = this.dispatcher.findInSource(
      { id: this.getData(institutionId, date).data.typeId },
      "institution-types"
    );
    return result ? result[getCase(toCase)] : null;
  }
  getInstitutionIdBy(positionId) {
    let d = this.dispatcher.findInSource(
      { data: { id: positionId } },
      "positions"
    );
    do {
      if (d.relevant.institutionId) return d.relevant.institutionId;
      d = this.dispatcher.findInSource(
        { relevant: { departmentId: d.relevant.departmentId } },
        "departments"
      );
    } while (d);
  }
  setName(name) {
    return this.setPropertyToInstitution("name", name);
  }
  setType(type) {
    return this.setPropertyToInstitution("type", type);
  }
  setCallSign(callSign) {
    if (!this.institution.callSign) this.institution.callSign = callSign;
    return this;
  }
  createInstitutionData(start = toNumber(today())) {
    this.dispatcher.add(
      { id: this.dispatcher.stateOf("institutions").length + 1 },
      "institutions"
    );
    this.dispatcher.add(
      {
        relevant: {
          institutionId: this.dispatcher.stateOf("institutions").length,
        },
        data: {
          nameId: this.getIdOf(this.institution.name, "institution-names"),
          typeId: this.getIdOf(this.institution.type, "institution-types"),
        },
        range: { start, end: 2958525 },
      },
      "institution-data"
    );
    this.clear();
  }
  setAddressTo(institutionId, address, start) {
    if (!institutionId || !address || !start) return;
    this.dispatcher.add(
      {
        relevant: { institutionId },
        data: { ...address },
        range: { start, end: 2958525 },
      },
      "address-data"
    );
  }
  getAddress(institutionId, date = toNumber(today())) {
    const data = this.dispatcher
      .filterInSource({ relevant: { institutionId } }, "address-data")
      .find((r) => this.isWithin(r, date));
    if (!data) return "";
    return new Address(this.dispatcher, { ...data.data }).address;
  }
};
