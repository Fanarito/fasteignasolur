import Fee from './Fee';

export default class SalesPercentageFee implements Fee {
  public readonly shortExplanation: string;
  public readonly includedInTotal: boolean;

  private reason: string;
  private price: number;
  private percentage: number;
  private minimum: number;
  private fee: number;

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
    { shortExplanation = 'Söluprósenta', includedInTotal = true } = {},
  ) {
    this.reason = reason;
    this.price = price;
    this.percentage = percentage;
    this.minimum = minimum;
    this.shortExplanation = shortExplanation;
    this.includedInTotal = includedInTotal;

    const fee = this.percentage * this.price;
    if (fee < this.minimum) {
      this.fee = this.minimum;
    } else {
      this.fee = fee;
    }
  }

  public totalFee(): number {
    return this.fee;
  }

  public explanation(): string {
    let explanation = `Taka ${(this.percentage * 100).toFixed(
      2,
    )}% af söluverði`;
    if (this.minimum !== 0) {
      explanation += `, eða að minnsta kosti ${this.minimum.toLocaleString()} kr.`;
    }
    explanation += ` ${this.reason}`;
    return explanation;
  }
}
