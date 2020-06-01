const Payments = require('../../components/payments.js');
const Person = require('../../components/person.js');
const Range = require('../../components/range.js');
const Dispatcher = require('../../dispatcher.js');
const { toNumber, today } = require('../../components/date-transform.js');

const d = new Dispatcher();
const r = new Range(d);
const p = new Payments(d);
const P = new Person(d);

describe("Payments class", () => {
  describe("getRangeSalaryPeriods", () => {
    test("when input is 'подполковник' and date '01.06.2020'", () => {
      //initialize person
      P
        .setLastname('Кабиев')
        .setFirstname('Тлектес')
        .setMiddlename('Серикович')
        .setBirthdate('02.01.1983')
        .setGender('мужской')
        .createPerson();
      P.raiseRange(1, 18, toNumber('26.12.2016'));
      expect(p.getRangeSalaryPeriods('подполковник', toNumber('26.12.2016'))).toEqual([
        {
          relevant: { range: 'подполковник' },
          data: { salary: 12000 },
          range: { start: toNumber('26.12.2016'), end: toNumber('31.12.2017') }
        },
        {
          relevant: { range: 'подполковник' },
          data: { salary: 12480 },
          range: { start: toNumber('01.01.2018'), end: toNumber('30.09.2019') }
        },
        {
          relevant: { range: 'подполковник' },
          data: { salary: 13017 },
          range: { start: toNumber('01.10.2019'), end: toNumber('31.12.9999') }
        }
      ]);
    });
  });
  describe("getPositionSalaryPeriods", () => {
    test("when tariff is 18 and date '26.12.2016'", () => {

      expect(p.getPositionSalaryPeriods(18, toNumber('26.12.2016'))).toEqual([
        {
          relevant: { tariff: 18 },
          data: { salary: 24000 },
          range: { start: toNumber('26.12.2016'), end: toNumber('31.12.2017') }
        },
        {
          relevant: { tariff: 18 },
          data: { salary: 24960 },
          range: { start: toNumber('01.01.2018'), end: toNumber('30.09.2019') }
        },
        {
          relevant: { tariff: 18 },
          data: { salary: 26034 },
          range: { start: toNumber('01.10.2019'), end: toNumber('31.12.9999') }
        }
      ]);
    });
  });
  describe("salaryPeriodToString", () => {
    test("when range is 'подполковник' on date '26.12.2016'", () => {
      const period = p.getRangeSalaryPeriods('подполковник', toNumber('26.12.2016'))[0]
      expect(p.salaryPeriodToString(period)).toEqual(
        'С 26.12.2016 г. установить оклад по воинскому званию в размере 12000 руб. в месяц.'
      );
    });
    test("when range is 'подполковник' on date '01.01.2018'", () => {
      const period = p.getRangeSalaryPeriods('подполковник', toNumber('01.01.2018'))[0]
      expect(p.salaryPeriodToString(period)).toEqual(
        'С 01.01.2018 г. установить оклад по воинскому званию в размере 12480 руб. в месяц.'
      );
    });
    test("when range is 'подполковник' on date '01.10.2019'", () => {
      const period = p.getRangeSalaryPeriods('подполковник', toNumber('01.10.2019'))[0]
      expect(p.salaryPeriodToString(period)).toEqual(
        'С 01.10.2019 г. установить оклад по воинскому званию в размере 13017 руб. в месяц.'
      );
    });
    test("when tariff is 18 on date '26.12.2016'", () => {
      const period = p.getPositionSalaryPeriods(18, toNumber('26.12.2016'))[0]
      expect(p.salaryPeriodToString(period)).toEqual(
        'С 26.12.2016 г. установить оклад по воинской должности в размере 24000 руб. в месяц (18 тарифный разряд).'
      );
    });
    test("when tariff is 18 on date '01.01.2018'", () => {
      const period = p.getPositionSalaryPeriods(18, toNumber('01.01.2018'))[0]
      expect(p.salaryPeriodToString(period)).toEqual(
        'С 01.01.2018 г. установить оклад по воинской должности в размере 24960 руб. в месяц (18 тарифный разряд).'
      );
    });
    test("when tariff is 18 on date '01.10.2019'", () => {
      const period = p.getPositionSalaryPeriods(18, toNumber('01.10.2019'))[0]
      expect(p.salaryPeriodToString(period)).toEqual(
        'С 01.10.2019 г. установить оклад по воинской должности в размере 26034 руб. в месяц (18 тарифный разряд).'
      );
    });
  });
});
