const Person = require('./../../components/person.js');
const Address = require('../../components/address.js');
const Dispatcher = require('./../../dispatcher.js');
const { toNumber } = require('../../components/date-transform.js')

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
  describe("lastname", () => {
    test("when input is not defined", () => {
      expect(p.lastname()).toEqual('Кобелев');
    });
    test("when input is 'genitive'", () => {
      expect(p.lastname('genitive')).toEqual('Кобелева');
    });
    test("when input is 'dative'", () => {
      expect(p.lastname('dative')).toEqual('Кобелеву');
    });
  });

  describe("firstname", () => {
    test("when input is not defined", () => {
      expect(p.firstname()).toEqual('Арсен');
    });
    test("when input is 'genitive'", () => {
      expect(p.firstname('genitive')).toEqual('Арсена');
    });
    test("when input is 'dative'", () => {
      expect(p.firstname('dative')).toEqual('Арсену');
    });
  });

  describe("middlename", () => {
    test("when input is not defined", () => {
      expect(p.middlename()).toEqual('Владимирович');
    });
    test("when input is 'genitive'", () => {
      expect(p.middlename('genitive')).toEqual('Владимировича');
    });
    test("when input is 'dative'", () => {
      expect(p.middlename('dative')).toEqual('Владимировичу');
    });
  });

  describe("fullname", () => {
    test("when input is not defined", () => {
      expect(p.fullname()).toEqual('Кобелев Арсен Владимирович');
    });
    test("when input is 'genitive'", () => {
      expect(p.fullname('genitive')).toEqual('Кобелева Арсена Владимировича');
    });
    test("when input is 'dative'", () => {
      expect(p.fullname('dative')).toEqual('Кобелеву Арсену Владимировичу');
    });
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
    const person = p.toPerson(
      p.findInSource(
        {
          relevant: { personId: 1 },
          data: { _lastnameId: 761 }
        },
        'person-data'
      )
    );
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
  test("addServicePeriod method testing...", () => {
    const person = p.toPerson(
      p.findInSource(
        {
          relevant: { personId: 1 },
          data: { _lastnameId: 761 }
        },
        'person-data'
      )
    );
    p.loadPerson(person);
    const data = {
      typeId: 1,
      exemptionMultiplyer: 1.5,
      organizationId: 1
    };
    p.addServicePeriod(data, { start: toNumber('26.12.2016')});
    const state = p.dispatcher.stateOf('service');
    result = {
      relevant: { personId: 1 },
      data: {
        typeId: 1,
        exemptionMultiplyer: 1.5,
        organizationId: 1
      },
      range: {
        start: 42730,
        end: 2958525
      }
    };
    expect(state[0]).toEqual(result);
  });

  describe("raiseRange", () => {
    test("when input not valid", () => {
      expect(p.raiseRange(1, 2)).toEqual(undefined);
    });
    test("when input is 'рядовой' since '26.12.2016'", () => {
      p.raiseRange(1, 1, toNumber('26.12.2016'));
      expect(p.dispatcher.stateOf('person-ranges')).toEqual([
        {
          relevant: { personId: 1, rangeId: 1 },
          range: { start: 42730, end: 2958525 }
        }
      ]);
    });
    test("when input is 'ефрейтор' since '01.06.2017'", () => {
      p.raiseRange(1, 2, toNumber('01.06.2017'));
      expect(p.dispatcher.stateOf('person-ranges')).toEqual([
        {
          relevant: { personId: 1, rangeId: 1 },
          range: { start: 42730, end: 42886 }
        },
        {
          relevant: { personId: 1, rangeId: 2 },
          range: { start: 42887, end: 2958525 }
        }
      ]);
    });
  });
  describe("getRange", () => {
    test("when input has no range", () => {
      expect(p.getRange(1)).toBeUndefined();
    });
    test("when input is personId 1 at '01.03.2017'", () => {
      expect(p.getRange(1, toNumber('01.03.2017'))).toEqual('рядовой');
    });
    test("when input is personId 1 at '26.05.2020'", () => {
      expect(p.getRange(1, toNumber('26.05.2020'))).toEqual('ефрейтор');
    });
    test("when input is personId 1 at '01.03.2017' in dative case", () => {
      expect(p.getRange(1, toNumber('01.03.2017'), 'dative')).toEqual('рядовому');
    });
    test("when input is personId 1 at '26.05.2020' in dative case", () => {
      expect(p.getRange(1, toNumber('26.05.2020'), 'dative')).toEqual('ефрейтору');
    });
  });

});
