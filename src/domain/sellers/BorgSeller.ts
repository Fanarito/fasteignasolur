import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class BorgSeller extends AbstractSeller implements Seller {
  public name = 'Borg';
  public logoUrl = 'img/sellers/borg.png';
  public color = '#ef7a1d';
  public tariffUrl = 'https://www.fastborg.is/gjaldskra/';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0195, 558_000),
      new FlatFee('fyrir gagnaöflun', 79_000),
    ];
  }
}
