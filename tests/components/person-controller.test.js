const PersonController = require('../../components/person-controller.js');
const Endings = require('../../components/case-endings.js');

const lastnames = [ 'Войналович', 'Кобелев', 'Осипенко' ],
      firstnames = [ 'Жанна', 'Арсен', 'Владислав' ],
      middlenames = [ 'Владимировна', 'Владимирович', 'Сергеевич' ],
      pdc = PersonController.createPersonDataController(lastnames, firstnames, middlenames),
      zhanna = PersonController.createPerson(0, 0, 0, 30000),
      arsene = PersonController.createPerson(1, 1, 1, 33188),
      vlad = PersonController.createPerson(2, 2, 2, 40000);

const lastnameEndings = [
        { nominative: 'вич', dative: 'вич', genitive: 'вич' },
        { nominative: 'лев', dative: 'леву', genitive: 'лева' },
        { nominative: 'нко', dative: 'нко', genitive: 'нко' }
      ],
      firstnameEndings = [
        { nominative: 'нна', dative: 'нне', genitive: 'нны' },
        { nominative: 'сен', dative: 'сену', genitive: 'сена' },
        { nominative: 'лав', dative: 'лаву', genitive: 'лава' },
      ],
      middlenameEndings = [
        { nominative: 'вна', dative: 'вне', genitive: 'вны' },
        { nominative: 'вич', dative: 'вичу', genitive: 'вича' }
      ],
      endings = Endings.createEndings(lastnameEndings, firstnameEndings, middlenameEndings),
      pc = PersonController.createPersonController(pdc, endings);

describe("\n\nPersonController module testing...\n", () => {
  test("Testing getLastname method", () => {
    expect(pc.getLastname(zhanna)).toEqual('Войналович');
  });
  test("Testing getLastname method", () => {
    expect(pc.getLastname(arsene)).toEqual('Кобелев');
  });
  test("Testing getLastname method", () => {
    expect(pc.getLastname(zhanna, 'dative')).toEqual('Войналович');
  });
  test("Testing getLastname method", () => {
    expect(pc.getLastname(arsene, 'dative')).toEqual('Кобелеву');
  });

  test("Testing getFirstname method", () => {
    expect(pc.getFirstname(zhanna)).toEqual('Жанна');
  });
  test("Testing getFirstname method", () => {
    expect(pc.getFirstname(arsene)).toEqual('Арсен');
  });
  test("Testing getFirstname method", () => {
    expect(pc.getFirstname(zhanna, 'genitive')).toEqual('Жанны');
  });
  test("Testing getFirstname method", () => {
    expect(pc.getFirstname(arsene, 'genitive')).toEqual('Арсена');
  });

  test("Testing getMiddlename method", () => {
    expect(pc.getMiddlename(zhanna)).toEqual('Владимировна');
  });
  test("Testing getMiddlename method", () => {
    expect(pc.getMiddlename(arsene)).toEqual('Владимирович');
  });
  test("Testing getMiddlename method", () => {
    expect(pc.getMiddlename(zhanna, 'genitive')).toEqual('Владимировны');
  });
  test("Testing getMiddlename method", () => {
    expect(pc.getMiddlename(arsene, 'genitive')).toEqual('Владимировича');
  });

  test("Testing getFullName method", () => {
    expect(pc.getFullName(zhanna)).toEqual('Войналович Жанна Владимировна');
  });
  test("Testing getFullName method", () => {
    expect(pc.getFullName(arsene)).toEqual('Кобелев Арсен Владимирович');
  });
  test("Testing getFullName method", () => {
    expect(pc.getFullName(zhanna, 'genitive')).toEqual('Войналович Жанны Владимировны');
  });
  test("Testing getFullName method", () => {
    expect(pc.getFullName(arsene, 'genitive')).toEqual('Кобелева Арсена Владимировича');
  });

  test("Testing getBirthdate method", () => {
    expect(pc.getBirthdate(zhanna)).toEqual('18.02.1982');
  });
  test("Testing getLastname method", () => {
    expect(pc.getBirthdate(arsene)).toEqual('11.11.1990');
  });

  test("Testing findLastname method", () => {
    expect(pc.findLastname('Войналович')).toEqual(0);
  });
  test("Testing findLastname method", () => {
    expect(pc.findLastname('Кобелев')).toEqual(1);
  });
  test("Testing findLastname method", () => {
    expect(pc.findLastname('Попов')).toEqual(null);
  });

  test("Testing findFirstname method", () => {
    expect(pc.findFirstname('Жанна')).toEqual(0);
  });
  test("Testing findFirstname method", () => {
    expect(pc.findFirstname('Арсен')).toEqual(1);
  });
  test("Testing findFirstname method", () => {
    expect(pc.findFirstname('Вячеслав')).toEqual(null);
  });

  test("Testing findMiddlename method", () => {
    expect(pc.findMiddlename('Владимировна')).toEqual(0);
  });
  test("Testing findMiddlename method", () => {
    expect(pc.findMiddlename('Владимирович')).toEqual(1);
  });
  test("Testing findMiddlename method", () => {
    expect(pc.findMiddlename('Андреевич')).toEqual(null);
  });
});
