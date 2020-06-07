const Payments = require("../../components/payments.js");
const Address = require("../../components/address.js");
const Institution = require("../../components/institution.js");
const Department = require("../../components/departments.js");
const Person = require("../../components/person.js");
const Position = require("../../components/positions.js");
const PositionService = require("../../components/position-service.js");
const Range = require("../../components/range.js");
const Dispatcher = require("../../dispatcher.js");
const { toNumber, today } = require("../../components/date-transform.js");

const D = new Dispatcher();
const a = new Address(D);
const d = new Department(D);
const r = new Range(D);
const p = new Payments(D);
const P = new Person(D);
const pos = new Position(D);
const ps = new PositionService(D);
const i = new Institution(D);

describe("Payments class", () => {
  describe("getRangeSalaryPeriods", () => {
    test("when input is 'подполковник' and date '01.06.2020'", () => {
      //initialize person
      P.setLastname("Кабиев")
        .setFirstname("Тлектес")
        .setMiddlename("Серикович")
        .setBirthdate("02.01.1983")
        .setGender("мужской")
        .createPerson();
      P.raiseRange(1, 18, toNumber("26.12.2016"));
      expect(
        p.getRangeSalaryPeriods("подполковник", toNumber("26.12.2016"))
      ).toEqual([
        {
          relevant: { range: "подполковник" },
          data: { salary: 12000 },
          range: { start: toNumber("26.12.2016"), end: toNumber("31.12.2017") },
        },
        {
          relevant: { range: "подполковник" },
          data: { salary: 12480 },
          range: { start: toNumber("01.01.2018"), end: toNumber("30.09.2019") },
        },
        {
          relevant: { range: "подполковник" },
          data: { salary: 13017 },
          range: { start: toNumber("01.10.2019"), end: toNumber("31.12.9999") },
        },
      ]);
    });
  });
  describe("getPositionSalaryPeriods", () => {
    test("when tariff is 18 and date '26.12.2016'", () => {
      expect(p.getPositionSalaryPeriods(18, toNumber("26.12.2016"))).toEqual([
        {
          relevant: { tariff: 18 },
          data: { salary: 24000 },
          range: { start: toNumber("26.12.2016"), end: toNumber("31.12.2017") },
        },
        {
          relevant: { tariff: 18 },
          data: { salary: 24960 },
          range: { start: toNumber("01.01.2018"), end: toNumber("30.09.2019") },
        },
        {
          relevant: { tariff: 18 },
          data: { salary: 26034 },
          range: { start: toNumber("01.10.2019"), end: toNumber("31.12.9999") },
        },
      ]);
    });
  });
  describe("salaryPeriodToString", () => {
    test("when range is 'подполковник' on date '26.12.2016'", () => {
      const period = p.getRangeSalaryPeriods(
        "подполковник",
        toNumber("26.12.2016")
      )[0];
      expect(p.salaryPeriodToString(period)).toEqual(
        "С 26.12.2016 г. установить оклад по воинскому званию в размере 12000 руб. в месяц."
      );
    });
    test("when range is 'подполковник' on date '01.01.2018'", () => {
      const period = p.getRangeSalaryPeriods(
        "подполковник",
        toNumber("01.01.2018")
      )[0];
      expect(p.salaryPeriodToString(period)).toEqual(
        "С 01.01.2018 г. установить оклад по воинскому званию в размере 12480 руб. в месяц."
      );
    });
    test("when range is 'подполковник' on date '01.10.2019'", () => {
      const period = p.getRangeSalaryPeriods(
        "подполковник",
        toNumber("01.10.2019")
      )[0];
      expect(p.salaryPeriodToString(period)).toEqual(
        "С 01.10.2019 г. установить оклад по воинскому званию в размере 13017 руб. в месяц."
      );
    });
    test("when tariff is 18 on date '26.12.2016'", () => {
      const period = p.getPositionSalaryPeriods(18, toNumber("26.12.2016"))[0];
      expect(p.salaryPeriodToString(period)).toEqual(
        "С 26.12.2016 г. установить оклад по воинской должности в размере 24000 руб. в месяц (18 тарифный разряд)."
      );
    });
    test("when tariff is 18 on date '01.01.2018'", () => {
      const period = p.getPositionSalaryPeriods(18, toNumber("01.01.2018"))[0];
      expect(p.salaryPeriodToString(period)).toEqual(
        "С 01.01.2018 г. установить оклад по воинской должности в размере 24960 руб. в месяц (18 тарифный разряд)."
      );
    });
    test("when tariff is 18 on date '01.10.2019'", () => {
      const period = p.getPositionSalaryPeriods(18, toNumber("01.10.2019"))[0];
      expect(p.salaryPeriodToString(period)).toEqual(
        "С 01.10.2019 г. установить оклад по воинской должности в размере 26034 руб. в месяц (18 тарифный разряд)."
      );
    });
  });
  describe("checking rights for allowance 1174", () => {
    test("creating 'войсковая часть 16544'", () => {
      i.setName({
        nominative: "16544",
        dative: "16544",
        accusative: "16544",
        genitive: "16544",
      });
      i.setType({
        nominative: "войсковая часть",
        dative: "войсковой части",
        accusative: "войсковую часть",
        genitive: "войсковой части",
      });
      i.createInstitutionData(toNumber("26.12.2016"));
      expect(D.stateOf("institution-data")).toEqual([
        {
          relevant: { institutionId: 1 },
          data: { nameId: 1, typeId: 1 },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
    test("setting address for 'войсковая часть 16544'", () => {
      const address = a.registerAddress({
        zipcode: 366123,
        region: "Чеченская Республика",
        area: "Наурский район",
        locality: "Калиновская",
      });
      i.setAddressTo(1, address, toNumber("26.12.2016"));
      expect(D.stateOf("address-data")).toEqual([
        {
          relevant: { institutionId: 1 },
          data: {
            zipcode: 366123,
            regionId: 24,
            areaId: 391,
            localityId: 8519,
          },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
    test("add department to 'войсковая часть 16544'", () => {
      d.addDepartmentToState({
        departmentNameId: d.getDepartmentNameId("мотострелковый батальон"),
        number: 1,
        institutionId: 1,
        start: toNumber("26.12.2016"),
      });
      expect(D.stateOf("departments")).toEqual([
        {
          relevant: { institutionId: 1 },
          data: { id: 1, item: 1, departmentNameId: 62, number: 1 },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
    test("add position to '1 мотострелковый батальон'", () => {
      const data = pos.addPositionData({
        positionNameId: pos.getPositionNameId("командир батальона"),
        vusNumberId: pos.getVusNumberId("0210003"),
        tariffCategory: 18,
        rangeId: r.rangeIdOf("подполковник"),
      });
      d.addPositionToState({
        positionDataId: data.id,
        superDepartmentId: 1,
        start: toNumber("26.12.2016"),
      });

      expect(D.stateOf("positions")).toEqual([
        {
          relevant: { departmentId: 1 },
          data: { id: 1, item: 1, positionDataId: 1 },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
    test("set person to position", () => {
      ps.applyPosition(1, 1, toNumber("26.12.2016"));

      expect(D.stateOf("position-service")).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
    test("get1174AllowanceRights() returns 100", () => {
      expect(p.get1174AllowanceRights(1, toNumber("26.12.2016"))).toEqual(100);
    });
  });
});
