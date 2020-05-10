const Allowance = require('./../../components/payments.js');
const SfAndOGVs = require('./../../components/special-forces-and-ogvs.js');
const TechAssignment = require('./../../components/technic-assignment.js');

describe("Allowance class testing...\n", () => {
  describe("specialForcesAndOGVS component testing...\n", () => {
    const allowance = new Allowance({ specialForcesAndOGVS: new SfAndOGVs() });
    test("Initializing...", () => {
      expect(allowance.specialForcesAndOGVS.collection).toEqual([]);
    });
    test("Adding new record", () => {
      allowance.specialForcesAndOGVS.add('16544', 1);
      expect(allowance.specialForcesAndOGVS.collection).toEqual([
        { body: '16544', startDate: 1 }
      ]);
    });
    test("Excluding record", () => {
      allowance.specialForcesAndOGVS.exclude('16544', 6);
      expect(allowance.specialForcesAndOGVS.collection).toEqual([
        { body: '16544', startDate: 1, endDate: 6 }
      ]);
    });
    test("Excluding record repeat", () => {
      allowance.specialForcesAndOGVS.exclude('16544', 4);
      expect(allowance.specialForcesAndOGVS.collection).toEqual([
        { body: '16544', startDate: 1, endDate: 6 }
      ]);
    });
    test("Adding new record repeat", () => {
      allowance.specialForcesAndOGVS.add('16544', 7);
      expect(allowance.specialForcesAndOGVS.collection).toEqual([
        { body: '16544', startDate: 1, endDate: 6 }
      ]);
    });
  });
  describe("Getting CounterTerrorist allowance data", () => {
    const allowance = new Allowance({ specialForcesAndOGVS: new SfAndOGVs() });
    test("Getting allowance data when applying duties since 20 when body is not enlisted", () => {
      expect(allowance.getCounterTerroristAllowanceData('16544', 20)).toEqual([
        { size: 100, startDate: 20, endDate: 2958465 }
      ]);
    });
    test("Getting allowance data when applying duties since 20 when body is enlisted since 10, but not excluded", () => {
      allowance.specialForcesAndOGVS.add('16544', 10);
      expect(allowance.getCounterTerroristAllowanceData('16544', 20)).toEqual([
        { size: 200, startDate: 20, endDate: 2958465 }
      ]);
    });
    test("Getting allowance data when applying duties since 5 when body is enlisted since 10, but not excluded", () => {
      expect(allowance.getCounterTerroristAllowanceData('16544', 5)).toEqual([
        { size: 100, startDate: 5, endDate: 9 },
        { size: 200, startDate: 10, endDate: 2958465 }
      ]);
    });
    test("Getting allowance data when applying duties since 20 when body is enlisted since 10 and excluded since 30", () => {
      allowance.specialForcesAndOGVS.exclude('16544', 30);
      expect(allowance.getCounterTerroristAllowanceData('16544', 20)).toEqual([
        { size: 200, startDate: 20, endDate: 30 },
        { size: 100, startDate: 31, endDate: 2958465 }
      ]);
    });
    test("Getting allowance data when applying duties since 5 when body is enlisted since 10 and excluded since 30", () => {
      expect(allowance.getCounterTerroristAllowanceData('16544', 5)).toEqual([
        { size: 100, startDate: 5, endDate: 9 },
        { size: 200, startDate: 10, endDate: 30 },
        { size: 100, startDate: 31, endDate: 2958465 }
      ]);
    });
  });
  describe("Getting crew allowance data", () => {
    const allowance = new Allowance({ technicAssignment: new TechAssignment() });
    test("Initializing technicAssignment collection", () => {
      expect(allowance.technicAssignment.collection).toEqual([]);
    });
    test("Initializing technicAssignment collection", () => {
      expect(allowance.technicAssignment.collection).toEqual([]);
    });
  });
});
