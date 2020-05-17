const Address = require('../../components/address.js');
const Dispatcher = require('../../dispatcher.js');

describe("Address class testing...", () => {
  test("registerAddress method testing", () => {
    const address = new Address({}, new Dispatcher());
    const result = address.registerAddress(
      {
        region: 'Республика Адыгея',
        city: 'Майкоп',
        street: 'Юннатов',
        house: 2,
        apartment: 64
      }
    );
    expect(result).toEqual({
      regionId: 4,
      cityId: 218,
      streetId: 152721,
      house: 2,
      apartment: 64
    });
  });
  test("registerAddress method testing", () => {
    const address = new Address({}, new Dispatcher());
    const result = address.registerAddress(
      {
        region: 'Чеченская Республика',
        area: 'Наурский район',
        locality: 'Калиновская',
        street: 'Маяковского',
        house: 9
      }
    );
    expect(result).toEqual({
      regionId: 24,
      areaId: 391,
      localityId: 8519,
      streetId: 83889,
      house: 9
    });
  });
  test("address getter testing", () => {
    const address = new Address({
      regionId: 4,
      cityId: 218,
      streetId: 152721,
      house: 2,
      apartment: 64
    }, new Dispatcher());
    const result = address.address;
    expect(result).toEqual('Республика Адыгея, Майкоп, Юннатов, д. 2, кв. 64');
  });
  test("address getter testing", () => {
    const address = new Address({
      regionId: 24,
      areaId: 391,
      localityId: 8519,
      streetId: 83889,
      house: 9
    }, new Dispatcher());
    const result = address.address;
    expect(result).toEqual(
      'Чеченская Республика, Наурский район, Калиновская, Маяковского, д. 9'
    );
  });
});
