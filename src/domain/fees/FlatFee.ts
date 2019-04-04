import Fee from './Fee';

export default class FlatFee implements Fee {
  public readonly shortExplanation: string;
  public readonly includedInTotal: boolean;

  private reason: string;
  private fee: number;

  constructor(
    reason: string,
    fee: number,
    { shortExplanation = 'Gagnaöflun', includedInTotal = true } = {},
  ) {
    this.reason = reason;
    this.fee = fee;
    this.shortExplanation = shortExplanation;
    this.includedInTotal = includedInTotal;
  }

  public totalFee(): number {
    return this.fee;
  }

  public explanation(): string {
    return `Flatt ${this.fee.toLocaleString()} kr. gjald ${this.reason}`;
  }
}
