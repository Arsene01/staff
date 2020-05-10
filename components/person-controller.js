const Searcher = require('./searcher.js');
const Endings = require('./case-endings.js')

class Person {
  constructor(lastnameId, firstnameId, middlenameId, birthdate) {
    this.lastnameId = lastnameId;
    this.firstnameId = firstnameId;
    this.middlenameId = middlenameId;
    this.birthdate = birthdate;
  }
  getId() { return this.id; }
  getLastnameId() { return this.lastnameId; }
  getFirstnameId() { return this.firstnameId; }
  getMiddlenameId() { return this.middlenameId; }
  getBirthdate() { return this.birthdate; }
}

class PersonDataController {
  constructor(
    lastnameEnumeration,
    firstnameEnumeration,
    middlenameEnumeration
  ) {
    this.lastnameSource = Searcher.createSearcher(lastnameEnumeration);
    this.firstnameSource = Searcher.createSearcher(firstnameEnumeration);
    this.middlenameSource = Searcher.createSearcher(middlenameEnumeration);
  }
  getLastnameById(lastnameId) {
    const element = this.lastnameSource.getDataById(lastnameId);
    return element ? element : null;
  }
  getFirstnameById(firstnameId) {
    const element = this.firstnameSource.getDataById(firstnameId);
    return element ? element : null;
  }
  getMiddlenameById(middlenameId) {
    const element = this.middlenameSource.getDataById(middlenameId);
    return element ? element : null;
  }
  findLastname(lastname) {
    return this.lastnameSource.find(lastname);
  }
  findFirstname(firstname) {
    return this.firstnameSource.find(firstname);
  }
  findMiddlename(middlename) {
    return this.middlenameSource.find(middlename);
  }
}

class PersonController {
  constructor(personDataController, endings) {
    this.personDataController = personDataController;
    this.endings = endings;
  }

  getLastname(person, inCase) {
    const lastname = this.personDataController.getLastnameById(person.getLastnameId());
    if ([ 'nominative', 'dative', 'genitive'].includes(inCase)) {
      const end = lastname
        .substring(lastname.length - 3, lastname.length)
        .toLowerCase();
      const newEnding = this.endings.lastnameEndings
        .find(endingObject => endingObject.nominative === end);
      if (newEnding) return lastname.substring(0, lastname.length - 3) + newEnding[inCase];
      return null;
    }
    return lastname;
  }
  getFirstname(person, inCase) {
    const firstname = this.personDataController.getFirstnameById(person.getFirstnameId());
    if ([ 'nominative', 'dative', 'genitive'].includes(inCase)) {
      const end = firstname
        .substring(firstname.length - 3, firstname.length)
        .toLowerCase();
      const newEnding = this.endings.firstnameEndings
        .find(endingObject => endingObject.nominative === end);
      if (newEnding) return firstname.substring(0, firstname.length - 3) + newEnding[inCase];
      return null;
    }
    return firstname;
  }
  getMiddlename(person, inCase) {
    const middlename = this.personDataController.getMiddlenameById(person.getMiddlenameId());
    if ([ 'nominative', 'dative', 'genitive'].includes(inCase)) {
      const end = middlename
        .substring(middlename.length - 3, middlename.length)
        .toLowerCase();
      const newEnding = this.endings.middlenameEndings
        .find(endingObject => endingObject.nominative === end);
      if (newEnding) return middlename.substring(0, middlename.length - 3) + newEnding[inCase];
      return null;
    }
    return middlename;
  }
  getFullName(person, inCase) {
    return [
      this.getLastname(person, inCase),
      this.getFirstname(person, inCase),
      this.getMiddlename(person, inCase)
    ].join(' ');
  }
  getBirthdate(person) {
    const d = new Date('1900-01-01T00:00:00');
    d.setDate(d.getDate() + person.getBirthdate() - 2);
    return [
      (d.getDate() < 10 ? '0': '') + d.getDate(),
      (d.getMonth() < 9 ? '0': '') + (d.getMonth() + 1),
      d.getFullYear()
    ].join('.');
  }

  findLastname(lastname) {
    return this.personDataController.findLastname(lastname);
  }
  findFirstname(firstname) {
    return this.personDataController.findFirstname(firstname);
  }
  findMiddlename(middlename) {
    return this.personDataController.findMiddlename(middlename);
  }
}

const createPersonController = (personDataController, endings) => new PersonController(personDataController, endings);
const createPersonDataController = (lastnames, firstnames, middlenames) => {
  return new PersonDataController(lastnames, firstnames, middlenames);
}
const createPerson = (lastnameId, firstnameId, middlenameId, birthdateNumber) => {
  return new Person(lastnameId, firstnameId, middlenameId, birthdateNumber);
}

exports.createPersonController = createPersonController;
exports.createPersonDataController = createPersonDataController;
exports.createPerson = createPerson;
