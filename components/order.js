
module.exports = class Order {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  //in design stage
  getAppointmentOrderText({
    personId,
    positionId,
    date,
    personnelOrderData, //date, number, organizationId
    savedTariffCategory, //optional
    freeDate, //optional
  }) {
    if (!freeDate) freeDate = date - 1;
    const main = [
      this.getRangeFullnamePosition(personId, freeDate, "genitive"),
      `, назначенного приказом ${P.directorNameOf(
        organizationId,
        "genitive"
      )} (по личному составу) от ${toDateString(personnelOrderData.date)} № ${
        personnelOrderData.number
      }`,
      ` на воинскую должность ${new Department(
        this.dispatcher
      ).getPositionFullname(positionId, "genitive")}, `,
      ` c {toDateString(freeDate)} г. сдал дела и должность по предыдущей воинской должности, `,
      ` c {toDateString(freeDate)} г. принял дела и должность и вступил в исполнение служебных обязанностей.`,
    ].join("");
  }
}
