import Fee from './Fee';

export default class SalesPercentageFee implements Fee {
  private reason: string;
  private price: number;
  private percentage: number;
  private minimum: number;

  /**
   * The sale commission fee is a percentage of the price of the property
   * usually with some minimum.
   * @param percentage number between 0 and 1
   * @param minimum the minimum fee
   */
  constructor(
    reason: string,
    price: number,
    percentage: number,
    minimum: number,
  ) {
    this.reason = reason;
    this.price = price;
    this.percentage = percentage;
    this.minimum = minimum;
  }

  public totalFee(): number {
    const fee = this.percentage * this.price;
    if (fee < this.minimum) {
      return this.minimum;
    }
    return fee;
  }

  public explanation(): string {
    return `Taka ${(this.percentage * 100).toFixed(
      2,
    )}% af söluverði, eða að minnsta kosti ${this.minimum.toLocaleString()} fyrir ${
      this.reason
    }`;
  }
}
