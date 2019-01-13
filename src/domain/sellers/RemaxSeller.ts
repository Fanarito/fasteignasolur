import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';
import AbstractSeller from './AbstractSeller';

export default class RemaxSeller extends AbstractSeller implements Seller {
  public name = 'Remax';
  public logoUrl = 'img/sellers/remax.jpg';
  public color = '#0190de';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.03658, 365_800),
      new FlatFee('fyrir gagnaöflun', 59_900, 'Gagnaöflun'),
      new HourlyFee(23_560, hoursWorked),
    ];
  }
}
