const fs = require('fs');

module.exports = class DataSource {
  constructor(path) {
    this.path = path;
    this.initializeState();
  }
  initializeState() {
    if (fs.existsSync(this.path)) this._state = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    this._state = this._state ? this._state : [];
  }
  get state() { return this._state; }
  clear() { this._state = null; this._state = []; }
  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.state), 'utf8');
  }
  add(record, isSwallow = true) {
    if (typeof record !== 'object') return;
    if (isSwallow) this.fixRanges(record);
    this.state.push(record);
  }
  filter(config) {
    return this.state.filter(record => {
      return deepEqual(record, config);
    });

  }
  find(config) {
    return this.state.find(record => {
      return deepEqual(record, config);
    });
  }
  findIndex(config) {
    return this.state.findIndex(record => {
      return deepEqual(record, config);
    });
  }
  fixRanges(record) {
    if (!record.relevant) return;
    const entries = this.state.filter((element) => deepEqual(element.relevant, record.relevant));
    if (!entries.length) return;
    for (const e of entries) {
      if (e.range.start >= record.range.start) {
        if (e.range.end <= record.range.end) e.relevant = {};
        else if (e.range.start <= record.range.end) e.range.start = record.range.end + 1;
      }
      else if (e.range.end >= record.range.start) e.range.end = record.range.start - 1;
    }
  }
}

function deepEqual(element1, element2) {
  for (const property in element2) {
    if (
      typeof element1[property] === 'object' &&
      typeof element2[property] === 'object' &&
      deepEqual(element1[property], element2[property])
    ) continue;
    if (element1[property] !== element2[property]) return false;
  }
  return true;
}
