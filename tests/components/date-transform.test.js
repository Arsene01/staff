const { toNumber, toDateString} = require('./../../components/date-transform.js');

describe("toNumber function testing...", () => {
  it("toNumber('11.11.1990') is equal to 33188", () => {
    expect(toNumber('11.11.1990')).toEqual(33188);
  });
  it("toNumber('18.05.1900') is equal to 139", () => {
    expect(toNumber('18.05.1900')).toEqual(139);
  });
  it("toNumber('31.10.2018') is equal to 43404", () => {
    expect(toNumber('31.10.2018')).toEqual(43404);
  });
  it("toNumber('11.12.1990') is equal to 33218", () => {
    expect(toNumber('11.12.1990')).toEqual(33218);
  });
});
describe("toDateString function testing...", () => {
  it("toDateString(33188) is equal to '11.11.1990'", () => {
    expect(toDateString(33188)).toEqual('11.11.1990');
  });
  it("toDateString(139) is equal to '18.05.1900'", () => {
    expect(toDateString(139)).toEqual('18.05.1900');
  });
  it("toDateString(43404) is equal to '31.10.2018'", () => {
    expect(toDateString(43404)).toEqual('31.10.2018');
  });
  it("toDateString(33218) is equal to '11.12.1990'", () => {
    expect(toDateString(33218)).toEqual('11.12.1990');
  });
});
