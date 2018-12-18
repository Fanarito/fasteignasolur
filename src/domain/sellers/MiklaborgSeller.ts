import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';
import AbstractSeller from './AbstractSeller';

export default class MiklaborgSeller extends AbstractSeller implements Seller {
  public name = 'Miklaborg';

  public feesTaken(): Fee[] {
    return [
      new SalesPercentageFee('aðstoðina', this.price, 0.035, 489_800),
      new FlatFee('gagnaöflun', 37200),
      new FlatFee('aðstoð og/eða skjalafrágang', 310_000),
    ];
  }
}
