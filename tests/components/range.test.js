const Ranges = require('../../components/range.js');
const Dispatcher = require('../../dispatcher.js');

const r = new Ranges(new Dispatcher());

describe("\n\nRanges module testing...\n", () => {
  test("Testing getRange method", () => {
    expect(r.getRange(1)).toEqual('рядовой');
  });
  test("Testing getRange method", () => {
    expect(r.getRange(0)).toEqual(null);
  });
  test("Testing getRange method", () => {
    expect(r.getRange(7, 'concise')).toEqual('прапорщик');
  });
  test("Testing getRange method", () => {
    expect(r.getRange(7, 'dative')).toEqual('прапорщику');
  });
  test("Testing getRange method", () => {
    expect(r.getRange(6, 'genitive')).toEqual('старшины');
  });
  test("Testing getRange method", () => {
    expect(r.getRange(6, 'accusative')).toEqual('старшину');
  });
  test("Testing rangeIdOf method", () => {
    expect(r.rangeIdOf('старшину')).toEqual(null);
  });
  test("Testing rangeIdOf method", () => {
    expect(r.rangeIdOf('старшина')).toEqual(6);
  });
  test("Testing rangeIdOf method", () => {
    expect(r.rangeIdOf('прапорщик')).toEqual(7);
  });
});
