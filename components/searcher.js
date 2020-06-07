class Node {
  constructor(data, parent) {
    this.data = data;
    this.parent = parent;
    this.children = [];
  }
  isIndexed() {
    return this.index !== undefined;
  }
  getChildren() {
    return this.children;
  }
  getData() {
    return this.data;
  }
  setIndex(index) {
    this.index = index;
  }
}

class Searcher {
  constructor(source) {
    this.source = [];
    this.root = new Node(null, null);
    this.collection = [];
    source.map((el) => this.add(el));
  }
  add(datastring) {
    const data = datastring.split("");
    let currentNode = this.root;
    while (data.length) {
      const children = currentNode.getChildren();
      const firstElement = data.shift();
      const index = children.findIndex(
        (node) => node.getData() === firstElement
      );
      if (index >= 0) {
        currentNode = children[index];
        continue;
      }
      children.push(new Node(firstElement, currentNode));
      currentNode = children[children.length - 1];
    }
    if (!currentNode.isIndexed()) {
      currentNode.setIndex(this.collection.length);
      this.collection.push(currentNode);
      this.source.push(datastring);
    }
  }
  find(data) {
    const datas = data.split("");
    let currentNode = this.root;
    while (datas.length) {
      const children = currentNode.getChildren();
      const index = children.findIndex((node) => node.getData() === datas[0]);
      if (index < 0) break;
      currentNode = children[index];
      datas.shift();
    }
    if (currentNode.index === undefined) return null;
    return this.getDataById(currentNode.index) === data
      ? currentNode.index
      : null;
  }
  getDataById(id) {
    let currentNode = this.collection[id];
    const datas = [];
    do {
      datas.unshift(currentNode.getData());
      currentNode = currentNode.parent;
    } while (currentNode !== this.root);
    return datas.join("");
  }
  getDataByIdFromSource(id) {
    return this.source[id];
  }
}
const createSearcher = (source) => new Searcher(source);
exports.createSearcher = createSearcher;
