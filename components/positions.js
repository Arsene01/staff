class Position {
  constructor(id, positionNameId, vusNumberId, tariffCategory, statePositionCategoryId) {
    this.id = id;
    this.positionNameId = positionNameId;
    this.vusNumberId = vusNumberId;
    this.tariffCategory = tariffCategory;
    this.statePositionCategoryId = statePositionCategoryId;
  }
  getId() { return this.id; }
  getPositionNameId() { return this.positionNameId; }
  getVusNumberId() { return this.vusNumberId; }
  getTariffCategory() { return this.tariffCategory; }
  getStatePositionCategoryId() { return this.statePositionCategoryId; }
  getDepartmentId() { this.departmentId === undefined ? null : this.departmentId; }
}

class PositionController {
  constructor(positionNameEnumeration, vusNumberEnumeration) {
    this.positionNameEnumeration = positionNameEnumeration;
    this.vusNumberEnumeration = vusNumberEnumeration;
    this.positions = [];
  }
  createPosition(positionNameId, vusNumberId, tariffCategory, statePositionCategoryId) {
    const position = new Position(
      this.positions.length,
      positionNameId,
      vusNumberId,
      tariffCategory,
      statePositionCategoryId
    );
    this.positions.push(position);
  }
  getPositionById(positionId) { return this.positions[positionId]; }
  getPositionName(position, inCase) {
    return this.positionNameEnumeration[
      position.getPositionNameId()
    ][
      ['nominative', 'dative', 'genitive'].includes(inCase) ? inCase : 'nominative'
    ];
  }
  getVusNumber(position) { return this.vusNumberEnumeration[position.getVusNumberId()]; }

  //this.method is not covered with tests
  //the way how this method will be used is not defined
  getStatePositionCategory(position) {
    if (this.mediator) return this.mediator.rangeController.getRange(
      position.getStatePositionCategoryId()
    )['nominative'];
    return null;
  }
}
const createPositionController = (positionNameEnumeration, vusNumberEnumeration) => {
  return new PositionController(positionNameEnumeration, vusNumberEnumeration);
}
exports.createPositionController = createPositionController;
