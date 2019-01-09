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

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('aðstoðina', price, 0.025, 0),
      new FlatFee('gagnaöflun', 30_000),
      new HourlyFee(20_000, hoursWorked),
      new SalesPercentageFee(
        'aðstoð og/eða skjalafrágang',
        price,
        0.01,
        558_000,
      ),
    ];
  }
}
