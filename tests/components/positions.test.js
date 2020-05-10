const Positions = require('../../components/positions.js');

const vusNumbers = [ '100182', '837037' ],
      positionNames = [
        { nominative: "водитель", genitive: "водителя", dative: "водителю" },
        { nominative: "командир отделения", genitive: "командира отделения", dative: "командиру отделения" }
      ],
      pc = Positions.createPositionController(positionNames, vusNumbers);

describe("Positions module testing...\n", () => {
  test("Check that positionController has been initialized", () => {
    expect(pc.positions).toEqual([]);
  });
  test("Check that first position has been added", () => {
    pc.createPosition(1, 0, 5, 1);
    expect(pc.positions).toEqual([
      { id: 0, positionNameId: 1, vusNumberId: 0, tariffCategory: 5, statePositionCategoryId: 1 }
    ]);
  });
  test("Check that second position has been added", () => {
    pc.createPosition(0, 1, 2, 0);
    expect(pc.positions).toEqual([
      { id: 0, positionNameId: 1, vusNumberId: 0, tariffCategory: 5, statePositionCategoryId: 1 },
      { id: 1, positionNameId: 0, vusNumberId: 1, tariffCategory: 2, statePositionCategoryId: 0 }
    ]);
  });
  test("Testing  getPositionById method", () => {
    expect(pc.getPositionById(0)).toEqual(
      { id: 0, positionNameId: 1, vusNumberId: 0, tariffCategory: 5, statePositionCategoryId: 1 }
    );
  });
  test("Testing  getPositionById method", () => {
    expect(pc.getPositionById(1)).toEqual(
      { id: 1, positionNameId: 0, vusNumberId: 1, tariffCategory: 2, statePositionCategoryId: 0 }
    );
  });
  test("Testing  getPositionName method", () => {
    expect(pc.getPositionName(pc.getPositionById(0))).toEqual('командир отделения');
  });
  test("Testing  getPositionName method", () => {
    expect(pc.getPositionName(pc.getPositionById(0), 'dative')).toEqual('командиру отделения');
  });

  test("Testing  getVusNumber method", () => {
    expect(pc.getVusNumber(pc.getPositionById(0))).toEqual('100182');
  });
  test("Testing  getVusNumber method", () => {
    expect(pc.getVusNumber(pc.getPositionById(1))).toEqual('837037');
  });
});
