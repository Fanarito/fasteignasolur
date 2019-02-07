import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import HourlyFee from '../fees/HourlyFee';
import FlatFee from '../fees/FlatFee';

export default class EignaverSeller extends AbstractSeller implements Seller {
  public name = 'Eignaver';
  public logoUrl = 'img/sellers/eignaver.png';
  public color = '#ff1803';
  public tariffUrl = 'https://www.eignaver.is/text2/';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.02356, 396_400),
      new FlatFee('fyrir gagnaöflun', 43_400, 'Gagnaöflun'),
      new HourlyFee(24_800, hoursWorked),
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
