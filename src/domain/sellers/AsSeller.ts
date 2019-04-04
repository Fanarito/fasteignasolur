import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';

export default class AsSeller extends AbstractSeller implements Seller {
  public name = 'Ás fasteignasala';
  public logoUrl = 'img/sellers/as.png';
  public color = '#431e7b';
  public tariffUrl = 'https://www.as.is/text1/';
  public showName = true;

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee(
        'í söluþóknun miðað við að fasteignasali sýni alltaf',
        price,
        0.02418,
        0,
      ),
      new FlatFee('fyrir gagnaöflun', 50_000),
    ];
  }
}
