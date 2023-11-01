import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';

export default class EignaverSeller extends AbstractSeller implements Seller {
  public name = 'Eignaver';
  public logoUrl = 'img/sellers/eignaver.png';
  public color = '#ff1803';
  public tariffUrl = 'https://www.eignaver.is/gjaldskra';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0195, 489_800),
      new FlatFee('fyrir gagnaöflun', 43_400),
    ];
  }
}
