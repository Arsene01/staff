module.exports = class PositionService {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  applyPosition(positionId, personId, start) {
    if ((!positionId) || (!personId) || (!start)) return;
    if (!this.isPositionFree(positionId, { start })) return;
    this.dispatcher.add(
      {
        relevant: { positionId, personId },
        range: { start, end: 2958525 }
      },
      'position-service'
    );
  }
  freePosition(positionId, personId, end) {
    for (let i = 0; i < this.services.length; i++) {
      const serviceObject = this.services[i];
      if (serviceObject.positionId !== positionId) continue;
      if (serviceObject.personId !== personId) continue;
      if (serviceObject.endDate) continue;
      serviceObject.endDate = endDateNumber;
      break;
    }
  }
  isPositionFree(positionId, range) {
    if ((!range) || (!range.start) || (!positionId)) return;
    if (!range.end) range.end = 2958525;
    const services = this.dispatcher
      .filterInSource({ relevant: { positionId }}, 'position-service')
      .filter((s) => {
        return (s.range.end >= range.start && s.range.start <= range.end) ? true : false;
      });
    return services.length ? false : true;
  }
}
