const Address = require('../../components/address.js');
const Dispatcher = require('../../dispatcher.js');

describe("Address class testing...", () => {
  const address = new Address(new Dispatcher());
  test("registerAddress method testing", () => {
    const result = address.registerAddress(
      {
        region: 'Республика Адыгея',
        city: 'Майкоп',
        street: 'Юннатов',
        house: 2,
        apartment: 64
      }
      { regionId: 4, rest: 'г. Майкоп, ул. Юннатов, д. 2, кв. 64' },
      dispatcher
    );
    expect(result).toEqual({
      regionId: 4,
      cityId: 'Майкоп',
    });
  });
  /*
  test("getAddress method testing", () => {
    const result = Address.getAddress(
      { regionId: 4, rest: 'г. Майкоп, ул. Юннатов, д. 2, кв. 64' },
      dispatcher
    );
    expect(result).toEqual('Республика Адыгея, г. Майкоп, ул. Юннатов, д. 2, кв. 64');
  });

  test("getAddress method testing", () => {
    const result = Address.getAddress(
      { regionId: 1, rest: 'ул. Садовая, д. 3' },
      dispatcher
    );
    expect(result).toEqual('Москва, ул. Садовая, д. 3');
  });
  test("registerAddress method testing", () => {
    const result = Address.registerAddress(
      'Республика Адыгея, г. Майкоп, ул. Юннатов, д. 2, кв. 64',
      dispatcher
    );
    expect(result).toEqual({ regionId: 4, rest: 'г. Майкоп, ул. Юннатов, д. 2, кв. 64' });
  });
  test("registerAddress method testing", () => {
    const result = Address.registerAddress(
      'Москва, ул. Садовая, д. 3',
      dispatcher
    );
    expect(result).toEqual({ regionId: 1, rest: 'ул. Садовая, д. 3' });
  });
  test("registerAddress method testing", () => {
    const result = Address.registerAddress(
      'г. Майкоп, ул. Юннатов, д. 2, кв. 64',
      dispatcher
    );
    expect(result).toEqual(null);
  });*/
});
