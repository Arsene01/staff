const DataSource = require("./components/data-source.js");
const { toNumber, toDateString } = require("./components/date-transform.js");

module.exports = class Dispatcher {
  constructor() {
    this.dataSources = [];
    this.initialize();
  }
  initialize() {
    [
      "address-data",
      "areas",
      "cities",
      "department-names",
      "department-service-types",
      "departments",
      "entities",
      "firstname-endings",
      "firstnames",
      "institutions",
      "institution-data",
      "institution-names",
      "institution-types",
      "lastname-endings",
      "lastnames",
      "localities",
      "middlename-endings",
      "middlenames",
      "personal-numbers",
      "person-data",
      "person-ranges",
      "persons",
      "position-data",
      "position-names",
      "position-salaries",
      "position-service",
      "positions",
      "ranges",
      "range-salaries",
      "registrations",
      "regions",
      "service",
      "streets",
      "vus-numbers",
    ].map((dataSourceName) => this.createDataSource(dataSourceName));
  }
  getDataSource(name) {
    const source = this.dataSources.find((source) => source.name === name);
    return source ? source : null;
  }
  stateOf(name) {
    const ds = this.getDataSource(name);
    return ds ? ds.source.state : null;
  }
  createDataSource(name) {
    const source = this.getDataSource(name);
    if (source) return source;
    this.dataSources.push({
      name,
      source: new DataSource(`${__dirname}\\tdata\\${name}.txt`),
    });
    return this.dataSources[this.dataSources.length - 1];
  }
  add(record, dataSourceName, isSwallow) {
    if (!this.getDataSource(dataSourceName)) return;
    this.getDataSource(dataSourceName).source.add(record, isSwallow);
  }
  filterInSource(config, dataSourceName) {
    return this.getDataSource(dataSourceName).source.filter(config);
  }
  findInSource(config, dataSourceName) {
    return this.getDataSource(dataSourceName).source.find(config);
  }
  findIndexInSource(config, dataSourceName) {
    return this.getDataSource(dataSourceName).source.findIndex(config);
  }

  //it is possible below methods not required for this module
  /*
  getMessage(message) {
    if (message.indexOf('quit') >=0) process.exit(1);
    if (message.indexOf('create entity') >= 0) return `Entity #${this.createEntity()} has been created!\n`;
    if (message.indexOf('save') >= 0) {
      this.dataSources.map(ds => ds.source.save());
      return `All data sources has been saved!\n`;
    }
    if (message.indexOf('create person') >= 0) {
      const [id, lastnameId, firstnameId, middlenameId, birthdate] = message
        .split(' ')[2]
        .split(',');
      this.createPerson(parseInt(id), lastnameId, firstnameId, middlenameId, birthdate);
      return `Person has been created!\n`;
    }
    if (message.indexOf('get registration') >= 0) {
      const data = message.split(' ')[2].split('_').join(' ');
      return `Your registration adress ${data} regestered by #${this.getRegistrationId(data)}!\n`;
    }
    if (message.indexOf('register entity adress') >= 0) {
      const [entityId, registrationId, startDate, endDate] = message.split(' ')[3].split(',');
      const person = this.findPerson(entityId);
      const personName = `${this.getPersonFullName(person)}, ${toDateString(person.birthdate)} г.р.,`;
      this.registerEntityAdress(entityId, registrationId, toNumber(startDate), endDate ? toNumber(endDate) : toNumber('31.12.9999'));
      return `${personName} registered on adress ${this.getRegistration(registrationId)}\n`;
    }
    return 'No eligable commands selected. Print your command:\n';
  }*/
};
