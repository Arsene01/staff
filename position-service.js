class PositionService {
  constructor() {
    this.services = [];
  }
  applyPosition(positionId, personId, beginDateNumber) {}
  freePosition(positionId, personId, endDateNumber) {}
  isPositionFreeOnDate(positionId, dateNumber) {
    const positionServices = this.services
      .filter(service => service.positionId === positionId);
    const length = positionServices.length;
    if (!length) return true;
    if (
      positionServices[length - 1].endDate &&
      positionServices[length - 1].endDate < beginDateNumber
    ) return true;
    return false;
  }
  deletePositionService(index) {
    if (index >= this.services.length) return;
    if (index === 0) {
      this.services = this.services.slice(1);
      return;
    }
    return [
      ...this.services.slice(0, index),
      ...this.services.slice(index + 1, this.services.length)
    ];    
  }
}
