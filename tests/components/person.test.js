const Person = require("./../../components/person.js");
const Address = require("../../components/address.js");
const Dispatcher = require("./../../dispatcher.js");
const { toNumber, today } = require("../../components/date-transform.js");

describe("Person class testing...", () => {
  const p = new Person(new Dispatcher());

  describe("clear", () => {
    test("always sets p.person to {}", () => {
      p.clear();
      expect(p.person).toEqual({});
    });
  });
  describe("setLastname", () => {
    test("when lastname is set first time", () => {
      p.setLastname("Кобелев");
      expect(p.person.lastnameId).toEqual(761);
    });
    test("when lastname is set second time", () => {
      p.setLastname("Осипенко");
      expect(p.person.lastnameId).toEqual(761);
    });
  });
  describe("setFirstname", () => {
    test("when firstname is set first time", () => {
      p.setFirstname("Арсен");
      expect(p.person.firstnameId).toEqual(104);
    });
    test("when firstname is set second time", () => {
      p.setFirstname("Владислав");
      expect(p.person.firstnameId).toEqual(104);
    });
  });
  describe("setMiddlename", () => {
    test("when middlename is set first time", () => {
      p.setMiddlename("Владимирович");
      expect(p.person.middlenameId).toEqual(103);
    });
    test("when middlename is set second time", () => {
      p.setMiddlename("Владимирович");
      expect(p.person.middlenameId).toEqual(103);
    });
  });
  describe("setBirthdate", () => {
    test("when birthdate is set first time", () => {
      p.setBirthdate("11.12.1990");
      expect(p.person.birthdate).toEqual(33218);
    });
    test("when birthdate is set second time", () => {
      p.setBirthdate("11.12.1990");
      expect(p.person.birthdate).toEqual(33218);
    });
  });
  describe("setGender", () => {
    test("when gender is set first time", () => {
      p.setGender("мужской");
      expect(p.person.gender).toEqual("мужской");
    });
    test("when gender is set second time", () => {
      p.setGender("мужской");
      expect(p.person.gender).toEqual("мужской");
    });
  });
  describe("isValid", () => {
    test("when person built completely", () => {
      expect(p.isValid()).toBeTruthy();
    });
  });
  describe("createPerson", () => {
    test("when person built succesfully", () => {
      expect(p.createPerson()).toBeTruthy();
    });
    test("after call person property is {}", () => {
      expect(p.person).toEqual({});
    });
  });

  describe("isValidInput", () => {
    test("when input has personId and no date and case", () => {
      expect(p.isInputValid(1)).toEqual(false);
    });
    test("when input has personId and date and no case", () => {
      expect(p.isInputValid(1, toNumber(today()))).toEqual(true);
    });
    test("when input has personId and case and no date", () => {
      expect(p.isInputValid(1, "dative")).toEqual(false);
    });
    test("when input has personId, date and case", () => {
      expect(p.isInputValid(1, toNumber("26.12.2016"), "dative")).toEqual(true);
    });
  });

  describe("lastname", () => {
    test("when input is not defined", () => {
      expect(p.lastname(1, toNumber(today()))).toEqual("Кобелев");
    });
    test("when input is 'genitive'", () => {
      expect(p.lastname(1, toNumber(today()), "genitive")).toEqual("Кобелева");
    });
    test("when input is 'dative'", () => {
      expect(p.lastname(1, toNumber(today()), "dative")).toEqual("Кобелеву");
    });
  });

  describe("firstname", () => {
    test("when input is not defined", () => {
      expect(p.firstname(1, toNumber(today()))).toEqual("Арсен");
    });
    test("when input is 'genitive'", () => {
      expect(p.firstname(1, toNumber(today()), "genitive")).toEqual("Арсена");
    });
    test("when input is 'dative'", () => {
      expect(p.firstname(1, toNumber(today()), "dative")).toEqual("Арсену");
    });
  });

  describe("middlename", () => {
    test("when case is not defined", () => {
      expect(p.middlename(1, toNumber(today()))).toEqual("Владимирович");
    });
    test("when input is 'genitive'", () => {
      expect(p.middlename(1, toNumber(today()), "genitive")).toEqual(
        "Владимировича"
      );
    });
    test("when input is 'dative'", () => {
      expect(p.middlename(1, toNumber(today()), "dative")).toEqual(
        "Владимировичу"
      );
    });
  });

  describe("fullname", () => {
    test("when case is not defined", () => {
      expect(p.fullname(1, toNumber(today()))).toEqual(
        "Кобелев Арсен Владимирович"
      );
    });
    test("when input is 'genitive'", () => {
      expect(p.fullname(1, toNumber(today()), "genitive")).toEqual(
        "Кобелева Арсена Владимировича"
      );
    });
    test("when input is 'dative'", () => {
      expect(p.fullname(1, toNumber(today()), "dative")).toEqual(
        "Кобелеву Арсену Владимировичу"
      );
    });
  });
  describe("setPersonalNumber", () => {
    test("when no input", () => {
      expect(p.setPersonalNumber()).toEqual(undefined);
    });
    test("when input is personId 1 and personal number with latin letters AA-123456", () => {
      expect(p.setPersonalNumber(1, "AA-123456")).toEqual(undefined);
    });
    test("when input is personId 1 and personal number АА-123456", () => {
      p.setPersonalNumber(1, "АА-123456");
      expect(p.dispatcher.stateOf("personal-numbers")).toEqual([
        {
          relevant: { personId: 1 },
          data: { personalNumber: "АА-123456" },
          range: { start: toNumber(today()), end: 2958525 },
        },
      ]);
    });
  });
  describe("getPersonalNumber", () => {
    test("when input is personId 1 and with no date", () => {
      expect(p.getPersonalNumber(1)).toEqual("АА-123456");
    });
    test("when input is personId 1 and date '01.01.2021'", () => {
      p.getPersonalNumber(1, toNumber("01.01.2021"));
      expect(p.getPersonalNumber(1, toNumber("01.01.2021"))).toEqual(
        "АА-123456"
      );
    });
  });
  describe("raiseRange", () => {
    test("when input not valid", () => {
      expect(p.raiseRange(1, 2)).toEqual(undefined);
    });
    test("when input is 'рядовой' since '26.12.2016'", () => {
      p.raiseRange(1, 1, toNumber("26.12.2016"));
      expect(p.dispatcher.stateOf("person-ranges")).toEqual([
        {
          relevant: { personId: 1, rangeId: 1 },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
    test("when input is 'ефрейтор' since '01.06.2017'", () => {
      p.raiseRange(1, 2, toNumber("01.06.2017"));
      expect(p.dispatcher.stateOf("person-ranges")).toEqual([
        {
          relevant: { personId: 1, rangeId: 1 },
          range: { start: 42730, end: 42886 },
        },
        {
          relevant: { personId: 1, rangeId: 2 },
          range: { start: 42887, end: 2958525 },
        },
      ]);
    });
  });
  describe("getRange", () => {
    test("when input has no range", () => {
      expect(p.getRange(1)).toEqual("ефрейтор");
    });
    test("when input is personId 1 at '01.03.2017'", () => {
      expect(p.getRange(1, toNumber("01.03.2017"))).toEqual("рядовой");
    });
    test("when input is personId 1 at '26.05.2020'", () => {
      expect(p.getRange(1, toNumber("26.05.2020"))).toEqual("ефрейтор");
    });
    test("when input is personId 1 at '01.03.2017' in dative case", () => {
      expect(p.getRange(1, toNumber("01.03.2017"), "dative")).toEqual(
        "рядовому"
      );
    });
    test("when input is personId 1 at '26.05.2020' in dative case", () => {
      expect(p.getRange(1, toNumber("26.05.2020"), "dative")).toEqual(
        "ефрейтору"
      );
    });
  });
  /*
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

  */
});
