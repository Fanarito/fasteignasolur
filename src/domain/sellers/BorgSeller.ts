import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class BorgSeller extends AbstractSeller implements Seller {
  public name = 'Borg';
  public logoUrl = 'img/sellers/borg.png';
  public color = '#ef7a1d';
  public tariffUrl = 'https://www.fastborg.is/gjaldska';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.02418, 489_800),
      new FlatFee('fyrir gagnaöflun', 62_000),
    ];
  }
}
