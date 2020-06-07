const { getCase } = require("./cases.js");
module.exports = class RangeController {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  getRange(rangeId, inCase) {
    const result = this.dispatcher
      .stateOf("ranges")
      .find((r) => r.id === rangeId);
    return result ? result[getCase(inCase)] : null;
  }
  rangeIdOf(nominativeRange) {
    const result = this.dispatcher
      .stateOf("ranges")
      .find((r) => r.nominative === nominativeRange);
    return result ? result.id : null;
  }
};
