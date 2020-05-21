const Position = require('../../components/positions.js');
const Dispatcher = require('../../dispatcher.js');

const P = new Position(new Dispatcher());

describe("Positions module testing...\n", () => {
  describe("getPositionNameId method testing...", () => {
    test("...when input is 'командир отделения'", () => {
      expect(P.getPositionNameId('командир отделения')).toEqual(69);
    });
    test("...when input is 'наводчик'", () => {
      expect(P.getPositionNameId('наводчик')).toEqual(102);
    });
    test("...when input is 'заместитель командира взвода - командир отделения'", () => {
      expect(P.getPositionNameId('заместитель командира взвода - командир отделения')).toEqual(36);
    });
    test("...when input is 'нет такой должности'", () => {
      expect(P.getPositionNameId('нет такой должности')).toEqual(null);
    });
  });

  describe("getVusNumberId method testing...", () => {
    test("...when input is '837037'", () => {
      expect(P.getVusNumberId('837037')).toEqual(2);
    });
    test("...when input is '124037'", () => {
      expect(P.getVusNumberId('124037')).toEqual(1);
    });
    test("...when input is '100097/182'", () => {
      expect(P.getVusNumberId('100097/182')).toEqual(49);
    });
    test("...when input is '123456'", () => {
      expect(P.getVusNumberId('123456')).toEqual(null);
    });
  });

  describe("isValid method testing...", () => {
    test("...when input is valid personData object", () => {
      expect(P.isValid({ positionNameId: 36, vusNumberId: 49, rangeId: 4, tariffCategory: 7 })).toEqual(true);
    });
    test("...when input don't have positionNameId property", () => {
      expect(P.isValid({ vusNumberId: 49, rangeId: 4, tariffCategory: 7 })).toEqual(false);
    });
    test("...when input don't have vusNumberId property", () => {
      expect(P.isValid({ positionNameId: 36, rangeId: 4, tariffCategory: 7 })).toEqual(false);
    });
    test("...when input don't have rangeId property", () => {
      expect(P.isValid({ positionNameId: 36, vusNumberId: 49, tariffCategory: 7 })).toEqual(false);
    });
    test("...when input don't have tariffCategory property", () => {
      expect(P.isValid({ positionNameId: 36, vusNumberId: 49, rangeId: 4 })).toEqual(false);
    });
    test("...when input is empty object", () => {
      expect(P.isValid({})).toEqual(false);
    });
  });

  describe("addPositionData method testing...", () => {
    const pd = { positionNameId: 36, vusNumberId: 49, rangeId: 4, tariffCategory: 7 };
    test("...when personData object is not valid", () => {
      expect(P.addPositionData({})).toEqual(undefined);
    });
    test("...when person-data source is empty", () => {
      expect(P.addPositionData(pd)).toEqual({ id: 1, ...pd });
    });
    test("...when attempt to add object repeatly", () => {
      expect(P.addPositionData(pd)).toEqual({ id: 1, ...pd });
    });
  });

  describe("findPositionData method testing...", () => {
    const pd = { positionNameId: 36, vusNumberId: 49, rangeId: 4, tariffCategory: 7 };
    test("...when personData object is not valid", () => {
      expect(P.findPositionData({})).toEqual(undefined);
    });
    test("...when no personData object in person-data source", () => {
      expect(P.findPositionData({ ...pd, rangeId: 7})).toEqual(undefined);
    });
    test("...when personData object is in person-data source", () => {
      expect(P.findPositionData(pd)).toEqual({ id: 1, ...pd });
    });
  });

  describe("getPositionData method testing...", () => {
    const pd = { positionNameId: 36, vusNumberId: 49, rangeId: 4, tariffCategory: 7 };
    test("...when no position-data element with id equals to positionId", () => {
      expect(P.getPositionData(12)).toEqual(undefined);
    });
    test("...when no element with id equals to positionId", () => {
      expect(P.getPositionData(0)).toEqual(undefined);
    });
    test("...when position-data element with id equals to positionId exists", () => {
      expect(P.getPositionData(1)).toEqual({ id: 1, ...pd });
    });
  });

  describe("getPosition method testing...", () => {
    test("...when no position-data element with id equals to positionId", () => {
      expect(P.getPosition(0)).toEqual(null);
    });
    test("...when position name case not defined", () => {
      expect(P.getPosition(1)).toEqual('заместитель командира взвода - командир отделения');
    });
    test("...when position name case is nominative", () => {
      expect(P.getPosition(1, 'nominative')).toEqual('заместитель командира взвода - командир отделения');
    });
    test("...when position name case is dative", () => {
      expect(P.getPosition(1, 'dative')).toEqual('заместителю командира взвода - командиру отделения');
    });
    test("...when position name case is genitive", () => {
      expect(P.getPosition(1, 'genitive')).toEqual('заместителя командира взвода - командира отделения');
    });
  });

  describe("getVusNumber method testing...", () => {
    test("...when no position-data element with id equals to positionId", () => {
      expect(P.getVusNumber(0)).toEqual(null);
    });
    test("...when position-data element with id equals to positionId exists", () => {
      expect(P.getVusNumber(1)).toEqual('100097/182');
    });
  });

  describe("getTariffCategory method testing...", () => {
    test("...when no position-data element with id equals to positionId", () => {
      expect(P.getTariffCategory(0)).toEqual(null);
    });
    test("...when position-data element with id equals to positionId exists", () => {
      expect(P.getTariffCategory(1)).toEqual(7);
    });
  });

  describe("getStatePositionCategory method testing...", () => {
    test("...when no position-data element with id equals to positionId", () => {
      expect(P.getStatePositionCategory(0)).toEqual(null);
    });
    test("...when position-data element with id equals to positionId exists", () => {
      expect(P.getStatePositionCategory(1)).toEqual('сержант');
    });
  });

  /*
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
  });*/
});
