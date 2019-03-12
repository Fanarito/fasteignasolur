import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';
import AbstractSeller from './AbstractSeller';

export default class MidlunSeller extends AbstractSeller implements Seller {
  public name = 'Miðlun';
  public logoUrl = 'img/sellers/midlun.png';
  public color = '#3d6101';
  public tariffUrl = 'https://midlunfasteignir.is/gjaldskra/';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.02232, 310_000),
      new FlatFee(
        'fyrir gagnaöflun og auglýsingar',
        48_945,
        'Gagnaöflunar og auglýsingagjald',
      ),
    ];
  }
}
