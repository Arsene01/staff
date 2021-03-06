const Institution = require("./../../components/institution.js");
const Person = require("./../../components/person.js");
const Address = require("../../components/address.js");
const Dispatcher = require("../../dispatcher.js");
const { toNumber, today } = require("../../components/date-transform.js");

const D = new Dispatcher();
const i = new Institution(D);
const a = new Address(D);
describe("Institution class testing...", () => {
  describe("Institution.clear()", () => {
    test("always sets i.institution to {}", () => {
      i.clear();
      expect(i.institution).toEqual({});
    });
  });
  describe("Institution.setName()", () => {
    test("when input has no 'nominative' property", () => {
      const name = {
        accusative:
          "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        dative:
          "Управлению финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        genitive:
          "Управления финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
      };
      i.setName(name);
      expect(i.institution).toEqual({});
    });
    test("when input has no 'accusative' property", () => {
      const name = {
        nominative:
          "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        dative:
          "Управлению финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        genitive:
          "Управления финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
      };
      i.setName(name);
      expect(i.institution).toEqual({});
    });
    test("when input has no 'dative' property", () => {
      const name = {
        nominative:
          "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        accusative:
          "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        genitive:
          "Управления финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
      };
      i.setName(name);
      expect(i.institution).toEqual({});
    });
    test("when input has no 'genitive' property", () => {
      const name = {
        nominative:
          "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        accusative:
          "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        dative:
          "Управлению финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
      };
      i.setName(name);
      expect(i.institution).toEqual({});
    });
    test("when input has all required properties", () => {
      const name = {
        nominative:
          "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        accusative:
          "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        dative:
          "Управлению финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
        genitive:
          "Управления финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
      };
      i.setName(name);
      expect(i.institution.name).toEqual({ ...name });
    });
  });
  describe("Institution.setType()", () => {
    test("when input has no 'nominative' property", () => {
      const type = {
        accusative: "Федеральное казенное учреждение",
        dative: "Федеральному казенному учреждению",
        genitive: "Федерального казенного учреждения",
      };
      i.setType(type);
      expect(i.institution.type).toEqual(undefined);
    });
    test("when input has no 'accusative' property", () => {
      const type = {
        nominative: "Федеральное казенное учреждение",
        dative: "Федеральному казенному учреждению",
        genitive: "Федерального казенного учреждения",
      };
      i.setType(type);
      expect(i.institution.type).toEqual(undefined);
    });
    test("when input has no 'dative' property", () => {
      const type = {
        nominative: "Федеральное казенное учреждение",
        accusative: "Федеральное казенное учреждение",
        genitive: "Федерального казенного учреждения",
      };
      i.setType(type);
      expect(i.institution.type).toEqual(undefined);
    });
    test("when input has no 'genitive' property", () => {
      const type = {
        nominative: "Федеральное казенное учреждение",
        accusative: "Федеральное казенное учреждение",
        dative: "Федеральному казенному учреждению",
      };
      i.setType(type);
      expect(i.institution.type).toEqual(undefined);
    });
    test("when input has all required properties", () => {
      const type = {
        nominative: "Федеральное казенное учреждение",
        accusative: "Федеральное казенное учреждение",
        dative: "Федеральному казенному учреждению",
        genitive: "Федерального казенного учреждения",
      };
      i.setType(type);
      expect(i.institution.type).toEqual({ ...type });
    });
  });
  describe("Institution.createInstitutionData()", () => {
    test("when institution property built", () => {
      i.createInstitutionData(toNumber("26.12.2016"));
      expect(i.dispatcher.stateOf("institution-data")).toEqual([
        {
          relevant: { institutionId: 1 },
          data: { nameId: 1, typeId: 1 },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
    test("after institution data creation institution property must be clear", () => {
      expect(i.institution).toEqual({});
    });
    test("create another institution", () => {
      i.setName({
        nominative: "16544",
        accusative: "16544",
        dative: "16544",
        genitive: "16544",
      });
      i.setType({
        nominative: "войсковая часть",
        accusative: "войсковую часть",
        dative: "войсковой части",
        genitive: "войсковой части",
      });
      i.createInstitutionData(toNumber("26.12.2016"));

      expect(i.dispatcher.stateOf("institution-data")).toEqual([
        {
          relevant: { institutionId: 1 },
          data: { nameId: 1, typeId: 1 },
          range: { start: 42730, end: 2958525 },
        },
        {
          relevant: { institutionId: 2 },
          data: { nameId: 2, typeId: 2 },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
  });
  describe("Institution.setAddressTo", () => {
    test("check initializing", () => {
      expect(D.stateOf("address-data")).toEqual([]);
    });
    test("when adding new address", () => {
      const address = a.registerAddress({
        zipcode: 362006,
        region: "Республика Северная Осетия-Алания",
        city: "Владикавказ",
        street: "Коста",
        house: "32/34",
      });
      i.setAddressTo(1, address, toNumber("26.12.2016"));
      expect(D.stateOf("address-data")).toEqual([
        {
          relevant: { institutionId: 1 },
          data: {
            zipcode: 362006,
            regionId: 19,
            cityId: 1939,
            streetId: 71355,
            house: "32/34",
          },
          range: { start: 42730, end: 2958525 },
        },
      ]);
    });
  });
  describe("getName", () => {
    const name = {
      nominative:
        "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
      accusative:
        "Управление финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
      dative:
        "Управлению финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
      genitive:
        "Управления финансового обеспечения Министерства обороны Российской Федерации по Республике Северная Осетия-Алания",
    };
    test("in nominative", () => {
      expect(i.getName(1, toNumber("26.12.2016"))).toEqual(name.nominative);
    });
    test("in nominative", () => {
      expect(i.getName(1, toNumber("26.12.2016"), "nominative")).toEqual(
        name.nominative
      );
    });
    test("in accusative", () => {
      expect(i.getName(1, toNumber("26.12.2016"), "accusative")).toEqual(
        name.accusative
      );
    });
    test("in dative", () => {
      expect(i.getName(1, toNumber("26.12.2016"), "dative")).toEqual(
        name.dative
      );
    });
    test("in genitive", () => {
      expect(i.getName(1, toNumber("26.12.2016"), "genitive")).toEqual(
        name.genitive
      );
    });
  });
  describe("getType", () => {
    const type = {
      nominative: "Федеральное казенное учреждение",
      accusative: "Федеральное казенное учреждение",
      dative: "Федеральному казенному учреждению",
      genitive: "Федерального казенного учреждения",
    };
    test("in nominative", () => {
      expect(i.getType(1, toNumber("26.12.2016"))).toEqual(type.nominative);
    });
    test("in nominative", () => {
      expect(i.getType(1, toNumber("26.12.2016"), "nominative")).toEqual(
        type.nominative
      );
    });
    test("in accusative", () => {
      expect(i.getType(1, toNumber("26.12.2016"), "accusative")).toEqual(
        type.accusative
      );
    });
    test("in dative", () => {
      expect(i.getType(1, toNumber("26.12.2016"), "dative")).toEqual(
        type.dative
      );
    });
    test("in genitive", () => {
      expect(i.getType(1, toNumber("26.12.2016"), "genitive")).toEqual(
        type.genitive
      );
    });
  });
  describe("getAddress", () => {
    test("when institution is found", () => {
      expect(i.getAddress(1, toNumber("26.12.2016"))).toEqual(
        "362006, Республика Северная Осетия-Алания, Владикавказ, Коста, д. 32/34"
      );
    });
    test("when institution is not found", () => {
      expect(i.getAddress(3, toNumber("26.12.2016"))).toEqual("");
    });
  });
});
