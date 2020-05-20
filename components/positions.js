const { getCases } = require('./cases.js');

class Position {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  getPositionData(positionId) {
    return this.dispatcher.stateOf('positions').find((p) => p.id === positionId);
  }
  getPosition(positionId, inCase) {
    const data = this.getPositionData(positionId);
    return (!data) ? null : (
      this
        .dispatcher
        .stateOf('position-names')
        .find((p) => p.id === data.positionNameId)[getCases(inCase)]
    );
  }
  getVusNumber(positionId) {
    const data = this.getPositionData(positionId);
    return (!data) ? null : (
      this
        .dispatcher
        .stateOf('vus-numbers')
        .find((el) => el.id === data.vusNumberId)
        .name
    );
  }
  getTariffCategory(positionId) {
    const data = this.getPositionData(positionId);
    return (!data) ? null : data.tariffCategory;
  }
  getStatePositionCategory(positionId) {
    const data = this.getPositionData(positionId);
    return (!data) ? null : (
      this
        .dispatcher
        .stateOf('ranges')
        .find((r) => r.id === data.rangeId)[getCases()]
    );
  }

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
