const DataSource = require('../../components/data-source.js');

describe("DataSource class testing...", () => {
  const path = 'e:\\projects\\staff\\data\\closedEnterpriseNames.txt';
  const closedEnterpriseNames = new DataSource(path);
  test("state getter method testing when path file exists...", () => {
    const state = closedEnterpriseNames.state;
    expect(state[0]).toEqual({ nominative:"Южный военный округ", genitive:"Южного военного округа", dative:"Южному военному округу"});
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
});
