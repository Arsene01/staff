module.exports = class RangeController {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  getRange(rangeId, inCase) {
    const result = this.dispatcher.stateOf('ranges')
        .find((r) => r.id === rangeId);
    return result ? result[
      [ 'nominative', 'accusative', 'dative', 'genitive'].includes(inCase) ? inCase : 'nominative'
    ] : null;
  }
  rangeIdOf(nominativeRange) {
    const result = this.dispatcher.stateOf('ranges')
        .find((r) => r.nominative === nominativeRange);
    return result ? result.id : null;
  }
}
