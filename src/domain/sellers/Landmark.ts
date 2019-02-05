import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';
import AbstractSeller from './AbstractSeller';

export default class LandmarkSeller extends AbstractSeller implements Seller {
  public name = 'Landmark';
  public logoUrl = 'img/sellers/landmark.png';
  public color = '#356093';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0279, 0),
      new FlatFee('fyrir gagnaöflun', 55_900, 'Gagnaöflun'),
      new FlatFee(
        'fyrir frágang gagna, breytilegt en þetta er lágmarkið',
        310_000,
        'Frágangsgjald',
      ),
      new HourlyFee(20_900, hoursWorked),
    ];
  }
}
