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

  });
});
