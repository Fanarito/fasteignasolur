import Seller from './Seller';
import Fee from '../fees/Fee';

export default abstract class AbstractSeller implements Seller {
  public abstract name: string;
  public abstract logoUrl: string;
  public abstract color: string;
  public abstract tariffUrl: string;
  public showName = false;

  public abstract feesTaken(price: number, hoursWorked: number): Fee[];

  public totalFee(price: number, hoursWorked: number): number {
    return this.feesTaken(price, hoursWorked).reduce(
      (totalFee, currFee) =>
        currFee.includedInTotal ? (totalFee += currFee.totalFee()) : totalFee,
      0,
    );
  }
}
