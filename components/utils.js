exports.isWithin = function isWithin(record, date) {
  return record.range.start <= date && date <= record.range.end;
};
