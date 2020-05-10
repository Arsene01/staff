class PositionService {
  constructor() {
    this.services = [];
  }
  applyPosition(positionId, personId, beginDateNumber) {
    if (this.isPositionFreeOnDate(positionId, beginDateNumber)) this.services.push({
      positionId, personId, beginDate: beginDateNumber
    });
  }
  freePosition(positionId, personId, endDateNumber) {
    for (let i = 0; i < this.services.length; i++) {
      const serviceObject = this.services[i];
      if (serviceObject.positionId !== positionId) continue;
      if (serviceObject.personId !== personId) continue;
      if (serviceObject.endDate) continue;
      serviceObject.endDate = endDateNumber;
      break;
    }
  }
  isPositionFreeOnDate(positionId, dateNumber) {
    const positionServices = this.services
      .filter(service => service.positionId === positionId);
    const length = positionServices.length;
    if (!length) return true;
    if (
      positionServices[length - 1].endDate &&
      positionServices[length - 1].endDate < dateNumber
    ) return true;
    return false;
  }
  deletePositionService(index) {
    if (index >= this.services.length || index < 0) return;
    if (index === 0) {
      this.services = this.services.slice(1);
      return;
    }
    this.services = [
      ...this.services.slice(0, index),
      ...this.services.slice(index + 1, this.services.length)
    ];
  }
}
const createPositionService = () => new PositionService();
exports.createPositionService = createPositionService;
