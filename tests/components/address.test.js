const Address = require('../../components/address.js');
const Dispatcher = require('../../dispatcher.js');

describe("Address class testing...", () => {
  const dispatcher = new Dispatcher();
  test("getAddress method testing", () => {
    const result = Address.getAddress(
      dispatcher,
      { regionId: 4, rest: 'г. Майкоп, ул. Юннатов, д. 2, кв. 64' }
    );
    expect(result).toEqual('Республика Адыгея, г. Майкоп, ул. Юннатов, д. 2, кв. 64');
  });
  test("getAddress method testing", () => {
    const result = Address.getAddress(
      dispatcher,
      { regionId: 1, rest: 'ул. Садовая, д. 3' }
    );
    expect(result).toEqual('Москва, ул. Садовая, д. 3');
  });
});
