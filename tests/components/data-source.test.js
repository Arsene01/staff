const DataSource = require("../../components/data-source.js");
const p = require("path");
const projectPath = p.join(__dirname, "../../");

describe("DataSource class testing...", () => {
  const path = p.join(projectPath, "tdata", "firstnames.txt");
  const closedEnterpriseNames = new DataSource(path);
  test("state getter method testing when path file exists...", () => {
    const state = closedEnterpriseNames.state;
    expect(state[0]).toEqual({ value: "Абдукерим", id: 1 });
  });
  test("getState method testing when path file does not exist...", () => {
    const path1 = p.join(projectPath, "tdata", "savingData.txt");
    const ds = new DataSource(path1);
    const state = ds.state;
    expect(state).toEqual([]);
  });
  test("add method testing (method adds only objects, not primitive values)...", () => {
    const path1 = p.join(projectPath, "tdata", "savingData.txt");
    const ds = new DataSource(path1);
    const state = ds.state;
    ds.add("primitive value");
    ds.add({ type: "object", value: "primitive value" });
    expect(state).toEqual([{ type: "object", value: "primitive value" }]);
  });
  test("find method testing...", () => {
    const path1 = p.join(projectPath, "tdata", "savingData.txt");
    const ds = new DataSource(path1);
    ds.add({ type: "object", value: "primitive value" });
    expect(ds.find({ type: "object" })).toEqual({
      type: "object",
      value: "primitive value",
    });
  });
  test("find method testing...", () => {
    const path1 = p.join(projectPath, "tdata", "savingData.txt");
    const ds = new DataSource(path1);
    ds.add({ type: "object", value: "primitive value" });
    expect(ds.find({ type: "primitive" })).toEqual(undefined);
  });
  test("findIndex method testing...", () => {
    const path1 = p.join(projectPath, "tdata", "savingData.txt");
    const ds = new DataSource(path1);
    ds.add({ type: "object", value: "primitive value" });
    expect(ds.findIndex({ type: "primitive" })).toEqual(-1);
  });
  test("findIndex method testing...", () => {
    const path1 = p.join(projectPath, "tdata", "savingData.txt");
    const ds = new DataSource(path1);
    ds.add({ type: "object", value: "primitive value" });
    expect(ds.findIndex({ type: "object" })).toEqual(0);
  });

  describe("testing fixRanges method...", () => {
    const path1 = p.join(projectPath, "tdata", "savingData.txt");
    test("when new object added range.end is limited", () => {
      const ds = new DataSource(path1);
      const o1 = {
        relevant: { personId: 1 },
        data: { type: "object", value: "primitive value" },
        range: { start: 1, end: 2958525 },
      };
      const o2 = {
        relevant: { personId: 1 },
        data: { type: "object", value: "primitive value" },
        range: { start: 5, end: 2958525 },
      };
      const target = {
        relevant: { personId: 1 },
        data: { type: "object", value: "primitive value" },
        range: { start: 20, end: 2958525 },
      };

      ds.add(o1);
      ds.add(o2);
      ds.fixRanges(target);

      expect(ds.state).toEqual([
        {
          relevant: { personId: 1 },
          data: { type: "object", value: "primitive value" },
          range: { start: 1, end: 4 },
        },
        {
          relevant: { personId: 1 },
          data: { type: "object", value: "primitive value" },
          range: { start: 5, end: 19 },
        },
      ]);
    });
    test("when record's range start and end is within adding object's same properties", () => {
      const ds = new DataSource(path1);
      const o1 = {
        relevant: { personId: 1 },
        data: { type: "object", value: "primitive value" },
        range: { start: 20, end: 2958525 },
      };
      const target = {
        relevant: { personId: 1 },
        data: { type: "object", value: "primitive value" },
        range: { start: 10, end: 2958525 },
      };

      ds.add(o1);
      ds.fixRanges(target);

      expect(ds.state).toEqual([
        {
          relevant: {},
          data: { type: "object", value: "primitive value" },
          range: { start: 20, end: 2958525 },
        },
      ]);
    });
    test("when record's start and end more than adding object's start and end respectively", () => {
      const ds = new DataSource(path1);
      const o1 = {
        relevant: { personId: 1 },
        data: { type: "object", value: "primitive value" },
        range: { start: 20, end: 2958525 },
      };
      const target = {
        relevant: { personId: 1 },
        data: { type: "object", value: "primitive value" },
        range: { start: 10, end: 30 },
      };

      ds.add(o1);
      ds.fixRanges(target);

      expect(ds.state).toEqual([
        {
          relevant: { personId: 1 },
          data: { type: "object", value: "primitive value" },
          range: { start: 31, end: 2958525 },
        },
      ]);
    });
  });

  describe("testing delete method...", () => {
    const ds = new DataSource(p.join(projectPath, "tdata", "savingData.txt"));
    const o = { type: "object", value: "primitive value" };
    test("when state is after initializing", () => {
      expect(ds.state).toEqual([]);
    });
    test("when state is after adding three elements", () => {
      ds.add({ ...o });
      ds.add({ ...o });
      ds.add({ ...o });

      expect(ds.state).toEqual([{ ...o }, { ...o }, { ...o }]);
    });
    test("when state is after deleting first element", () => {
      ds.delete(0);

      expect(ds.state).toEqual([{ ...o }, { ...o }]);
    });
    test("when state is after deleting one element else", () => {
      ds.delete(1);

      expect(ds.state).toEqual([{ ...o }]);
    });
    test("when state is after deleting one element else", () => {
      ds.delete(0);

      expect(ds.state).toEqual([]);
    });
  });

  describe("testing clear method...", () => {
    const ds = new DataSource(p.join(projectPath, "tdata", "savingData.txt"));
    const o = { type: "object", value: "primitive value" };
    test("when state is after initializing", () => {
      expect(ds.state).toEqual([]);
    });
    test("when state is after adding three elements", () => {
      ds.add({ ...o });
      ds.add({ ...o });
      ds.add({ ...o });

      expect(ds.state).toEqual([{ ...o }, { ...o }, { ...o }]);
    });
    test("when state is after deleting first element", () => {
      ds.clear();

      expect(ds.state).toEqual([]);
    });
  });
});
