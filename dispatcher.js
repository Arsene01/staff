const DataSource = require('./components/data-source.js');
const { toNumber, toDateString } = require('./components/date-transform.js');

module.exports = class Dispatcher {
  constructor() {
    this.dataSources = [];
    this.initialize();
  }
  initialize() {
    [
      'entities',
      'lastnames',
      'firstnames',
      'middlenames',
      'persons',
      'person-data',
      'registrations',
      'lastname-endings',
      'firstname-endings',
      'middlename-endings',
      'address-data',
      'regions',
      'areas',
      'cities',
      'localities',
      'streets'
    ].map(dataSourceName => this.createDataSource(dataSourceName));
  }
  getDataSource(name) {
    const source = this.dataSources.find(source => source.name === name);
    return source ? source : null;
  }
  stateOf(name) {
    const ds = this.getDataSource(name);
    return ds ? ds.source.state : null;
  }
  createDataSource(name) {
    const source = this.getDataSource(name);
    if (source) return source;
    this.dataSources.push({ name, source: new DataSource(`${__dirname}\\tdata\\${name}.txt`) });
    return this.dataSources[this.dataSources.length - 1];
  }
  add(record, dataSourceName) {
    if(!this.getDataSource(dataSourceName)) return;
    this.getDataSource(dataSourceName).source.add(record);
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
  limitPeriods(state, entityId, startDate, endDate) {
    state
      .filter(record => record.entityId === entityId)
      .filter(record => !record.status)
      .map(record => {
        if (record.endDate < startDate) return;
        if (record.startDate >= startDate) record.status = 'inactive';
        else record.endDate = startDate - 1;
        return record;
      });
  }
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
  }
  createEntity() {
    const state = this.getDataSource('entities').source.getState();
    state.push(state.length);
    return state[state.length - 1];
  }


  getRegistration(registrationId) {
    return this.getDataSource('registrations').source.getState()[registrationId];
  }
  getRegistrationId(registration) {
    return this.getIndexInSource(registration, 'registrations');
  }
  enlistMilitary(entityId, typeId, startDate, endDate) {
    //typeId: 0 - conscript, 1 - contract
    const militaryPersons = this.getDataSource('military-persons').source.getState();
    this.limitPeriods(militaryPersons, entityId, startDate, endDate);
    militaryPersons.push({entityId, typeId, startDate, endDate})
  }
  registerEntityAdress(entityId, registrationId, startDate, endDate) {
    const state = this.getDataSource(stateName).source.getState();
    this.limitPeriods(state, entityId, startDate, endDate);
    state.push({entityId, registrationId, startDate, endDate});
  }
}
