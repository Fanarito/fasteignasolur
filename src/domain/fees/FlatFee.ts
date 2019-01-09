import Fee from './Fee';

export default class FlatFee implements Fee {
  public readonly shortExplanation: string;

  private reason: string;
  private fee: number;

  constructor(
    reason: string,
    fee: number,
    shortExplanation: string = 'Flatt gjald',
  ) {
    this.reason = reason;
    this.fee = fee;
    this.shortExplanation = shortExplanation;
  }

  public totalFee(): number {
    return this.fee;
  }

  public explanation(): string {
    return `Flatt ${this.fee.toLocaleString()} kr. gjald fyrir ${
      this.reason
    }`;
  }
}
