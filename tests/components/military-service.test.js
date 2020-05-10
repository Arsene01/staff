const MS = require('../../components/military-service.js');

const militaryService = MS.createMilitaryService();

describe("MilitaryService module tesing...\n", () => {
  test("Enlist person", () => {
    militaryService.enlist(0, 2, 2);
    expect(militaryService.services).toEqual([
      { personId: 0, beginDate: 2, enlistingReasonId: 2 }
    ]);
  });
  test("Test isPersonEnlistedOnDate method", () => {
    expect(militaryService.isPersonEnlistedOnDate(0, 1)).toEqual(false);
  });
  test("Test isPersonEnlistedOnDate method", () => {
    expect(militaryService.isPersonEnlistedOnDate(0, 2)).toEqual(true);
  });
  test("Test isPersonEnlistedOnDate method", () => {
    expect(militaryService.isPersonEnlistedOnDate(0, 5)).toEqual(true);
  });
  test("Test exclude method", () => {
    militaryService.exclude(0, 4, 1);
    expect(militaryService.services).toEqual([
      { personId: 0, beginDate: 2, enlistingReasonId: 2, endDate: 4, excludingReasonId: 1 }
    ]);
  });
  test("Test isPersonEnlistedOnDate method", () => {
    expect(militaryService.isPersonEnlistedOnDate(0, 5)).toEqual(false);
  });
  test("Test deleteServiceRecord method", () => {
    militaryService.deleteServiceRecord(0);
    expect(militaryService.services).toEqual([]);
  });
});
