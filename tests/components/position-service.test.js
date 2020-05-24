const PositionService = require('../../components/position-service.js');
const Dispatcher = require('../../dispatcher.js');

const p = new PositionService(new Dispatcher());

describe("PositionService class...", () => {
  const s = p.dispatcher.stateOf('position-service');
  describe("testing applyPosition method...", () => {
    test("when position service data source is empty", () => {
      p.applyPosition(1, 1, 42730);
      expect(s).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 2958525 }
        }
      ]);
    });
    test("when repeatly position applying attemp", () => {
      p.applyPosition(1, 1, 42730);
      expect(s).toEqual([
        {
          relevant: { positionId: 1, personId: 1 },
          range: { start: 42730, end: 2958525 }
        }
      ]);
    });
    test("when position has freed one day before", () => {
      p.applyPosition(2, 2, 43000);
      expect(s).toEqual([
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


});
