
exports.toDateString = function toDateString(number) {
  const d = new Date('1900-01-01T00:00:00');
  d.setDate(d.getDate() + number - 2);
  return [
    (d.getDate() < 10 ? '0': '') + d.getDate(),
    (d.getMonth() < 9 ? '0': '') + (d.getMonth() + 1),
    d.getFullYear()
  ].join('.');
}
exports.toNumber = function toNumber(dateString) {
  if (!dateString.match(/\d\d\.\d\d\.\d\d\d\d/)) return;
  const [day, month, year] = dateString.split('.').map(n => parseInt(n));
  const beforeCurrentYearDays = (year - 1900) * 365;
  const leapYears = Math.floor(((year - 1900) / 4));
  const currentYearDays = ((year % 4) === 0 && month < 3 ? 0 : 1)  + day +
    [31,28,31,30,31,30,31,31,30,31,30,31].reduce((a, d, i) => i < month - 1 ? a + d : a, 0);
  return beforeCurrentYearDays + leapYears + currentYearDays;
}
exports.today = function today() {
  const d = new Date();
  return [
    (d.getDate() < 10 ? '0': '') + d.getDate(),
    (d.getMonth() < 9 ? '0': '') + (d.getMonth() + 1),
    d.getFullYear()
  ].join('.');
}
