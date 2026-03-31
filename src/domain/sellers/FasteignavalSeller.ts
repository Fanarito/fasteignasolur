import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';

export default class FasteignavalSeller extends AbstractSeller implements Seller {
  public name = 'Fasteignaval';
  public logoUrl = 'img/sellers/fasteignaval.png';
  public color = '#1e237bff';
  public tariffUrl = 'https://www.fasteignaval.is/gjaldskra';
  public showName = false;

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee(
        'í söluþóknun miðað við að fasteignasali sýni alltaf',
        price,
        0.015,
        350_000,
      ),
      new FlatFee('fyrir gagnaöflun seljanda', 30_000),
    ];
  }
}
