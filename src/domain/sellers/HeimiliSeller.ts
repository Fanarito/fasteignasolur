import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';
import { EstimatedAdvertisementFee } from '../fees/constants';

export default class HeimiliSeller extends AbstractSeller implements Seller {
  public name = 'Heimili';
  public logoUrl = 'img/sellers/heimili.png';
  public color = '#f27d00';
  public tariffUrl = 'https://www.heimili.is/gjaldskra/';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0175, 0),
      new FlatFee('fyrir að setja eign á söluskrá', 69_900, {
        shortExplanation: 'Skráning á söluskrá',
      }),
      new FlatFee('fyrir ljósmyndun', 28_500),
      new FlatFee('fyrir það að fasteignasali sýni eignina', 25_000),
      new FlatFee('áætlað verð fyrir gerð og birtingu auglýsinga (eftir samkomulagi)', EstimatedAdvertisementFee),
    ];
  }
}
