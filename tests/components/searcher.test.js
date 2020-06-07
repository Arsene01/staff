const Searcher = require("../../components/searcher.js");
const dataset = ["Абакаров", "Абасов", "Абасова"];

const searcher = Searcher.createSearcher(dataset);

describe("Searcher class testing...\n", () => {
  test("Searcher initialisation testing", () => {
    expect(searcher.source).toEqual(["Абакаров", "Абасов", "Абасова"]);
  });
  test("Source property change testing when new element has been added", () => {
    searcher.add("Аветиков");
    expect(searcher.source).toEqual([
      "Абакаров",
      "Абасов",
      "Абасова",
      "Аветиков",
    ]);
  });

  describe("Check collection property that element 0 refers to write object", () => {
    test("testing before last parent element data property", () => {
      expect(searcher.collection[0].parent.parent.getData()).toEqual("р");
    });
    test("testing before last element data property", () => {
      expect(searcher.collection[0].parent.getData()).toEqual("о");
    });
    test("testing data property", () => {
      expect(searcher.collection[0].getData()).toEqual("в");
    });
    test("testing index property", () => {
      expect(searcher.collection[0].index).toEqual(0);
    });
    test("testing children property", () => {
      expect(searcher.collection[0].children).toEqual([]);
    });
    test("testing find method", () => {
      expect(searcher.find("Абакаров")).toEqual(0);
    });
    test("testing find method", () => {
      expect(searcher.find("Абасов")).toEqual(1);
    });
    test("testing getDataById method", () => {
      expect(searcher.getDataById(1)).toEqual("Абасов");
    });
    test("testing getDataById method", () => {
      expect(searcher.getDataById(3)).toEqual("Аветиков");
    });
    test("testing getDataByIdFromSource method", () => {
      expect(searcher.getDataByIdFromSource(1)).toEqual("Абасов");
    });
    test("testing getDataByIdFromSource method", () => {
      expect(searcher.getDataByIdFromSource(3)).toEqual("Аветиков");
    });
  });
});
