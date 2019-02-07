import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class MiklaborgSeller extends AbstractSeller implements Seller {
  public name = 'Miklaborg';
  public logoUrl = 'img/sellers/miklaborg.png';
  public color = '#c92829';
  public tariffUrl = 'http://www.miklaborg.is/um-okkur/verdskra-mikluborgar';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.031, 489_800),
      new FlatFee('fyrir gagnaöflun', 37200, 'Gagnaöflun'),
      new FlatFee(
        'fyrir aðstoð og/eða skjalafrágang',
        310_000,
        'Skjalafrágangur',
      ),
    ];
  }
}
