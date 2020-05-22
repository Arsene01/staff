const Department = require('../../components/departments.js');
const Dispatcher = require('../../dispatcher.js');

const D = new Department(new Dispatcher());
const d1 = { departmentNameId: 62, number: 1, start: 10 };
const p1 = { positionDataId: 10, number: 1, start: 10 };

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
        data: { id: 1, item: 1, positionDataId: 10 },
        range: { start: 10, end: 2958525 }
      });
    });
    test("...when such position object has already added", () => {
      expect(D.addPositionToState(p1)).toEqual({
        relevant: { departmentId: null },
        data: { id: 2, item: 2, positionDataId: 10 },
        range: { start: 10, end: 2958525 }
      });
    });
    test("...when two such position objects has already added", () => {
      expect(D.addPositionToState(p1)).toEqual({
        relevant: { departmentId: null },
        data: { id: 3, item: 3, positionDataId: 10 },
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
          data: { id: 1, item: 1, positionDataId: 10 },
          range: { start: 10, end: 2958525 }
        },
        {
          relevant: { departmentId: null },
          data: { id: 2, item: 2, positionDataId: 10 },
          range: { start: 10, end: 2958525 }
        },
        {
          relevant: { departmentId: null },
          data: { id: 3, item: 3, positionDataId: 10 },
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

/*
  test("DepartmentController initialization testing", () => {
    expect(dc.departments).toEqual([]);
  });
  test("Department creating testing", () => {
    dc.createDepartment(3);
    expect(dc.departments).toEqual([
      { id: 0, departmentInfoId: 3, positions: [], departments: [] }
    ]);
  });
  test("Testing getDepartmentById method", () => {
    expect(dc.getDepartmentById(0)).toEqual(
      { id: 0, departmentInfoId: 3, positions: [], departments: [] }
    );
  });
  test("Testing getDepartmentName method", () => {
    const dep = dc.getDepartmentById(0);
    expect(dc.getDepartmentName(dep)).toEqual('мотострелковый батальон');
  });
  test("Testing getDepartmentName method", () => {
    const dep = dc.getDepartmentById(0);
    expect(dc.getDepartmentName(dep, 'genitive')).toEqual('мотострелкового батальона');
  });
  test("Testing setNumberToDepartment method", () => {
    const dep = dc.getDepartmentById(0);
    dc.setNumberToDepartment(1, dep);
    expect(dc.getDepartmentName(dep)).toEqual('1 мотострелковый батальон');
  });
  test("Testing setNumberToDepartment method", () => {
    const dep = dc.getDepartmentById(0);
    dc.setNumberToDepartment(2, dep);
    expect(dc.getDepartmentName(dep, 'genitive')).toEqual('1 мотострелкового батальона');
  });
  test("Testing subdue method", () => {
    dc.createDepartment(2);
    const batalion = dc.getDepartmentById(0),
          rota = dc.getDepartmentById(1);
    dc.setNumberToDepartment(2, rota);
    dc.subdue(rota, batalion);
    expect(rota.getParentId()).toEqual(0);
  });
  test("Testing getDepartmentFullName method", () => {
    const batalion = dc.getDepartmentById(0),
          rota = dc.getDepartmentById(1);
    expect(dc.getDepartmentFullName(rota, 'genitive')).toEqual('2 мотострелковой роты 1 мотострелкового батальона');
  });
  test("Testing getDepartmentFullName method", () => {
    const batalion = dc.getDepartmentById(0),
          rota = dc.getDepartmentById(1);
    expect(dc.getDepartmentFullName(rota, 'dative')).toEqual('2 мотострелковой роте 1 мотострелкового батальона');
  });
  test("Testing getDepartments method", () => {
    const batalion = dc.getDepartmentById(0),
          rota = dc.getDepartmentById(1);
    expect(batalion.getDepartments()).toEqual([1]);
  });
  test("Testing getPositionIds method", () => {
    const batalion = dc.getDepartmentById(0),
          rota = dc.getDepartmentById(1);
    expect(dc.getPositionIds(batalion)).toEqual([ ]);
  });
  test("Testing addPositionToDepartment method", () => {
    const batalion = dc.getDepartmentById(0);
    dc.addPositionToDepartment(1, batalion);
    dc.addPositionToDepartment(3, batalion);
    expect(batalion.getPositions()).toEqual([ 1, 3 ]);
  });
  test("", () => {});
  test("", () => {});
  test("", () => {});
  test("", () => {});*/
});
