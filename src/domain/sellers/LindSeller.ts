import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';
import AbstractSeller from './AbstractSeller';

export default class LindSeller extends AbstractSeller implements Seller {
  public name = 'Lind';
  public logoUrl = 'img/sellers/lind.jpg';
  public color = '#e0142f';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('aðstoðina', price, 0.0295, 365_800),
      new FlatFee('gagnaöflun', 59_900),
    ];
  }
}
