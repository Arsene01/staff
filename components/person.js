const { toNumber, toDateString, today } = require("./date-transform.js");
const { changeEnding } = require("./cases.js");
const { isWithin } = require("./utils.js");
const RC = require("./range.js");
const Department = require("./departments.js");

module.exports = class Person {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
    this.clear();
  }
  clear() {
    this.person = {};
  }
  isInputValid(personId, date) {
    if (!personId || typeof personId !== "number") return false;
    if (!date || typeof date !== "number") return false;
    return true;
  }
  getNamePart(part, personId, date, toCase) {
    const id = this.filterInSource(
      { relevant: { personId } },
      "person-data"
    ).find((r) => isWithin(r, date)).data[`${part}Id`];
    const endingSource = this.dispatcher.stateOf(`${part}-endings`);
    const result = this.findInSource({ id }, `${part}s`).value;
    return changeEnding(result, endingSource, toCase);
  }
  lastname(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date)) return;
    return this.getNamePart("lastname", personId, date, toCase);
  }
  firstname(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date)) return;
    return this.getNamePart("firstname", personId, date, toCase);
  }
  middlename(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date)) return;
    return this.getNamePart("middlename", personId, date, toCase);
  }
  fullname(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date)) return;
    return [
      this.lastname(personId, date, toCase),
      this.firstname(personId, date, toCase),
      this.middlename(personId, date, toCase),
    ].join(" ");
  }
  isValid() {
    return (
      this.person.lastnameId &&
      typeof this.person.lastnameId === "number" &&
      this.person.firstnameId &&
      typeof this.person.firstnameId === "number" &&
      this.person.middlenameId &&
      typeof this.person.middlenameId === "number" &&
      this.person.birthdate &&
      typeof this.person.birthdate === "number" &&
      this.person.gender
    );
  }
  setNamePart(part, value) {
    if (!this.person[`${part}Id`]) {
      this.person[`${part}Id`] = this.findInSource({ value }, `${part}s`).id;
    }
  }
  setLastname(l) {
    this.setNamePart("lastname", l);
    return this;
  }
  setFirstname(f) {
    this.setNamePart("firstname", f);
    return this;
  }
  setMiddlename(m) {
    this.setNamePart("middlename", m);
    return this;
  }
  setBirthdate(b) {
    if (!this.person.birthdate) this.person.birthdate = toNumber(b);
    return this;
  }
  setGender(gender) {
    if (!["мужской", "женский"].includes(gender)) return;
    if (!this.person.gender) this.person.gender = gender;
    return this;
  }
  createPerson() {
    if (!this.isValid) return;
    this.registerPerson();
    this.clear();
    return true;
  }
  registerPerson() {
    if (!this.isValid()) return;
    const id = this.dispatcher.addAndGetId("persons");
    this.dispatcher.add(
      {
        relevant: { personId: id },
        data: { ...this.person },
        range: { start: this.person.birthdate, end: 2958525 },
      },
      "person-data"
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
    this.dispatcher.add(
      {
        relevant: { personId },
        data: { ...address },
        range,
      },
      "address-data"
    );
  }
  raiseRange(personId, rangeId, start) {
    if (!personId || !rangeId || !start) return;
    this.dispatcher.getDataSource("person-ranges").source.fixRanges({
      relevant: { personId },
      range: { start, end: 2958525 }
    });
    this.dispatcher.add(
      {
        relevant: { personId, rangeId },
        range: { start, end: 2958525 },
      },
      "person-ranges"
    );
  }
  getRange(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date)) return;
    const result = this.dispatcher
      .filterInSource({ relevant: { personId } }, "person-ranges")
      .find((r) => isWithin(r, date));
    if (!result) return;
    return new RC(this.dispatcher).getRange(result.relevant.rangeId, toCase);
  }
  getPosition(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date)) return;
    const result = this.dispatcher
      .filterInSource({ relevant: { personId } }, "position-service")
      .find((r) => isWithin(r, date));
    if (!result) return;
    return new Department(this.dispatcher).getPositionFullname(
      result.relevant.positionId,
      toCase
    );
  }
  getRangeFullnamePosition(personId, date = toNumber(today()), toCase) {
    if (!this.isInputValid(personId, date)) return;
    return [
      this.getRange(personId, date, toCase),
      this.fullname(personId, date, toCase) + ",",
      this.getPosition(personId, date, toCase),
    ].join(" ");
  }
  setPersonalNumber(personId, personalNumber, start = toNumber(today())) {
    if (!personId || !personalNumber || !start) return;
    if (!personalNumber.match(/^[А-Я]{1,2}\-\d{6}$/)) return;
    this.dispatcher.add(
      {
        relevant: { personId },
        data: { personalNumber },
        range: { start, end: 2958525 },
      },
      "personal-numbers"
    );
  }
  getPersonalNumber(personId, date = toNumber(today())) {
    return this.filterInSource(
      { relevant: { personId } },
      "personal-numbers"
    ).find((r) => isWithin(r, date)).data.personalNumber;
  }
  addServicePeriod(personId, service, range) {
    if (!range.start) return;
    if (!range.end) range.end = 2958525;
    if (!service.typeId) return;
    if (!service.exemptionMultiplyer) service.exemptionMultiplyer = 1;
    this.dispatcher.add(
      {
        relevant: { personId },
        data: { ...service },
        range,
      },
      "service"
    );
  }  
};
