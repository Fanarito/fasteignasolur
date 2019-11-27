import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';

export default class AlltSeller extends AbstractSeller implements Seller {
  public name = 'Allt fasteignir';
  public logoUrl = 'img/sellers/allt.jpg';
  public color = '#7ad14e';
  public tariffUrl = 'https://www.alltfasteignir.is/gjaldskra/';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee(
        'í söluþóknun miðað við fulla þjónustu',
        price,
        0.0185,
        0,
      ),
      new FlatFee('fyrir gagnaöflun', 62_000),
    ];
  }
}
