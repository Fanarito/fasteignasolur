import Fee from './Fee';

export default class HourlyFee implements Fee {
  private rate: number;
  private hours: number;

  constructor(rate: number, hours: number) {
    this.rate = rate;
    this.hours = hours;
  }

  public totalFee(): number {
    return this.rate * this.hours;
  }

  public explanation(): string {
    return `Taka ${this.rate.toLocaleString()} á tímann, áætlaðir ${
      this.hours
    } tímar.`;
  }
}
