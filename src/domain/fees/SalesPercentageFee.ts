import Fee from './Fee';
import { VAT } from './constants';

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

    const fee = this.percentage * VAT * this.price;
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
    const vatDisplay = (VAT - 1) * 100;
    const totalPercentage = (this.percentage * VAT * 100).toFixed(2);
    const percentage = (this.percentage * 100).toFixed(2);

    let explanation = `Taka ${percentage}% af söluverði auk vsk (${(VAT - 1) *
      100}%) sem jafngildir ${totalPercentage}%`;
    if (this.minimum !== 0) {
      explanation += `, eða að lágmarki ${this.minimum.toLocaleString()} kr.`;
    }
    explanation += ` ${this.reason}`;
    return explanation;
  }
}
