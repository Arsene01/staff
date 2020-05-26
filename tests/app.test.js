const Dispatcher = require('../dispatcher.js');
const Address = require('../components/address.js');
const Department = require('../components/departments.js');
const Person = require('../components/person.js');
const Position = require('../components/positions.js');
const Range = require('../components/range.js');
const { toNumber } = require('../components/date-transform.js');

describe("Application working...", () => {
  const D = new Dispatcher();
  const d = new Department(D);
  const P = new Person(D);
  const p = new Position(D);
  const r = new Range(D);

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
          .newPerson()
          .setLastname('Кабиев')
          .setFirstname('Тлектес')
          .setMiddlename('Серикович');
        P.birthdate = '02.01.1983';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 1 },
            data: {
              _lastnameId: 687, _firstnameId: 623, _middlenameId: 486,
              _birthdate: 30318
            },
            range: { start: 30318, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Сергиенко Николай Васильевич'", () => {
        P
          .newPerson()
          .setLastname('Сергиенко')
          .setFirstname('Николай')
          .setMiddlename('Васильевич');
        P.birthdate = '07.12.1983';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 2 },
            data: {
              _lastnameId: 1312, _firstnameId: 471, _middlenameId: 52,
              _birthdate: 30657
            },
            range: { start: 30657, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Ерофеев Матвей Андреевич'", () => {
        P
          .newPerson()
          .setLastname('Ерофеев')
          .setFirstname('Матвей')
          .setMiddlename('Андреевич');
        P.birthdate = '09.07.1989';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 3 },
            data: {
              _lastnameId: 591, _firstnameId: 410, _middlenameId: 154,
              _birthdate: 32698
            },
            range: { start: 32698, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Велитарский Александр Геннадьевич'", () => {
        P
          .newPerson()
          .setLastname('Велитарский')
          .setFirstname('Александр')
          .setMiddlename('Геннадьевич');
        P.birthdate = '23.01.1986';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 4 },
            data: {
              _lastnameId: 1736, _firstnameId: 51, _middlenameId: 89,
              _birthdate: 31435
            },
            range: { start: 31435, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Боков Мустафа Курашевич'", () => {
        P
          .newPerson()
          .setLastname('Боков')
          .setFirstname('Мустафа')
          .setMiddlename('Курашевич');
        P.birthdate = '23.08.1986';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 5 },
            data: {
              _lastnameId: 278, _firstnameId: 442, _middlenameId: 280,
              _birthdate: 31647
            },
            range: { start: 31647, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Тутуров Игорь Викторович'", () => {
        P
          .newPerson()
          .setLastname('Тутуров')
          .setFirstname('Игорь')
          .setMiddlename('Викторович');
        P.birthdate = '28.02.1990';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 6 },
            data: {
              _lastnameId: 1470, _firstnameId: 301, _middlenameId: 106,
              _birthdate: 32932
            },
            range: { start: 32932, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Садуллаев Юсуп Сайдмагомедович'", () => {
        P
          .newPerson()
          .setLastname('Садуллаев')
          .setFirstname('Юсуп')
          .setMiddlename('Сайдмагомедович');
        P.birthdate = '17.07.1975';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 7 },
            data: {
              _lastnameId: 1249, _firstnameId: 714, _middlenameId: 718,
              _birthdate: 27592
            },
            range: { start: 27592, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Кулбахтин Илюз Филюзович'", () => {
        P
          .newPerson()
          .setLastname('Кулбахтин')
          .setFirstname('Илюз')
          .setMiddlename('Филюзович');
        P.birthdate = '06.06.1993';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 8 },
            data: {
              _lastnameId: 838, _firstnameId: 320, _middlenameId: 526,
              _birthdate: 34126
            },
            range: { start: 34126, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Лебедев Алексей Васильевич'", () => {
        P
          .newPerson()
          .setLastname('Лебедев')
          .setFirstname('Алексей')
          .setMiddlename('Васильевич');
        P.birthdate = '24.11.1995';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 9 },
            data: {
              _lastnameId: 872, _firstnameId: 52, _middlenameId: 52,
              _birthdate: 35027
            },
            range: { start: 35027, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Джамалудинов Али Дибирович'", () => {
        P
          .newPerson()
          .setLastname('Джамалудинов')
          .setFirstname('Али')
          .setMiddlename('Дибирович');
        P.birthdate = '22.04.1979';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 10 },
            data: {
              _lastnameId: 516, _firstnameId: 53, _middlenameId: 396,
              _birthdate: 28967
            },
            range: { start: 28967, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Адилов Тажидин Исаевич'", () => {
        P
          .newPerson()
          .setLastname('Адилов')
          .setFirstname('Тажидин')
          .setMiddlename('Исаевич');
        P.birthdate = '15.01.1980';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 11 },
            data: {
              _lastnameId: 1737, _firstnameId: 602, _middlenameId: 31,
              _birthdate: 29235
            },
            range: { start: 29235, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Малиновская Марина Жамалудиновна'", () => {
        P
          .newPerson()
          .setLastname('Малиновская')
          .setFirstname('Марина')
          .setMiddlename('Жамалудиновна');
        P.birthdate = '19.10.1983';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 12 },
            data: {
              _lastnameId: 935, _firstnameId: 404, _middlenameId: 575,
              _birthdate: 30608
            },
            range: { start: 30608, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Дулин Виктор Валентинович'", () => {
        P
          .newPerson()
          .setLastname('Дулин')
          .setFirstname('Виктор')
          .setMiddlename('Валентинович');
        P.birthdate = '25.01.1984';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 13 },
            data: {
              _lastnameId: 569, _firstnameId: 180, _middlenameId: 205,
              _birthdate: 30706
            },
            range: { start: 30706, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Арясов Виталий Павлович'", () => {
        P
          .newPerson()
          .setLastname('Арясов')
          .setFirstname('Виталий')
          .setMiddlename('Павлович');
        P.birthdate = '23.03.1981';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 14 },
            data: {
              _lastnameId: 145, _firstnameId: 188, _middlenameId: 171,
              _birthdate: 29668
            },
            range: { start: 29668, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Сайгидулаев Ахмед Шагидханович'", () => {
        P
          .newPerson()
          .setLastname('Сайгидулаев')
          .setFirstname('Ахмед')
          .setMiddlename('Шагидханович');
        P.birthdate = '05.03.1980';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 15 },
            data: {
              _lastnameId: 1254, _firstnameId: 124, _middlenameId: 721,
              _birthdate: 29285
            },
            range: { start: 29285, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Багамаев Жамал Джамалутдинович'", () => {
        P
          .newPerson()
          .setLastname('Багамаев')
          .setFirstname('Жамал')
          .setMiddlename('Джамалутдинович');
        P.birthdate = '11.06.1992';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 16 },
            data: {
              _lastnameId: 1738, _firstnameId: 728, _middlenameId: 12,
              _birthdate: 33766
            },
            range: { start: 33766, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Дурдыев Анзор Лаверенович'", () => {
        P
          .newPerson()
          .setLastname('Дурдыев')
          .setFirstname('Анзор')
          .setMiddlename('Лаверенович');
        P.birthdate = '27.03.1994';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 17 },
            data: {
              _lastnameId: 571, _firstnameId: 86, _middlenameId: 919,
              _birthdate: 34420
            },
            range: { start: 34420, end: 2958525 }
          }
        ])
      });
      test("when adding person 'Охотников Александр Валерьевич'", () => {
        P
          .newPerson()
          .setLastname('Охотников')
          .setFirstname('Александр')
          .setMiddlename('Валерьевич');
        P.birthdate = '20.06.1996';

        const state = [...D.stateOf('person-data')];
        P.registerPerson();
        expect(D.stateOf('person-data')).toEqual([
          ...state,
          {
            relevant: { personId: 18 },
            data: {
              _lastnameId: 1135, _firstnameId: 51, _middlenameId: 102,
              _birthdate: 35236
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
      test("when id is 1", () => {});
    });

  });
});
