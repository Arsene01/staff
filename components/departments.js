class DepartmentInfo {
  constructor(id, nominativeName, genitiveName, dativeName) {
    this.id = this.id;
    this.nominativeName = nominativeName;
    this.genitiveName = genitiveName;
    this.dativeName = dativeName;
  }
  getId() { return this.id; }
  getNominativeName() { return this.nominativeName; }
  getGenitiveName() { return this.genitiveName; }
  getDativeName() { return this.dativeName; }
}

class Department {
  constructor(id, departmentInfoId) {
    this.id = id;
    this.departmentInfoId = departmentInfoId;
    this.positions = [];
    this.departments = [];
  }
  setNumber(number) { this.number = this.number ? this.number: number; }
  addPosition(positionId) {
    this.positions.push(positionId);
  }
  addDepartment(departmentId) {
    this.departments.push(departmentId);
  }
  setParentId(departmentId) { this.parentId = departmentId; }
  getParentId() { return this.parentId === undefined ? null : this.parentId; }
  getDepartmentInfoId() { return this.departmentInfoId; }
  getId() { return this.id; }
  getNumber() { return this.number ? this.number : null; }
  getPositions() { return this.positions ? this.positions : null; }
  getDepartments() { return this.departments; }
}

class DepartmentController {
  constructor(departmentInfoEnumeration) {
    this.departmentInfoEnumeration = departmentInfoEnumeration;
    this.departments = [];
  }
  createDepartment(departmentInfoId) {
    this.departments.push(new Department(this.departments.length, departmentInfoId));
  }
  getDepartmentById(departmentId) { return this.departments[departmentId]; }
  subdue(subdepartment, department) {
    department.addDepartment(subdepartment.getId());
    subdepartment.setParentId(department.getId());
  }
  getDepartmentName(department, inCase) {
    const number = department.getNumber() ? (department.getNumber() + ' ') : '';
    const departmentName = this.departmentInfoEnumeration[
        department.getDepartmentInfoId()
      ][
        ['nominative', 'dative', 'genitive'].includes(inCase) ? inCase : 'nominative'
      ];
    return number + departmentName;
  }
  getDepartmentFullName(department, inCase) {
    const fullname = [];
    fullname.push(this.getDepartmentName(department, inCase));
    let parent = this.getDepartmentById(department.getParentId());
    while (parent){
      fullname.push(this.getDepartmentName(parent, 'genitive'));
      parent = this.getDepartmentById(parent.getParentId());
    }
    return fullname.join(' ');
  }
  getPositionIds(department) { return department.getPositions(); }
  setNumberToDepartment(number, department) {
    department.setNumber(number);
  }
  addPositionToDepartment(positionId, department) {
    department.addPosition(positionId);
  }  
}

const createDepartmentController = departmentInfos => {
  return new DepartmentController(departmentInfos);
};
exports.createDepartmentController = createDepartmentController;
