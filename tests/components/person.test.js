const Person = require('./../../components/person.js');
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
  test("registerPersonData method testing...", () => {
    p.registerData(p.person, { start: p.person._birthdate }, 'personData');
    const state = p.dispatcher.getDataSource('personData').source.state;
    expect(state[0]).toEqual({
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
    p.dispatcher.getDataSource('personData').source._state = [];
    p.dispatcher.getDataSource('persons').source._state = [];
    p.registerPerson();
    const state = p.dispatcher.getDataSource('persons').source.state;
    const pd = p.dispatcher.getDataSource('personData').source.state;

    expect(pd[0]).toEqual({
      data: {
        _id: 1,
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
      { data: { _id: 1, _lastnameId: 761 }},
      'personData'
    );
    expect(persons[0]).toEqual({
      data: {
        _id: 1,
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
    const persons = p.filterInSource(
      { data: { _id: 1, _lastnameId: 761 }},
      'personData'
    );
    const person = persons[0].data
    p.loadPerson(person);
    expect(p.fullname()).toEqual('Кобелев Арсен Владимирович');
  });
});
