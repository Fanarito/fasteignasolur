import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class LindSeller extends AbstractSeller implements Seller {
  public name = 'Lind';
  public logoUrl = 'img/sellers/lind.jpg';
  public color = '#e0142f';
  public tariffUrl = 'https://www.fastlind.is/gjaldskra';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.019, 483_600),
      new FlatFee('fyrir gagnaöflun', 74_900),
    ];
  }
}
