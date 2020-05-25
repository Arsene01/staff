const PositionService = require('../../components/position-service.js');
const Dispatcher = require('../../dispatcher.js');

const p = new PositionService(new Dispatcher());
const s = p.dispatcher.getDataSource('position-service').source;

describe("PositionService class...", () => {
  describe("testing applyPosition method...", () => {
    test("when position service data source is empty", () => {
      p.applyPosition(1, 1, 42730);
      expect(s.state).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 2958525 }
        }
      ]);
    });
    test("when repeatly position applying attemp", () => {
      p.applyPosition(1, 1, 42730);
      expect(s.state).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 2958525 }
        }
      ]);
    });
    test("when position has freed one day before", () => {
      p.applyPosition(2, 2, 43000);
      expect(s.state).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 2958525 }
        },
        {
          relevant: { positionId: 2, personId: 2 },
          range: { start: 43000, end: 2958525 }
        }
      ]);
    });
  });

  describe("testing isPositionFree method", () => {

    test("when input has no range", () => {
      s.clear();
      expect(p.isPositionFree(1)).toBeUndefined();
    });
    test("when input has no positionId", () => {
      expect(p.isPositionFree({ start: 42730 })).toBeUndefined();
    });
    test("when input is valid", () => {
      expect(p.isPositionFree(1, { start: 42730 })).toBeTruthy();
    });
    test("when position is not free", () => {
      p.applyPosition(1, 1, 43000);
      expect(p.isPositionFree(1, { start: 42730 })).toBeFalsy();
    });
    test("when position is free within period", () => {
      expect(p.isPositionFree(1, { start: 42730, end: 42999 })).toBeTruthy();
    });
  });

  describe("testing freePosition method...", () => {
    test("when position free on 43000", () => {
      s.clear();
      p.applyPosition(1, 1, 42730);
      p.freePosition(1, 1, 43000);
      expect(s.state).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 43000 }
        }
      ]);
    });
    test("when input is not full", () => {
      expect(p.freePosition(1, 2)).toBeUndefined();
    });
    test("when input is not full", () => {
      expect(p.freePosition(1, 43000)).toBeUndefined();
    });
    test("when position is not applyed", () => {
      p.freePosition(1, 1, 44000);
      expect(s.state).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 43000 }
        }
      ]);
    });
    test("when position is not applyed", () => {
      p.freePosition(1, 1, 42729);
      expect(s.state).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 43000 }
        }
      ]);
    });
    test("when position applyed", () => {
      p.freePosition(1, 1, 42730);
      expect(s.state).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 42730 }
        }
      ]);
    });
  });


});
