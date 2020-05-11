const allowance = [
  { sizes: [ 100, 200 ], name: "за контр-террористические операции" },
  { sizes: [ 20 ], name: "за вхождение в состав экипажей боевой (специальной) техники" },
  { sizes: [ 30 ], name: "при замещении должностей (старших) водителей транспорт средств категорий 'C', 'D', 'CE'" },
  { sizes: [ 50 ], name: "при замещении должностей, для которой штатом предусмотрен 1-4 тарифные разряды" },
  { sizes: { min: 1, max: 25}, name: "за добросовествное исполнение служебных обязанностей" },
  { sizes: [ 20 ], name: "за вхождение в состав БТГР" },
  { sizes: [ 10, 20, 25 ], name: "за работу со сведениями, составляющими государственную тайну" },
  { sizes: [ 5, 10, 20, 30 ], name: "за классную квалификацию" },
  { sizes: [15, 30, 70, 100], name: "за физическую подготовленность" },
  { sizes: [ 15, 30 ], name: "за работу в шифровальных органах" },
  { sizes: [ 15, 30 ], name: "за стаж работы в органах защиты государственной тайны"},
  { sizes: [ 10, 15, 20, 25, 30, 40 ], name: "процентную надбавку за выслугу лет" },
  { sizes: [ 50 ], name: "по перечню войсковых частей согласно приказу МО РФ № 55дсп от 20.02.2018 г." },
  { sizes: [ 10, 20, 30 ], name: "за награду МО РФ" }
]

const momentPayments = [
  { sizes: [ 1 ], name: "материальную помощь" },
  { sizes: [ 1 ], name: "подъемное пособие" },
  { sizes: [ 300 ], name: "подъемное пособие за каждый день дороги" },
  { sizes: [ 0.25 ], name: "подъемное пособие на членов семьи" },
  { sizes: { min: 2, max: 60 }, name: "ежемесячная надбавка за выполнение работ, связанных с риском для жизни и здоровья в мирное время" },
  { sizes: { min: 1, max: 20 }, name: "денежная компенсация за дополнительные сутки отдыха" },
  { sizes: [ 2, 3, 7, 8], name: "единовременное пособие при увольнении" },
  { sizes: [ 5 ], name: "единовременная выплата за награждение государственной наградой" }
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

module.exports = class Allowance {
  
}
