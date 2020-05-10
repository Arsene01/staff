const Ranges = require('../../components/range.js');

const ranges = [
  { nominative: "рядовой", concise: "рядовой", genitive: "рядового", dative: "рядовому"},
  { nominative: "прапорщик", concise: "прапорщик", genitive: "прапорщика", dative: "прапорщику"}
];

const rc = Ranges.createRangeController(ranges);

describe("\n\nRanges module testing...\n", () => {
  test("Testing getRange method", () => {
    expect(rc.getRange(1)).toEqual('прапорщик');
  });
  test("Testing getRange method", () => {
    expect(rc.getRange(0)).toEqual('рядовой');
  });
  test("Testing getRange method", () => {
    expect(rc.getRange(1, 'concise')).toEqual('прапорщик');
  });
  test("Testing getRange method", () => {
    expect(rc.getRange(1, 'dative')).toEqual('прапорщику');
  });
  test("Testing getRange method", () => {
    expect(rc.getRange(1, 'genitive')).toEqual('прапорщика');
  });
});
