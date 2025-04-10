import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';
import { EstimatedAdvertisementFee } from '../fees/constants';

export default class GimliSeller extends AbstractSeller implements Seller {
  public name = 'Gimli';
  public logoUrl = 'img/sellers/gimli.png';
  public color = '#f30800';
  public tariffUrl = 'https://gimli.is/gjaldskra';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.015, 483_600),
      new FlatFee('fyrir gagnaöflun', 54_900),
      new FlatFee('áætlað verð fyrir gerð og birtingu auglýsinga (eftir samkomulagi)', EstimatedAdvertisementFee),
    ];
  }
}
