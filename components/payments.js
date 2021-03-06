const allowance = [
  {
    sizes: [100, 200],
    name:
      "ежемесячную надбавку к денежному довольствию в размере двух месячных окладов в соответствии с занимаемой воинской должностью, предусмотренную постановлением Правительства Российской Федерации от 29.12.2011 г. № 1174",
  },
  {
    sizes: [20],
    name:
      "ежемесячную надбавку за особые условия военной службы в размере 20 % оклада по воинской должности (за прохождение службы на воинской должности, исполнение обязанностей по которой связано с руководством подразделением в соответствии с приказом Министра обороны Российской Федерации от 18.10.2016 г. № 675)",
  },
  {
    sizes: [20],
    name:
      "ежемесячную надбавку за особые условия военной службы в размере 20 % оклада по воинской должности (за прохождение службы в экипажах штатной боевой (специальной) техники на гусеничном и колесном шасси)",
  },
  {
    sizes: [30],
    name:
      "при замещении должностей (старших) водителей транспорт средств категорий 'C', 'D', 'CE'",
  },
  {
    sizes: [50],
    name:
      "при замещении должностей, для которой штатом предусмотрен 1-4 тарифные разряды",
  },
  {
    sizes: { min: 1, max: 25 },
    name:
      "ежемесячную премию за добросовестное и эффективное исполнение должностных обязанностей",
  },
  { sizes: [20], name: "за вхождение в состав БТГР" },
  {
    sizes: [10, 20, 25],
    name: "за работу со сведениями, составляющими государственную тайну",
  },
  { sizes: [5, 10, 20, 30], name: "за классную квалификацию" },
  { sizes: [15, 30, 70, 100], name: "за физическую подготовленность" },
  { sizes: [15, 30], name: "за работу в шифровальных органах" },
  {
    sizes: [15, 30],
    name: "за стаж работы в органах защиты государственной тайны",
  },
  {
    sizes: [10, 15, 20, 25, 30, 40],
    name: "процентную надбавку за выслугу лет",
  },
  {
    sizes: [50],
    name:
      "по перечню войсковых частей согласно приказу МО РФ № 55дсп от 20.02.2018 г.",
  },
  { sizes: [10, 20, 30], name: "за награду МО РФ" },
];

const momentPayments = [
  { sizes: [1], name: "материальную помощь" },
  { sizes: [1], name: "подъемное пособие" },
  { sizes: [300], name: "подъемное пособие за каждый день дороги" },
  { sizes: [0.25], name: "подъемное пособие на членов семьи" },
  {
    sizes: { min: 2, max: 60 },
    name:
      "ежемесячная надбавка за выполнение работ, связанных с риском для жизни и здоровья в мирное время",
  },
  {
    sizes: { min: 1, max: 20 },
    name: "денежная компенсация за дополнительные сутки отдыха",
  },
  { sizes: [2, 3, 7, 8], name: "единовременное пособие при увольнении" },
  {
    sizes: [5],
    name: "единовременная выплата за награждение государственной наградой",
  },
];

//****ФАКТЫ, ВЛИЯЮЩИЕ НА ВЫПЛАТЫ НАДБАВОК****
//
//зачисление в списки лс и исключение из списков лс
//прием и сдача дел и должности
//вхождение войсковой части в состав ОГВс
//приказ о закреплении техники
//срок действия и разрешенные категории водительских удостоверений
//список должностей, включенных в состав БТГр
//приказ о присвоении классной квалифицкации
//приказ МО РФ о награждении военнослужащих наградами МО РФ
//сведения о награждении государственной наградой
//сведения из послужного списка
//рапорт об установлении ежемесячной премии
const { toDateString } = require("./date-transform.js");
const Institution = require("./institution.js");

module.exports = class Payment {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  getSalaryPeriods(property, value, date, dataSource) {
    const result = this.dispatcher
      .filterInSource({ relevant: { [property]: value } }, dataSource)
      .reduce((acc, r) => {
        if (r.range.end < date) return acc;
        const result = { ...r };
        if (result.range.start < date) result.range.start = date;
        return [...acc, result];
      }, []);
    return [...result];
  }
  getRangeSalaryPeriods(range, date) {
    return this.getSalaryPeriods("range", range, date, "range-salaries");
  }
  getPositionSalaryPeriods(tariff, date) {
    return this.getSalaryPeriods("tariff", tariff, date, "position-salaries");
  }
  salaryPeriodToString(period) {
    return [
      "С ",
      toDateString(period.range.start),
      " г. установить оклад по ",
      period.relevant.range ? "воинскому званию" : "",
      period.relevant.tariff ? "воинской должности" : "",
      " в размере ",
      period.data.salary,
      " руб. в месяц",
      period.relevant.tariff
        ? ` (${period.relevant.tariff} тарифный разряд).`
        : ".",
    ].join("");
  }
  get1174AllowanceRights(personId, date) {
    const positionServiceData = this.dispatcher
      .filterInSource({ relevant: { personId } }, "position-service")
      .find((r) => r.range.start <= date && date <= r.range.end);
    if (!positionServiceData) return "No position service data";
    const inst = new Institution(this.dispatcher);
    const address = inst.getAddress(
      inst.getInstitutionIdBy(positionServiceData.relevant.positionId)
    );
    const isEligable = [
      "Чеченская Республика",
      "Республика Дагестан",
      "Карачаево-Черкесская Республика",
      "Кабардино-Балкарская Республика",
      "Республика Ингушения",
      "Республика Северная Осетия-Алания",
    ].some((r) => address.indexOf(r) >= 0);
    return 100;
  }
};
