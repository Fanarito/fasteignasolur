import Fee from '../fees/Fee';

export default interface Seller {
  name: string;
  logoUrl: string;
  color: string;
  tariffUrl: string;
  showName: boolean;

  feesTaken(price: number, hoursWorked: number): Fee[];
  totalFee(price: number, hoursWorked: number): number;
}
