exports.changeEnding = changeEnding;
exports.getCase = getCase;
function changeEnding(element, endingSource, toCase) {
  const { end, length } = getEndingObject(element);
  const match = findMatch(endingSource, end);
  if (!match) return null;
  return element.substring(0, element.length - length) + match[getCase(toCase)];
}

function getCase(newCase) {
  return [
    'nominative', 'dative', 'genitive', 'accusative'
  ].includes(newCase) ? newCase : 'nominative';
}
function getEndingObject(element) {
  if (!element.length) return { end: '', length: 0 };
  const length = element.length > 2 ? 3 : element.length;
  const end = element
    .substring(element.length - length, element.length)
    .toLowerCase();
  return { end, length };
}
function findMatch(endingSource, end) {
  return endingSource.find(endingObject => endingObject.nominative === end);
}
