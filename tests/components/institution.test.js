const Institution = require('./../../components/person.js');
const Address = require('../../components/address.js');
const Dispatcher = require('./../../dispatcher.js');
const { toNumber, today } = require('../../components/date-transform.js');

describe("Person class testing...", () => {
  const p = new Person(new Dispatcher());

  describe("clear", () => {
    test("always sets p.person to {}", () => {
      p.clear();
      expect(p.person).toEqual({});
    });
  });

});
