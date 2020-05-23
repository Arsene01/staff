const Address = require('../../components/address.js');
const Dispatcher = require('../../dispatcher.js');

describe("Address class testing...", () => {
  describe("registerAddress method testing...", () => {
    test("when not valid registration object adds", () => {
      const address = new Address({}, new Dispatcher());
      const result = address.registerAddress(
        {
          region: null,
          city: 'Майкоп',
          street: 'Юннатов',
          house: 2,
          apartment: 64
        }
      );
      expect(result).toEqual(null);
    });
    test("when valid registration object adds", () => {
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
    test("when valid registration object adds once more", () => {
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
  });

  describe("streetId method testing...", () => {
    test("when input is 'Юннатов'", () => {
      expect(new Address({}, new Dispatcher()).streetId('Юннатов')).toEqual(152721);
    });
    test("when input is 'нет такой улицы'", () => {
      expect(new Address({}, new Dispatcher()).streetId('нет такой улицы')).toEqual(null);
    });
  });


  describe("address getter testing", () => {
    test("when situation is 1", () => {
      const address = new Address({
        regionId: 4,
        cityId: 218,
        streetId: 152721,
        house: 2,
        building: 'е',
        apartment: 64
      }, new Dispatcher());
      const result = address.address;
      expect(result).toEqual('Республика Адыгея, Майкоп, Юннатов, д. 2, корп. е, кв. 64');
    });
    test("when situation is 1", () => {
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
});
