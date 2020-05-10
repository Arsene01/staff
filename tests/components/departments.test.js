const Departments = require('../../components/departments.js');

const departmentInfos = [
        { nominative: "мотострелковое отделение", genitive: "мотострелкового отделения", dative: "мотострелковому отделению" },
        { nominative: "мотострелковый взвод", genitive: "мотострелкового взвода", dative:"мотострелковому взводу" },
        { nominative: "мотострелковая рота", genitive: "мотострелковой роты", dative: "мотострелковой роте" },
        { nominative: "мотострелковый батальон", genitive: "мотострелкового батальона", dative: "мотострелковому батальону" }
      ],
      dc = Departments.createDepartmentController(departmentInfos);

describe("Departments module testing...\n", () => {
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
  test("", () => {});
});
