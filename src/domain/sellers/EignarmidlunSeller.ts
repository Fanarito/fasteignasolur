import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';

export default class EignarmidlunSeller extends AbstractSeller
  implements Seller {
  public name = 'Eignarmiðlun';
  public logoUrl = 'img/sellers/eignarmidlun.png';
  public color = '#244c82';
  public tariffUrl = 'https://eignamidlun.is/gjaldskra';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0195, 0),
      new FlatFee('fyrir gagnaöflun', 30_000),
    ];
  }
}
