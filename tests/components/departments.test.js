const Department = require('../../components/departments.js');
const Dispatcher = require('../../dispatcher.js');
const Position = require('../../components/positions.js');

const D = new Department(new Dispatcher());
const d1 = { departmentNameId: 62, number: 1, start: 10 };
const p1 = { positionDataId: 1, start: 10 };

describe("Departments module testing...\n", () => {
  describe("getDepartmentName method testing...", () => {
    test("...when input is not valid", () => {
      expect(D.getDepartmentName(0)).toEqual(null);
    });
    test("...when input is 59", () => {
      expect(D.getDepartmentName(59)).toEqual('мотострелковая рота');
    });
    test("...when input is 62", () => {
      expect(D.getDepartmentName(62)).toEqual('мотострелковый батальон');
    });
    test("...when input is 62", () => {
      expect(D.getDepartmentName(62, 'nominative')).toEqual('мотострелковый батальон');
    });
    test("...when input is 62", () => {
      expect(D.getDepartmentName(62, 'dative')).toEqual('мотострелковому батальону');
    });
    test("...when input is 62", () => {
      expect(D.getDepartmentName(62, 'genitive')).toEqual('мотострелкового батальона');
    });
  });

  describe("addPositionToState method testing...", () => {
    test("...when position source is empty", () => {
      expect(D.addPositionToState(p1)).toEqual({
        relevant: { departmentId: null },
        data: { id: 1, item: 1, positionDataId: 1 },
        range: { start: 10, end: 2958525 }
      });
    });
    test("...when such position object has already added", () => {
      expect(D.addPositionToState(p1)).toEqual({
        relevant: { departmentId: null },
        data: { id: 2, item: 2, positionDataId: 1 },
        range: { start: 10, end: 2958525 }
      });
    });
    test("...when two such position objects has already added", () => {
      expect(D.addPositionToState(p1)).toEqual({
        relevant: { departmentId: null },
        data: { id: 3, item: 3, positionDataId: 1 },
        range: { start: 10, end: 2958525 }
      });
    });
  });

  describe("addDepartmentToState method testing...", () => {
    test("...when departments source is empty", () => {
      expect(D.addDepartmentToState(d1)).toEqual({
        relevant: { departmentId: null },
        data: { id: 1, item: 4, number: 1, departmentNameId: 62 },
        range: { start: 10, end: 2958525 }
      });
    });
    test("...when such department object has already added", () => {
      expect(D.addDepartmentToState(d1)).toEqual({
        relevant: { departmentId: null },
        data: { id: 2, item: 5, number: 1, departmentNameId: 62 },
        range: { start: 10, end: 2958525 }
      });
    });
    test("...when two such department objects has already added", () => {
      expect(D.addDepartmentToState(d1)).toEqual({
        relevant: { departmentId: null },
        data: { id: 3, item: 6, number: 1, departmentNameId: 62 },
        range: { start: 10, end: 2958525 }
      });
    });
  });

  describe("getStateElementsOf method testing...", () => {
    test("...when three position objects and three department objects has been added", () => {
      const result = [
        {
          relevant: { departmentId: null },
          data: { id: 1, item: 1, positionDataId: 1 },
          range: { start: 10, end: 2958525 }
        },
        {
          relevant: { departmentId: null },
          data: { id: 2, item: 2, positionDataId: 1 },
          range: { start: 10, end: 2958525 }
        },
        {
          relevant: { departmentId: null },
          data: { id: 3, item: 3, positionDataId: 1 },
          range: { start: 10, end: 2958525 }
        },
        {
          relevant: { departmentId: null },
          data: { id: 1, item: 4, number: 1, departmentNameId: 62 },
          range: { start: 10, end: 2958525 }
        },
        {
          relevant: { departmentId: null },
          data: { id: 2, item: 5, number: 1, departmentNameId: 62 },
          range: { start: 10, end: 2958525 }
        },
        {
          relevant: { departmentId: null },
          data: { id: 3, item: 6, number: 1, departmentNameId: 62 },
          range: { start: 10, end: 2958525 }
        }
      ];
      expect(D.getStateElementsOf(null)).toEqual(result);
    });
  });

  describe("calculateItemFor method testing...", () => {
    test("...when three position objects and three department objects has been added", () => {
      expect(D.calculateItemFor(null)).toEqual(7);
    });
    test("...when three position objects and four department objects has been added", () => {
      D.addDepartmentToState(d1);
      expect(D.calculateItemFor(null)).toEqual(8);
    });
    test("...when four position objects and four department objects has been added", () => {
      D.addPositionToState(p1);
      expect(D.calculateItemFor(null)).toEqual(9);
    });
  });

  describe("getDepartmentId method testing...", () => {
    test("...when input is 'мотострелковый батальон'", () => {
      expect(D.getDepartmentId('мотострелковый батальон')).toEqual(62);
    });
    test("...when input is 'мотострелковая рота'", () => {
      expect(D.getDepartmentId('мотострелковая рота')).toEqual(59);
    });
    test("...when input is not valid", () => {
      expect(D.getDepartmentId('нет такого названия подразделения')).toEqual(null);
    });
  });

  describe("getDepartment method testing...", () => {
    test("...when input is null", () => {
      expect(D.getDepartment(null)).toEqual('войсковой части 16544');
    });
    test("...when input is 1", () => {
      expect(D.getDepartment(1)).toEqual('1 мотострелкового батальона войсковой части 16544');
    });
  });

  describe("getPositionFullname method testing...", () => {
    test("...when input is null", () => {
      expect(D.getPositionFullname(null)).toEqual(null);
    });
    test("...when input is 1", () => {
      const P = new Position(D.dispatcher);
      P.addPositionData({
        positionNameId: 1,
        vusNumberId: 2,
        tariffCategory: 2,
        rangeId: 2
      });
      expect(D.getPositionFullname(1)).toEqual('водитель войсковой части 16544');
    });
    test("...when input is 5 for department with id equals 1", () => {
      D.addPositionToState({ ...p1, superDepartmentId: 1 });
      expect(D.getPositionFullname(5)).toEqual('водитель 1 мотострелкового батальона войсковой части 16544');
    });
    test("...when input is 5 and set dative case for department with id equals 1", () => {
      expect(D.getPositionFullname(5, 'dative')).toEqual('водителю 1 мотострелкового батальона войсковой части 16544');
    });
  });
});
