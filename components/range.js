class RangeController {
  constructor(rangeEnumeration) {
    this.rangeEnumeration = rangeEnumeration;
  }

  getRange(rangeId, inCase) {
    return this.rangeEnumeration[
      rangeId
    ][
      [ 'nominative', 'concise', 'dative', 'genitive'].includes(inCase) ? inCase : 'nominative'
    ];
  }
  getRangeInConciseCase(rangeId) {
    const index = this.getRangeIndexById(rangeId);
    return index === null ? null : this.rangeEnumeration[index].concise;
  }
  getRangeInDativeCase(rangeId) {
    const index = this.getRangeIndexById(rangeId);
    return index === null ? null : this.rangeEnumeration[index].dative;
  }
  getRangeInGenitiveCase(rangeId) {
    const index = this.getRangeIndexById(rangeId);
    return index === null ? null : this.rangeEnumeration[index].genitive;
  }
}

const createRangeController = ranges => new RangeController(ranges);
exports.createRangeController = createRangeController;
