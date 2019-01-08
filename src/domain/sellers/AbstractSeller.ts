import Seller from './Seller';
import Fee from '../fees/Fee';

export default abstract class AbstractSeller implements Seller {
  public abstract name: string;
  public abstract logoUrl: string;
  public abstract color: string;
  public price: number;
  public hoursWorked: number;

  constructor(price: number, hoursWorked: number) {
    this.price = price;
    this.hoursWorked = hoursWorked;
  }

  public abstract feesTaken(): Fee[];

  public totalFee(): number {
    return this.feesTaken().reduce(
      (totalFee, currFee) => (totalFee += currFee.totalFee()),
      0,
    );
  }
}
