import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';
import AbstractSeller from './AbstractSeller';

export default class NyttHeimiliSeller extends AbstractSeller
  implements Seller {
  public name = 'Nýtt Heimili';
  public logoUrl = 'img/sellers/nyttheimili.png';
  public color = '#086ca8';
  public tariffUrl = 'https://www.nyttheimili.is/gjaldskra/';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.02418, 334_800),
      new FlatFee('fyrir gagnaöflun', 49_600, 'Gagnaöflunargjald'),
      new HourlyFee(22_320, hoursWorked),
      new SalesPercentageFee(
        'fyrir aðstoð og/eða skjalafrágang',
        price,
        0.01,
        248_000,
        'Skjalafrágangur',
      ),
    ];
  }
}
