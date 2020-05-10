const CollectionApi = require('./../../components/collection-api.js');

class DerivedClass extends CollectionApi {
  constructor() {
    super();
  }
}

const derived = new DerivedClass();
describe("CollectionApi class testing...\n", () => {
  test("Initializing test", () => {
    expect(derived.collection).toEqual([]);
  })
});
