const { getCase } = require('./cases.js');

module.exports = class Position {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  getPositionData(positionDataId) {
    return this.dispatcher.stateOf('position-data').find((p) => p.id === positionDataId);
  }
  getPosition(positionDataId, inCase) {
    const data = this.getPositionData(positionDataId);
    return !data ? null : (
      this
        .dispatcher
        .findInSource({ id: data.positionNameId }, 'position-names')[getCase(inCase)]
    );
  }
  getPositionNameId(positionName) {
    const result = this
      .dispatcher
      .findInSource({ nominative: positionName }, 'position-names');
    return result ? result.id : null;
  }
  getVusNumber(positionDataId) {
    const data = this.getPositionData(positionDataId);
    return (!data) ? null : (
      this
        .dispatcher
        .findInSource({ id: data.vusNumberId }, 'vus-numbers')
        .name
    );
  }
  getVusNumberId(vusNumber) {
    const result = this
      .dispatcher
      .findInSource({ name: vusNumber }, 'vus-numbers');
    return result ? result.id : null;
  }
  getTariffCategory(positionDataId) {
    const data = this.getPositionData(positionDataId);
    return (!data) ? null : data.tariffCategory;
  }
  getStatePositionCategory(positionDataId) {
    const data = this.getPositionData(positionDataId);
    return (!data) ? null : (
      this
        .dispatcher
        .findInSource({ id: data.rangeId }, 'ranges')[getCase()]
    );
  }
  isValid(positionData) {
    if (!positionData) return false;
    if (!positionData.positionNameId) return false;
    if (!positionData.vusNumberId) return false;
    if (!positionData.rangeId) return false;
    if (!positionData.tariffCategory) return false;
    return true;
  }
  findPositionData(positionData) {
    if (!this.isValid(positionData)) return;
    return this.dispatcher.findInSource(positionData, 'position-data');
  }
  addPositionData(positionData) {
    if (!this.isValid(positionData)) return;
    const pd = this.findPositionData(positionData);
    if (pd) return pd;
    const id = this.dispatcher.stateOf('position-data').length + 1;
    this.dispatcher.add({ ...positionData, id }, 'position-data');
    return this.findPositionData(positionData);
  }

  //Maybe this function is more relevant for departments
  insertPositionToState(departmentId, positionId, start) {
    return {
      relevant: { departmentId },
      data: { item, positionId, number },
      range: { start }
    }
  }
}
