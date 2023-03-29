import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import FlatFee from '../fees/FlatFee';

export default class ProcuraSeller extends AbstractSeller implements Seller {
  public name = 'Procura';
  public logoUrl = 'img/sellers/procura.png';
  public color = '#bb161d';
  public tariffUrl = 'https://procura.is/selja';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new FlatFee('í söluþóknun miðað við að fasteignasali sýni eignina', 649_000, {
        shortExplanation: 'Söluþóknun',
      }),
    ];
  }
}
