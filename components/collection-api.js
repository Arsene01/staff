module.exports = class Collections {
  constructor() {
    this.collection = [];
  }
  find(property, value) {
    const records = this.collection.filter(record => record[property] === value);
    return records.length ? records : null;
  }
  findIndex(property, value) {
    for (let i = 0, length = this.collection.length; i < length; i++) {
      if (this.collection[i][property] === value) return i;
    }
  }
  delete(index) {
    const length = this.collection.length;
    if (index < 0 || index >= length) return;
    if (index === 0) { this.collection.shift(); return; }
    if (index === length - 1) { this.collection.pop(); return; }
    this.collection = [
      ...this.collection.slice(0, index),
      ...this.collection.slice(index + 1)
    ];
  }
}
