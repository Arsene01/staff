const { getCase } = require('./cases.js');
const Position = require('./positions.js');

module.exports = class Department {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  getDepartmentName(departmentNameId, inCase) {
    const result = this
      .dispatcher
      .findInSource({ id: departmentNameId }, 'department-names');
    return result ? result[getCase(inCase)] : null;
  }

  addDepartmentToState({
    departmentNameId,
    number,
    superDepartmentId,
    start
  }) {
    if (!start) return;
    const relevant = { departmentId: superDepartmentId ? superDepartmentId : null };
    const data = { departmentNameId, id: this.dispatcher.stateOf('departments').length + 1 };
    data.item = this.calculateItemFor(superDepartmentId);
    if (number) data.number = number;
    this.dispatcher.add({ relevant, data, range: { start, end: 2958525 } }, 'departments', false);
    return this.dispatcher.findInSource({ data }, 'departments');
  }
  addPositionToState({
    positionDataId,
    superDepartmentId,
    start
  }) {
    if (!start) return;
    const relevant = { departmentId: superDepartmentId ? superDepartmentId : null };
    const data = { positionDataId, id: this.dispatcher.stateOf('positions').length + 1 };
    data.item = this.calculateItemFor(relevant.departmentId);
    this.dispatcher.add({ relevant, data, range: { start, end: 2958525 } }, 'positions', false);
    return this.dispatcher.findInSource({ data }, 'positions');
  }

  getStateElementsOf(departmentId) {
    return [
      ...this.dispatcher.filterInSource({ relevant: { departmentId }}, 'positions'),
      ...this.dispatcher.filterInSource({ relevant: { departmentId }}, 'departments')
    ];
  }
  calculateItemFor(departmentId = null) {
    const result = [...this.getStateElementsOf(departmentId)];
    return result.length ? result.length + 1 : 1;
  }

  getDepartmentId(departmentName) {
    const result = this
        .dispatcher
        .findInSource({ nominative: departmentName}, 'department-names');
    return result ? result.id : null;
  }
  getDepartment(departmentId) {
    const result = [];
    let d = this.dispatcher.findInSource({ data: { id: departmentId }}, 'departments');
    while (d) {
      if (d.data.number) result.push(d.data.number);
      result.push(this.getDepartmentName(d.data.departmentNameId, 'genitive'));
      d = this
          .dispatcher
          .findInSource({ data: { id: d.relevant.departmentId }}, 'departments');
    }
    result.push('войсковой части 16544');
    return result.join(' ');
  }

  getPositionFullname(positionId, inCase) {
    const p = this.dispatcher.findInSource({ data: { id: positionId }}, 'positions');
    return p ? [
      (new Position(this.dispatcher)).getPosition(p.data.positionDataId, inCase),
      this.getDepartment(p.relevant.departmentId)
    ].join(' ') : null;
  }

}

class DepartmentController {

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
