const DataSource = require('./../components/data-source.js');
const Dispatcher = require('./../dispatcher.js');
const projectPath = require('path').join(__dirname, '../');

describe("Dispatcher class testing...", () => {
  const dispatcher = new Dispatcher();
  test("getDataSource method testing ...", () => {
    const name = 'my-source';
    expect(dispatcher.getDataSource(name)).toEqual(null);
  });
  test("createDataSource method testing ...", () => {
    const name = 'my-source';
    expect(dispatcher.createDataSource(name)).toEqual({
      name, source: {
        path: `${projectPath}tdata\\${name}.txt`,
        _state: []
      }
    });
  });
  test("getDataSource method testing after creating data source...", () => {
    const name = 'my-source';
    expect(dispatcher.getDataSource(name)).toEqual({
      name, source: {
        path: `${projectPath}tdata\\${name}.txt`,
        _state: []
      }
    });
  });
  test("stateOf method testing after creating data source...", () => {
    const name = 'my-source';
    expect(dispatcher.stateOf(name)).toEqual([]);
  });
  test("add method testing after creating data source...", () => {
    const name = 'my-source';
    const source = dispatcher.getDataSource(name).source;
    source.add({id: 1, type: 'cool object', value: 'the best object'});
    source.add({id: 3, type: 'awesome', value: 'one awesome thing'})
    expect(source.state).toEqual([
      {id: 1, type: 'cool object', value: 'the best object'},
      {id: 3, type: 'awesome', value: 'one awesome thing'}
    ]);
  });
});
