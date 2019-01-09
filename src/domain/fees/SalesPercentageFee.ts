import Fee from './Fee';

export default class SalesPercentageFee implements Fee {
  public readonly shortExplanation: string;

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
    shortExplanation: string = 'Söluprósenta',
  ) {
    this.reason = reason;
    this.price = price;
    this.percentage = percentage;
    this.minimum = minimum;
    this.shortExplanation = shortExplanation;
  }

  public totalFee(): number {
    const fee = this.percentage * this.price;
    if (fee < this.minimum) {
      return this.minimum;
    }
    return fee;
  }

  public explanation(): string {
    let explanation = `Taka ${(this.percentage * 100).toFixed(
      2,
    )}% af söluverði`;
    if (this.minimum !== 0) {
      explanation += `, eða að minnsta kosti ${this.minimum.toLocaleString()} kr.`;
    }
    explanation += ` fyrir ${this.reason}`;
    return explanation;
  }
}
