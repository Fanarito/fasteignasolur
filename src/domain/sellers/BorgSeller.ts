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

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.031, 489_800),
      new FlatFee('fyrir gagnaöflun', 62_000, 'Gagnaöflun'),
      new HourlyFee(20_000, hoursWorked),
      new SalesPercentageFee(
        'fyrir aðstoð og/eða skjalafrágang',
        price,
        0.01,
        272_800,
        'Skjalafrágangur',
      ),
    ];
  }
}
