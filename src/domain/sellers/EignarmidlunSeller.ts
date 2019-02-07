import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';

export default class EignarmidlunSeller extends AbstractSeller
  implements Seller {
  public name = 'Eignarmiðlun';
  public logoUrl = 'img/sellers/eignarmidlun.png';
  public color = '#244c82';
  public tariffUrl = 'https://eignamidlun.is/gjaldskra';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.02418, 0),
      new FlatFee('fyrir gagnaöflun', 30_000, 'Gagnaöflun'),
      new HourlyFee(20_000, hoursWorked),
      new SalesPercentageFee(
        'fyrir aðstoð og/eða skjalafrágang',
        price,
        0.01,
        558_000,
        'Skjalafrágangur',
      ),
    ];
  }
}
