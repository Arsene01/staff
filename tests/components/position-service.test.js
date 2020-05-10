const PS = require('../../components/position-service.js');

const positionService = PS.createPositionService();

describe("PositionService module testing\n", () => {
  test("Sign that person applies position", () => {
    positionService.applyPosition(0, 2, 2);
    expect(positionService.services).toEqual([
      { positionId: 0, personId: 2, beginDate: 2 }
    ]);
  });
  test("Check position is free", () => {
    expect(positionService.isPositionFreeOnDate(0, 4)).toEqual(false);
  });
  test("Sign to service record free position date", () => {
    positionService.freePosition(0, 2, 3);
    expect(positionService.services).toEqual([
      { positionId: 0, personId: 2, beginDate: 2, endDate: 3 }
    ]);
  });
  test("Check position is free", () => {
    expect(positionService.isPositionFreeOnDate(0, 4)).toEqual(true);
  });

  test("Sign that person applies position", () => {
    positionService.applyPosition(0, 1, 5);
    expect(positionService.services).toEqual([
      { positionId: 0, personId: 2, beginDate: 2, endDate: 3 },
      { positionId: 0, personId: 1, beginDate: 5 }
    ]);
  });
  test("Check position is free", () => {
    expect(positionService.isPositionFreeOnDate(0, 4)).toEqual(false);
  });
  test("Check position is free", () => {
    expect(positionService.isPositionFreeOnDate(0, 6)).toEqual(false);
  });
  test("Sign to service record free position date", () => {
    positionService.freePosition(0, 2, 6);
    expect(positionService.services).toEqual([
      { positionId: 0, personId: 2, beginDate: 2, endDate: 3 },
      { positionId: 0, personId: 1, beginDate: 5 }
    ]);
  });
  test("Sign to service record free position date", () => {
    positionService.freePosition(0, 1, 6);
    expect(positionService.services).toEqual([
      { positionId: 0, personId: 2, beginDate: 2, endDate: 3 },
      { positionId: 0, personId: 1, beginDate: 5, endDate: 6 }
    ]);
  });
  test("Check position is free", () => {
    expect(positionService.isPositionFreeOnDate(0, 7)).toEqual(true);
  });
  test("Delete service record from positionService", () => {
    positionService.deletePositionService(0)
    expect(positionService.services).toEqual([
      { positionId: 0, personId: 1, beginDate: 5, endDate: 6 }
    ]);
  });
});
