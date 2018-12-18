import Fee from './Fee';

export default class FlatFee implements Fee {
  private reason: string;
  private fee: number;

  constructor(reason: string, fee: number) {
    this.reason = reason;
    this.fee = fee;
  }

  public totalFee(): number {
    return this.fee;
  }

  public explanation(): string {
    return `Flatt ${this.fee.toLocaleString()} krónu gjald fyrir ${
      this.reason
    }`;
  }
}
