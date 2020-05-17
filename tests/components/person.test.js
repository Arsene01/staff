const Person = require('./../../components/person.js');
const Address = require('../../components/address.js');
const Dispatcher = require('./../../dispatcher.js');

describe("Person class testing...", () => {
  const p = new Person(new Dispatcher());
  test("newPerson method testing...", () => {
    p.newPerson();
    expect(p.person).toEqual({});
  });
  test("clear method testing...", () => {
    p.clear();
    expect(p.person).toEqual(null);
  });
  test("setLastname method testing...", () => {
    p.newPerson();
    p.setLastname('Кобелев');
    expect(p.person._lastnameId).toEqual(761);
  });
  test("setFirstname method testing...", () => {
    p.setFirstname('Арсен');
    expect(p.person._firstnameId).toEqual(104);
  });
  test("setMiddlename method testing...", () => {
    p.setMiddlename('Владимирович');
    expect(p.person._middlenameId).toEqual(103);
  });
  test("birthdate setter testing...", () => {
    p.birthdate = '11.12.1990';
    expect(p.person._birthdate).toEqual(33218);
  });
  test("lastname method testing...", () => {
    expect(p.lastname()).toEqual('Кобелев');
  });
  test("lastname method testing...", () => {
    expect(p.lastname('genitive')).toEqual('Кобелева');
  });
  test("lastname method testing...", () => {
    expect(p.lastname('dative')).toEqual('Кобелеву');
  });
  test("firstname method testing...", () => {
    expect(p.firstname()).toEqual('Арсен');
  });
  test("firstname method testing...", () => {
    expect(p.firstname('genitive')).toEqual('Арсена');
  });
  test("firstname method testing...", () => {
    expect(p.firstname('dative')).toEqual('Арсену');
  });
  test("middlename method testing...", () => {
    expect(p.middlename()).toEqual('Владимирович');
  });
  test("middlename method testing...", () => {
    expect(p.middlename('genitive')).toEqual('Владимировича');
  });
  test("middlename method testing...", () => {
    expect(p.middlename('dative')).toEqual('Владимировичу');
  });
  test("fullname method testing...", () => {
    expect(p.fullname()).toEqual('Кобелев Арсен Владимирович');
  });
  test("fullname method testing...", () => {
    expect(p.fullname('genitive')).toEqual('Кобелева Арсена Владимировича');
  });
  test("fullname method testing...", () => {
    expect(p.fullname('dative')).toEqual('Кобелеву Арсену Владимировичу');
  });
  test("birthdate getter testing...", () => {
    expect(p.birthdate).toEqual('11.12.1990');
  });
  test("registerData method testing...", () => {
    p.registerData(
      { personId: p.person.id },
      {
        _lastnameId: p.person._lastnameId,
        _firstnameId: p.person._firstnameId,
        _middlenameId: p.person._middlenameId,
        _birthdate: p.person._birthdate
      },
      { start: p.person._birthdate },
      'person-data'
    );
    const state = p.dispatcher.stateOf('person-data');
    expect(state[0]).toEqual({
      relevant: { personId: p.person.id },
      data: {
        _lastnameId: p.person._lastnameId,
        _firstnameId: p.person._firstnameId,
        _middlenameId: p.person._middlenameId,
        _birthdate: p.person._birthdate
      },
      range: {
        start: p.person._birthdate,
        end: 2958525
      }
    });
  });
  test("registerPerson method testing...", () => {
    p.dispatcher.getDataSource('person-data').source._state = [];
    p.dispatcher.getDataSource('persons').source._state = [];
    p.registerPerson();
    const state = p.dispatcher.stateOf('persons');
    const pd = p.dispatcher.stateOf('person-data');

    expect(pd[0]).toEqual({
      relevant: {
          personId: 1,
      },
      data: {
        _lastnameId: p.person._lastnameId,
        _firstnameId: p.person._firstnameId,
        _middlenameId: p.person._middlenameId,
        _birthdate: p.person._birthdate
      },
      range: {
        start: p.person._birthdate,
        end: 2958525
      }
    });
    expect(state[0]).toEqual({ id: 1});
  });
  test("filterInSource method testing...", () => {
    const persons = p.filterInSource(
      {
        relevant: { personId: 1 },
        data: { _lastnameId: 761 }
      },
      'person-data'
    );
    expect(persons[0]).toEqual({
      relevant: { personId: 1 },
      data: {
        _lastnameId: p.person._lastnameId,
        _firstnameId: p.person._firstnameId,
        _middlenameId: p.person._middlenameId,
        _birthdate: p.person._birthdate
      },
      range: {
        start: p.person._birthdate,
        end: 2958525
      }
    });
  });
  test("loadPerson method testing...", () => {
    const person = p.findInSource(
      {
        relevant: { personId: 1 },
        data: { _lastnameId: 761 }
      },
      'person-data'
    ).data;
    person._id = 1;
    p.loadPerson(person);
    expect(p.fullname()).toEqual('Кобелев Арсен Владимирович');
  });
  test("registerAddress method testing...", () => {
    const personObject = p.findInSource(
      {
        relevant: { personId: 1 },
        data: { _lastnameId: 761 }
      },
      'person-data'
    );
    const person = { ...personObject.data, _id: personObject.relevant.personId };
    p.loadPerson(person);
    const a = new Address({}, p.dispatcher);
    const address = a.registerAddress({
      region: 'Республика Адыгея',
      city: 'Майкоп',
      street: 'Юннатов',
      house: 2,
      apartment: 64
    });
    p.dispatcher.getDataSource('address-data').source.state = [];
    const r = p.registerAddress(address);
    const state = p.dispatcher.stateOf('address-data');
    result = {
      relevant: { personId: 1 },
      data: {
        regionId: 4,
        cityId: 218,
        streetId: 152721,
        house: 2,
        apartment: 64
      },
      range: {
        start: p.person._birthdate,
        end: 2958525
      }
    };
    expect(state[0]).toEqual(result);
  });
});
