import Fee from './Fee';

export default class HourlyFee implements Fee {
  public readonly shortExplanation: string;

  private rate: number;
  private hours: number;

  constructor(
    rate: number,
    hours: number,
    shortExplanation: string = 'Tímagjald',
  ) {
    this.rate = rate;
    this.hours = hours;
    this.shortExplanation = shortExplanation;
  }

  public totalFee(): number {
    return this.rate * this.hours;
  }

  public explanation(): string {
    return `Taka ${this.rate.toLocaleString()} kr. á tímann, áætlaðir ${
      this.hours
    } tímar.`;
  }
}
