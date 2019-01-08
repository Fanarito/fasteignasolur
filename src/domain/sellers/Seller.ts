import Fee from '../fees/Fee';

export default interface Seller {
  name: string;
  logoUrl: string;
  color: string;
  price: number;
  hoursWorked: number;

  feesTaken(): Fee[];
  totalFee(): number;
}
