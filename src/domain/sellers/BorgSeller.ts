import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';
import AbstractSeller from './AbstractSeller';

export default class BorgSeller extends AbstractSeller implements Seller {
  public name = 'Borg';
  public logoUrl = 'img/sellers/borg.png';
  public color = '#ef7a1d';

  public feesTaken(): Fee[] {
    return [
      new SalesPercentageFee('aðstoðina', this.price, 0.025, 489_800),
      new FlatFee('gagnaöflun', 62_000),
      new HourlyFee(20_000, this.hoursWorked),
      new SalesPercentageFee(
        'aðstoð og/eða skjalafrágang',
        this.price,
        0.01,
        272_800,
      ),
    ];
  }
}
