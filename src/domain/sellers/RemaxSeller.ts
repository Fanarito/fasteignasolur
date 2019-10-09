import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class RemaxSeller extends AbstractSeller implements Seller {
  public name = 'Remax';
  public logoUrl = 'img/sellers/remax.jpg';
  public color = '#0190de';
  public tariffUrl = 'https://remax.is/gjaldska';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.025, 365_800),
      new FlatFee('fyrir gagnaöflun', 59_900),
    ];
  }
}
