const Dispatcher = require('../dispatcher.js');
const Address = require('../components/address.js');
const Department = require('../components/departments.js');
const Person = require('../components/person.js');
const Position = require('../components/positions.js');
const PositionService = require('../components/position-service.js');
const Range = require('../components/range.js');
const { toNumber, today } = require('../components/date-transform.js');

describe("Application working...", () => {
  const D = new Dispatcher();
  const d = new Department(D);
  const P = new Person(D);
  const p = new Position(D);
  const r = new Range(D);
  const ps = new PositionService(D);

  describe("Creating state...", () => {
    describe("creating departments...", () => {
      test("when initializing state is empty", () => {
        expect(D.stateOf('departments')).toEqual([]);
      });
      test("when add department with name '1 мотострелковый батальон'", () => {
        d.addDepartmentToState({
          departmentNameId: d.getDepartmentNameId('мотострелковый батальон'),
          number: 1,
          start: toNumber('26.12.2016')
        });
        expect(D.stateOf('departments')).toEqual([
          {
            relevant: { departmentId: null },
            data: { id: 1, item: 1, departmentNameId: 62, number: 1 },
            range: { start: 42730, end: 2958525 }
          }
        ]);
      });
      test("when add department with name 'штаб'", () => {
        d.addDepartmentToState({
          departmentNameId: d.getDepartmentNameId('штаб'),
          superDepartmentId: 1,
          start: toNumber('26.12.2016')
        });
        expect(D.stateOf('departments')).toEqual([
          {
            relevant: { departmentId: null },
            data: { id: 1, item: 1, departmentNameId: 62, number: 1 },
            range: { start: 42730, end: 2958525 }
          },
          {
            relevant: { departmentId: 1 },
            data: { id: 2, item: 1, departmentNameId: 155 },
            range: { start: 42730, end: 2958525 }
          }
        ]);
      });
      test("when add department with name '1 мотострелковая рота'", () => {
        d.addDepartmentToState({
          departmentNameId: d.getDepartmentNameId('мотострелковая рота'),
          superDepartmentId: 1,
          number: 1,
          start: toNumber('26.12.2016')
        });
        expect(D.stateOf('departments')).toEqual([
          {
            relevant: { departmentId: null },
            data: { id: 1, item: 1, departmentNameId: 62, number: 1 },
            range: { start: 42730, end: 2958525 }
          },
          {
            relevant: { departmentId: 1 },
            data: { id: 2, item: 1, departmentNameId: 155 },
            range: { start: 42730, end: 2958525 }
          },
          {
            relevant: { departmentId: 1 },
            data: { id: 3, item: 2, departmentNameId: 59, number: 1 },
            range: { start: 42730, end: 2958525 }
          }
        ]);
      });
      test("when add department with name '1 мотострелковый взвод'", () => {
        d.addDepartmentToState({
          departmentNameId: d.getDepartmentNameId('мотострелковый взвод'),
          superDepartmentId: 3,
          number: 1,
          start: toNumber('26.12.2016')
        });
        expect(D.stateOf('departments')).toEqual([
          {
            relevant: { departmentId: null },
            data: { id: 1, item: 1, departmentNameId: 62, number: 1 },
            range: { start: 42730, end: 2958525 }
          },
          {
            relevant: { departmentId: 1 },
            data: { id: 2, item: 1, departmentNameId: 155 },
            range: { start: 42730, end: 2958525 }
          },
          {
            relevant: { departmentId: 1 },
            data: { id: 3, item: 2, departmentNameId: 59, number: 1 },
            range: { start: 42730, end: 2958525 }
          },
          {
            relevant: { departmentId: 3 },
            data: { id: 4, item: 1, departmentNameId: 63, number: 1 },
            range: { start: 42730, end: 2958525 }
          }
        ]);
      });
    });
    describe("creating positions...", () => {
      let previousState = [...D.stateOf('positions')];
      test("when add position with name 'командир батальона'", () => {
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('командир батальона'),
          vusNumberId: p.getVusNumberId('0210003'),
          tariffCategory: 18,
          rangeId: r.rangeIdOf('подполковник')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 1,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 1 },
            data: { id: 1, item: 3, positionDataId: 1 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'заместитель командира батальона'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('заместитель командира батальона'),
          vusNumberId: p.getVusNumberId('0210003'),
          tariffCategory: 16,
          rangeId: r.rangeIdOf('майор')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 1,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 1 },
            data: { id: 2, item: 4, positionDataId: 2 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'заместитель командира батальона по военно-политической работе'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('заместитель командира батальона по военно-политической работе'),
          vusNumberId: p.getVusNumberId('3601003'),
          tariffCategory: 16,
          rangeId: r.rangeIdOf('майор')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 1,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 1 },
            data: { id: 3, item: 5, positionDataId: 3 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'заместитель командира батальона по вооружению'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('заместитель командира батальона по вооружению'),
          vusNumberId: p.getVusNumberId('4202003'),
          tariffCategory: 16,
          rangeId: r.rangeIdOf('майор')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 1,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 1 },
            data: { id: 4, item: 6, positionDataId: 4 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'начальник штаба - заместитель командира батальона'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('начальник штаба - заместитель командира батальона'),
          vusNumberId: p.getVusNumberId('0210003'),
          tariffCategory: 16,
          rangeId: r.rangeIdOf('майор')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 2,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 2 },
            data: { id: 5, item: 1, positionDataId: 5 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'заместитель начальника штаба'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('заместитель начальника штаба'),
          vusNumberId: p.getVusNumberId('0210003'),
          tariffCategory: 14,
          rangeId: r.rangeIdOf('капитан')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 2,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 2 },
            data: { id: 6, item: 2, positionDataId: 6 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'инструктор'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('инструктор'),
          vusNumberId: p.getVusNumberId('187119'),
          tariffCategory: 5,
          rangeId: r.rangeIdOf('сержант')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 2,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 2 },
            data: { id: 7, item: 3, positionDataId: 7 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'командир роты'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('командир роты'),
          vusNumberId: p.getVusNumberId('0210003'),
          tariffCategory: 14,
          rangeId: r.rangeIdOf('капитан')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 8, item: 2, positionDataId: 8 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'заместитель командира роты по военно-политической работе'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('заместитель командира роты по военно-политической работе'),
          vusNumberId: p.getVusNumberId('3602003'),
          tariffCategory: 12,
          rangeId: r.rangeIdOf('старший лейтенант')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 9, item: 3, positionDataId: 9 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'старший техник'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('старший техник'),
          vusNumberId: p.getVusNumberId('825878'),
          tariffCategory: 9,
          rangeId: r.rangeIdOf('старший прапорщик')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 10, item: 4, positionDataId: 10 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'старшина'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('старшина'),
          vusNumberId: p.getVusNumberId('868908'),
          tariffCategory: 9,
          rangeId: r.rangeIdOf('старший прапорщик')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 11, item: 5, positionDataId: 11 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'фельдшер'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('фельдшер'),
          vusNumberId: p.getVusNumberId('879962'),
          tariffCategory: 6,
          rangeId: r.rangeIdOf('прапорщик')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 12, item: 6, positionDataId: 12 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'командир отделения'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('командир отделения'),
          vusNumberId: p.getVusNumberId('100182'),
          tariffCategory: 5,
          rangeId: r.rangeIdOf('сержант')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 13, item: 7, positionDataId: 13 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'старший водитель'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('старший водитель'),
          vusNumberId: p.getVusNumberId('124702'),
          tariffCategory: 3,
          rangeId: r.rangeIdOf('ефрейтор')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 14, item: 8, positionDataId: 14 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'наводчик'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('наводчик'),
          vusNumberId: p.getVusNumberId('124281'),
          tariffCategory: 2,
          rangeId: r.rangeIdOf('рядовой')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 15, item: 9, positionDataId: 15 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'радиотелефонист'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('радиотелефонист'),
          vusNumberId: p.getVusNumberId('423641'),
          tariffCategory: 2,
          rangeId: r.rangeIdOf('рядовой')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 16, item: 10, positionDataId: 16 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'оператор'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('оператор'),
          vusNumberId: p.getVusNumberId('515543'),
          tariffCategory: 2,
          rangeId: r.rangeIdOf('рядовой')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 3,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 3 },
            data: { id: 17, item: 11, positionDataId: 17 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
      test("when add position with name 'командир взвода'", () => {
        previousState = [...D.stateOf('positions')];
        const data = p.addPositionData({
          positionNameId: p.getPositionNameId('командир взвода'),
          vusNumberId: p.getVusNumberId('0210003'),
          tariffCategory: 10,
          rangeId: r.rangeIdOf('старший лейтенант')
        });
        d.addPositionToState({
          positionDataId: data.id,
          superDepartmentId: 4,
          start: toNumber('26.12.2016')
        });

        expect(D.stateOf('positions')).toEqual([
          ...previousState,
          {
            relevant: { departmentId: 4 },
            data: { id: 18, item: 1, positionDataId: 18 },
            range: { start: 42730, end: 2958525 }
          }
        ])
      });
    });
    describe("checking position names...", () => {

      test("when input is 1", () => {
        expect(d.getPositionFullname(1)).toEqual('командир батальона 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 2", () => {
        expect(d.getPositionFullname(2)).toEqual('заместитель командира батальона 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 3", () => {
        expect(d.getPositionFullname(3)).toEqual('заместитель командира батальона по военно-политической работе 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 4", () => {
        expect(d.getPositionFullname(4)).toEqual('заместитель командира батальона по вооружению 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 5", () => {
        expect(d.getPositionFullname(5)).toEqual('начальник штаба - заместитель командира батальона штаба 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 6", () => {
        expect(d.getPositionFullname(6)).toEqual('заместитель начальника штаба штаба 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 7", () => {
        expect(d.getPositionFullname(7)).toEqual('инструктор штаба 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 8", () => {
        expect(d.getPositionFullname(8)).toEqual('командир роты 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 9", () => {
        expect(d.getPositionFullname(9)).toEqual('заместитель командира роты по военно-политической работе 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 10", () => {
        expect(d.getPositionFullname(10)).toEqual('старший техник 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 11", () => {
        expect(d.getPositionFullname(11)).toEqual('старшина 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 12", () => {
        expect(d.getPositionFullname(12)).toEqual('фельдшер 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 13", () => {
        expect(d.getPositionFullname(13)).toEqual('командир отделения 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 14", () => {
        expect(d.getPositionFullname(14)).toEqual('старший водитель 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 15", () => {
        expect(d.getPositionFullname(15)).toEqual('наводчик 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 16", () => {
        expect(d.getPositionFullname(16)).toEqual('радиотелефонист 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 17", () => {
        expect(d.getPositionFullname(17)).toEqual('оператор 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input is 18", () => {
        expect(d.getPositionFullname(18)).toEqual('командир взвода 1 мотострелкового взвода 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
    });
    describe("creating persons...", () => {
      test("when adding person 'Кабиев Тлектес Серикович'", () => {
        P
          .setLastname('Кабиев')
          .setFirstname('Тлектес')
          .setMiddlename('Серикович')
          .setBirthdate('02.01.1983')
          .setGender('мужской');
        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 1 },
            data: {
              lastnameId: 687, firstnameId: 623, middlenameId: 486,
              birthdate: 30318, gender: 'мужской'
            },
            range: { start: 30318, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Сергиенко Николай Васильевич'", () => {
        P
          .setLastname('Сергиенко')
          .setFirstname('Николай')
          .setMiddlename('Васильевич')
          .setBirthdate('07.12.1983')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 2 },
            data: {
              lastnameId: 1312, firstnameId: 471, middlenameId: 52,
              birthdate: 30657, gender: 'мужской'
            },
            range: { start: 30657, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Ерофеев Матвей Андреевич'", () => {
        P
          .setLastname('Ерофеев')
          .setFirstname('Матвей')
          .setMiddlename('Андреевич')
          .setBirthdate('09.07.1989')
          .setGender('мужской');
        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 3 },
            data: {
              lastnameId: 591, firstnameId: 410, middlenameId: 154,
              birthdate: 32698, gender: 'мужской'
            },
            range: { start: 32698, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Велитарский Александр Геннадьевич'", () => {
        P
          .setLastname('Велитарский')
          .setFirstname('Александр')
          .setMiddlename('Геннадьевич')
          .setBirthdate('23.01.1986')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 4 },
            data: {
              lastnameId: 1736, firstnameId: 51, middlenameId: 89,
              birthdate: 31435, gender: 'мужской'
            },
            range: { start: 31435, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Боков Мустафа Курашевич'", () => {
        P
          .setLastname('Боков')
          .setFirstname('Мустафа')
          .setMiddlename('Курашевич')
          .setBirthdate('23.08.1986')
          .setGender('мужской');
        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 5 },
            data: {
              lastnameId: 278, firstnameId: 442, middlenameId: 280,
              birthdate: 31647, gender: 'мужской'
            },
            range: { start: 31647, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Тутуров Игорь Викторович'", () => {
        P
          .setLastname('Тутуров')
          .setFirstname('Игорь')
          .setMiddlename('Викторович')
          .setBirthdate('28.02.1990')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 6 },
            data: {
              lastnameId: 1470, firstnameId: 301, middlenameId: 106,
              birthdate: 32932, gender: 'мужской'
            },
            range: { start: 32932, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Садуллаев Юсуп Сайдмагомедович'", () => {
        P
          .setLastname('Садуллаев')
          .setFirstname('Юсуп')
          .setMiddlename('Сайдмагомедович')
          .setBirthdate('17.07.1975')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 7 },
            data: {
              lastnameId: 1249, firstnameId: 714, middlenameId: 718,
              birthdate: 27592, gender: 'мужской'
            },
            range: { start: 27592, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Кулбахтин Илюз Филюзович'", () => {
        P
          .setLastname('Кулбахтин')
          .setFirstname('Илюз')
          .setMiddlename('Филюзович')
          .setBirthdate('06.06.1993')
          .setGender('мужской');
        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 8 },
            data: {
              lastnameId: 838, firstnameId: 320, middlenameId: 526,
              birthdate: 34126, gender: 'мужской'
            },
            range: { start: 34126, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Лебедев Алексей Васильевич'", () => {
        P
          .setLastname('Лебедев')
          .setFirstname('Алексей')
          .setMiddlename('Васильевич')
          .setBirthdate('24.11.1995')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 9 },
            data: {
              lastnameId: 872, firstnameId: 52, middlenameId: 52,
              birthdate: 35027, gender: 'мужской'
            },
            range: { start: 35027, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Джамалудинов Али Дибирович'", () => {
        P
          .setLastname('Джамалудинов')
          .setFirstname('Али')
          .setMiddlename('Дибирович')
          .setBirthdate('22.04.1979')
          .setGender('мужской');
        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 10 },
            data: {
              lastnameId: 516, firstnameId: 53, middlenameId: 396,
              birthdate: 28967, gender: 'мужской'
            },
            range: { start: 28967, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Адилов Тажидин Исаевич'", () => {
        P
          .setLastname('Адилов')
          .setFirstname('Тажидин')
          .setMiddlename('Исаевич')
          .setBirthdate('15.01.1980')
          .setGender('мужской');
        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 11 },
            data: {
              lastnameId: 1737, firstnameId: 602, middlenameId: 31,
              birthdate: 29235, gender: 'мужской'
            },
            range: { start: 29235, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Малиновская Марина Жамалудиновна'", () => {
        P
          .setLastname('Малиновская')
          .setFirstname('Марина')
          .setMiddlename('Жамалудиновна')
          .setBirthdate('19.10.1983')
          .setGender('женский');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 12 },
            data: {
              lastnameId: 935, firstnameId: 404, middlenameId: 575,
              birthdate: 30608, gender: 'женский'
            },
            range: { start: 30608, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Дулин Виктор Валентинович'", () => {
        P
          .setLastname('Дулин')
          .setFirstname('Виктор')
          .setMiddlename('Валентинович')
          .setBirthdate('25.01.1984')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 13 },
            data: {
              lastnameId: 569, firstnameId: 180, middlenameId: 205,
              birthdate: 30706, gender: 'мужской'
            },
            range: { start: 30706, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Арясов Виталий Павлович'", () => {
        P
          .setLastname('Арясов')
          .setFirstname('Виталий')
          .setMiddlename('Павлович')
          .setBirthdate('23.03.1981')
          .setGender('мужской');
        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 14 },
            data: {
              lastnameId: 145, firstnameId: 188, middlenameId: 171,
              birthdate: 29668, gender: 'мужской'
            },
            range: { start: 29668, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Сайгидулаев Ахмед Шагидханович'", () => {
        P
          .setLastname('Сайгидулаев')
          .setFirstname('Ахмед')
          .setMiddlename('Шагидханович')
          .setBirthdate('05.03.1980')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 15 },
            data: {
              lastnameId: 1254, firstnameId: 124, middlenameId: 721,
              birthdate: 29285, gender: 'мужской'
            },
            range: { start: 29285, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Багамаев Жамал Джамалутдинович'", () => {
        P
          .setLastname('Багамаев')
          .setFirstname('Жамал')
          .setMiddlename('Джамалутдинович')
          .setBirthdate('11.06.1992')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 16 },
            data: {
              lastnameId: 1738, firstnameId: 728, middlenameId: 12,
              birthdate: 33766, gender: 'мужской'
            },
            range: { start: 33766, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Дурдыев Анзор Лаверенович'", () => {
        P
          .setLastname('Дурдыев')
          .setFirstname('Анзор')
          .setMiddlename('Лаверенович')
          .setBirthdate('27.03.1994')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 17 },
            data: {
              lastnameId: 571, firstnameId: 86, middlenameId: 919,
              birthdate: 34420, gender: 'мужской'
            },
            range: { start: 34420, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Охотников Александр Валерьевич'", () => {
        P
          .setLastname('Охотников')
          .setFirstname('Александр')
          .setMiddlename('Валерьевич')
          .setBirthdate('20.06.1996')
          .setGender('мужской');

        const state = [...D.stateOf('person-data')];
        P.createPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 18 },
            data: {
              lastnameId: 1135, firstnameId: 51, middlenameId: 102,
              birthdate: 35236, gender: 'мужской'
            },
            range: { start: 35236, end: 2958525 }
          }
        ])
      });
    });
    describe("setting initial person ranges", () => {
      test("'подполковник' to person with id 1", () => {
        P.raiseRange(1, 18, toNumber('26.12.2016'));
        expect(P.getRange(1, toNumber('26.12.2016'))).toEqual('подполковник');
      });
      test("'майор' to person with id 2", () => {
        P.raiseRange(2, 16, toNumber('26.12.2016'));
        expect(P.getRange(2, toNumber('26.12.2016'))).toEqual('майор');
      });
      test("'капитан' to person with id 3", () => {
        P.raiseRange(3, 14, toNumber('26.12.2016'));
        expect(P.getRange(3, toNumber('26.12.2016'))).toEqual('капитан');
      });
      test("'майор' to person with id 4", () => {
        P.raiseRange(4, 16, toNumber('26.12.2016'));
        expect(P.getRange(4, toNumber('26.12.2016'))).toEqual('майор');
      });
      test("'майор' to person with id 5", () => {
        P.raiseRange(5, 16, toNumber('26.12.2016'));
        expect(P.getRange(5, toNumber('26.12.2016'))).toEqual('майор');
      });
      test("'капитан' to person with id 6", () => {
        P.raiseRange(6, 14, toNumber('26.12.2016'));
        expect(P.getRange(6, toNumber('26.12.2016'))).toEqual('капитан');
      });
      test("'сержант' to person with id 7", () => {
        P.raiseRange(7, 4, toNumber('26.12.2016'));
        expect(P.getRange(7, toNumber('26.12.2016'))).toEqual('сержант');
      });
      test("'старший лейтенант' to person with id 8", () => {
        P.raiseRange(8, 12, toNumber('26.12.2016'));
        expect(P.getRange(8, toNumber('26.12.2016'))).toEqual('старший лейтенант');
      });
      test("'лейтенант' to person with id 9", () => {
        P.raiseRange(9, 10, toNumber('26.12.2016'));
        expect(P.getRange(9, toNumber('26.12.2016'))).toEqual('лейтенант');
      });
      test("'старший сержант' to person with id 10", () => {
        P.raiseRange(10, 5, toNumber('26.12.2016'));
        expect(P.getRange(10, toNumber('26.12.2016'))).toEqual('старший сержант');
      });
      test("'прапорщик' to person with id 11", () => {
        P.raiseRange(11, 7, toNumber('26.12.2016'));
        expect(P.getRange(11, toNumber('26.12.2016'))).toEqual('прапорщик');
      });
      test("'сержант' to person with id 12", () => {
        P.raiseRange(12, 4, toNumber('26.12.2016'));
        expect(P.getRange(12, toNumber('26.12.2016'))).toEqual('сержант');
      });
      test("'сержант' to person with id 13", () => {
        P.raiseRange(13, 4, toNumber('26.12.2016'));
        expect(P.getRange(13, toNumber('26.12.2016'))).toEqual('сержант');
      });
      test("'младший сержант' to person with id 14", () => {
        P.raiseRange(14, 3, toNumber('26.12.2016'));
        expect(P.getRange(14, toNumber('26.12.2016'))).toEqual('младший сержант');
      });
      test("'рядовой' to person with id 15", () => {
        P.raiseRange(15, 1, toNumber('26.12.2016'));
        expect(P.getRange(15, toNumber('26.12.2016'))).toEqual('рядовой');
      });
      test("'рядовой' to person with id 16", () => {
        P.raiseRange(16, 1, toNumber('26.12.2016'));
        expect(P.getRange(16, toNumber('26.12.2016'))).toEqual('рядовой');
      });
      test("'рядовой' to person with id 17", () => {
        P.raiseRange(17, 1, toNumber('26.12.2016'));
        expect(P.getRange(17, toNumber('26.12.2016'))).toEqual('рядовой');
      });
      test("'лейтенант' to person with id 18", () => {
        P.raiseRange(18, 10, toNumber('26.12.2016'));
        expect(P.getRange(18, toNumber('26.12.2016'))).toEqual('лейтенант');
      });

    });
    describe("concatenating range, fullname, position", () => {
      test("when input has no date and case", () => {
        let i = 1; while (i <= 18) { ps.applyPosition(i, i, toNumber('26.12.2016')); i += 1; }
        expect(P.getRangeFullnamePosition(1)).toEqual('подполковник Кабиев Тлектес Серикович, командир батальона 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 2, date and case", () => {
        expect(P.getRangeFullnamePosition(2, toNumber(today()), 'dative')).toEqual('майору Сергиенко Николаю Васильевичу, заместителю командира батальона 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 3, date and case", () => {
        expect(P.getRangeFullnamePosition(3, toNumber(today()), 'dative')).toEqual('капитану Ерофееву Матвею Андреевичу, заместителю командира батальона по военно-политической работе 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 4, date and case", () => {
        expect(P.getRangeFullnamePosition(4, toNumber(today()), 'dative')).toEqual('майору Велитарскому Александру Геннадьевичу, заместителю командира батальона по вооружению 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 5, date and case", () => {
        expect(P.getRangeFullnamePosition(5, toNumber(today()), 'dative')).toEqual('майору Бокову Мустафе Курашевичу, начальнику штаба - заместителю командира батальона штаба 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 6, date and case", () => {
        expect(P.getRangeFullnamePosition(6, toNumber(today()), 'dative')).toEqual('капитану Тутурову Игорю Викторовичу, заместителю начальника штаба штаба 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 7, date and case", () => {
        expect(P.getRangeFullnamePosition(7, toNumber(today()), 'dative')).toEqual('сержанту Садуллаеву Юсупу Сайдмагомедовичу, инструктору штаба 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 8, date and case", () => {
        expect(P.getRangeFullnamePosition(8, toNumber(today()), 'dative')).toEqual('старшему лейтенанту Кулбахтину Илюзу Филюзовичу, командиру роты 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 9, date and case", () => {
        expect(P.getRangeFullnamePosition(9, toNumber(today()), 'dative')).toEqual('лейтенанту Лебедеву Алексею Васильевичу, заместителю командира роты по военно-политической работе 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 10, date and case", () => {
        expect(P.getRangeFullnamePosition(10, toNumber(today()), 'dative')).toEqual('старшему сержанту Джамалудинову Али Дибировичу, старшему технику 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 11, date and case", () => {
        expect(P.getRangeFullnamePosition(11, toNumber(today()), 'dative')).toEqual('прапорщику Адилову Тажидину Исаевичу, старшине 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 12, date and case", () => {
        expect(P.getRangeFullnamePosition(12, toNumber(today()), 'dative')).toEqual('сержанту Малиновской Марине Жамалудиновне, фельдшеру 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 13, date and case", () => {
        expect(P.getRangeFullnamePosition(13, toNumber(today()), 'dative')).toEqual('сержанту Дулину Виктору Валентиновичу, командиру отделения 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 14, date and case", () => {
        expect(P.getRangeFullnamePosition(14, toNumber(today()), 'dative')).toEqual('младшему сержанту Арясову Виталию Павловичу, старшему водителю 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 15, date and case", () => {
        expect(P.getRangeFullnamePosition(15, toNumber(today()), 'dative')).toEqual('рядовому Сайгидулаеву Ахмеду Шагидхановичу, наводчику 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 16, date and case", () => {
        expect(P.getRangeFullnamePosition(16, toNumber(today()), 'dative')).toEqual('рядовому Багамаеву Жамалу Джамалутдиновичу, радиотелефонисту 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 17, date and case", () => {
        expect(P.getRangeFullnamePosition(17, toNumber(today()), 'dative')).toEqual('рядовому Дурдыеву Анзору Лавереновичу, оператору 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
      test("when input has persinId 18, date and case", () => {
        expect(P.getRangeFullnamePosition(18, toNumber(today()), 'dative')).toEqual('лейтенанту Охотникову Александру Валерьевичу, командиру взвода 1 мотострелкового взвода 1 мотострелковой роты 1 мотострелкового батальона войсковой части 16544');
      });
    });
  });
});
