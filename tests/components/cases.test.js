const { getCase, changeEnding } = require('../../components/cases.js');

const cases = [
  { nominative: 'сен', dative: 'сену', accusative: 'сена', genitive: 'сена' },
  { nominative: 'нна', dative: 'нне', accusative: 'нну', genitive: 'нны' },
  { nominative: 'лав', dative: 'лаву', accusative: 'лава', genitive: 'лава' },
  { nominative: 'тыр', dative: 'тыру', accusative: 'тыра', genitive: 'тыра' },
]

describe("getCase method testing...", () => {
  test("no arguments aplied", () => {
    expect(getCase()).toEqual('nominative');
  });
  test("notValid argument aplied", () => {
    expect(getCase()).toEqual('nominative');
  });
  test("'nominative' argument aplied", () => {
    expect(getCase('nominative')).toEqual('nominative');
  });
  test("'dative' argument aplied", () => {
    expect(getCase('dative')).toEqual('dative');
  });
  test("'accusative' argument aplied", () => {
    expect(getCase('accusative')).toEqual('accusative');
  });
  test("'genitive' argument aplied", () => {
    expect(getCase('genitive')).toEqual('genitive');
  });
});
