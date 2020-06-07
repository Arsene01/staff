const { getCase, changeEnding } = require("../../components/cases.js");

describe("getCase method testing...", () => {
  test("no arguments apllied", () => {
    expect(getCase()).toEqual("nominative");
  });
  test("notValid argument apllied", () => {
    expect(getCase()).toEqual("nominative");
  });
  test("'nominative' argument apllied", () => {
    expect(getCase("nominative")).toEqual("nominative");
  });
  test("'dative' argument apllied", () => {
    expect(getCase("dative")).toEqual("dative");
  });
  test("'accusative' argument apllied", () => {
    expect(getCase("accusative")).toEqual("accusative");
  });
  test("'genitive' argument apllied", () => {
    expect(getCase("genitive")).toEqual("genitive");
  });
});

describe("changeEnding method testing...", () => {
  const cases = [
    { nominative: "сен", dative: "сену", accusative: "сена", genitive: "сена" },
    { nominative: "нна", dative: "нне", accusative: "нну", genitive: "нны" },
    { nominative: "лав", dative: "лаву", accusative: "лава", genitive: "лава" },
    { nominative: "тыр", dative: "тыру", accusative: "тыра", genitive: "тыра" },
    { nominative: "ян", dative: "яну", accusative: "яна", genitive: "яна" },
  ];
  test("'Арсен' argument apllied", () => {
    const element = "Арсен";
    expect(changeEnding(element, cases)).toEqual("Арсен");
  });
  test("'Арсен' argument apllied", () => {
    const element = "Арсен";
    expect(changeEnding(element, cases, "nominative")).toEqual("Арсен");
  });
  test("'Арсен' argument apllied", () => {
    const element = "Арсен";
    expect(changeEnding(element, cases, "dative")).toEqual("Арсену");
  });
  test("'Арсен' argument apllied", () => {
    const element = "Арсен";
    expect(changeEnding(element, cases, "genitive")).toEqual("Арсена");
  });
  test("'Арсен' argument apllied", () => {
    const element = "Арсен";
    expect(changeEnding(element, cases, "accusative")).toEqual("Арсена");
  });
  test("'Ян' argument apllied", () => {
    const element = "Ян";
    expect(changeEnding(element, cases, "accusative")).toEqual("Яна");
  });
  test("'' argument apllied", () => {
    const element = "";
    expect(changeEnding(element, cases)).toEqual(null);
  });
});
