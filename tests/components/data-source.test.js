const DataSource = require('../../components/data-source.js');
const p = require('path');
describe("DataSource class testing...", () => {
  const path = p.join(__dirname, '../../', 'tdata', 'firstnames.txt');;
  const closedEnterpriseNames = new DataSource(path);
  test("state getter method testing when path file exists...", () => {
    const state = closedEnterpriseNames.state;
    expect(state[0]).toEqual({ value:"Абдукерим", id:1});
  });
  test("getState method testing when path file does not exist...", () => {
    const path1 = 'e:\\projects\\staff\\data\\savingData.txt';
    const ds = new DataSource(path1);
    const state = ds.state;
    expect(state).toEqual([]);
  });
  test("add method testing (method adds only objects, not primitive values)...", () => {
    const path1 = 'e:\\projects\\staff\\data\\savingData.txt';
    const ds = new DataSource(path1);
    const state = ds.state;
    ds.add('primitive value');
    ds.add({ type: 'object', value: 'primitive value'});
    expect(state).toEqual([{ type: 'object', value: 'primitive value'}]);
  });
  test("find method testing...", () => {
    const path1 = 'e:\\projects\\staff\\data\\savingData.txt';
    const ds = new DataSource(path1);
    ds.add({ type: 'object', value: 'primitive value'});
    expect(ds.find({type: 'object'})).toEqual({ type: 'object', value: 'primitive value'});
  });
  test("find method testing...", () => {
    const path1 = 'e:\\projects\\staff\\data\\savingData.txt';
    const ds = new DataSource(path1);
    ds.add({ type: 'object', value: 'primitive value'});
    expect(ds.find({type: 'primitive'})).toEqual(undefined);
  });
  test("findIndex method testing...", () => {
    const path1 = 'e:\\projects\\staff\\data\\savingData.txt';
    const ds = new DataSource(path1);
    ds.add({ type: 'object', value: 'primitive value'});
    expect(ds.findIndex({type: 'primitive'})).toEqual(-1);
  });
  test("findIndex method testing...", () => {
    const path1 = 'e:\\projects\\staff\\data\\savingData.txt';
    const ds = new DataSource(path1);
    ds.add({ type: 'object', value: 'primitive value'});
    expect(ds.findIndex({type: 'object'})).toEqual(0);
  });
  test("fixRanges method testing...", () => {
    const path1 = 'e:\\projects\\staff\\data\\savingData.txt';
    const ds = new DataSource(path1);

    const o1 = {
      relevant: { personId: 1 },
      data: {type: 'object', value: 'primitive value'},
      range: { start: 1, end: 2958525 }
    };
    const o2 = {
      relevant: { personId: 1 },
      data: {type: 'object', value: 'primitive value'},
      range: { start: 5, end: 2958525 }
    };
    const target = {
      relevant: { personId: 1 },
      data: { type: 'object', value: 'primitive value'},
      range: { start: 20, end: 2958525 }
    };
    ds.fixRanges(o1);
    ds.add(o1);
    ds.fixRanges(o2);
    ds.add(o2);
    ds.fixRanges(target);
    expect(ds.state).toEqual([
      {
        relevant: { personId: 1 },
        data: {type: 'object', value: 'primitive value'},
        range: { start: 1, end: 4 }
      },
      {
        relevant: { personId: 1 },
        data: {type: 'object', value: 'primitive value'},
        range: { start: 5, end: 19 }
      }
    ]);
  });
});
