import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';
import { EstimatedAdvertisementFee } from '../fees/constants';

export default class NyttHeimiliSeller extends AbstractSeller
  implements Seller {
  public name = 'Nýtt Heimili';
  public logoUrl = 'img/sellers/nyttheimili.png';
  public color = '#086ca8';
  public tariffUrl = 'https://www.nyttheimili.is/gjaldskra/';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0195, 434_000),
      new FlatFee('fyrir gagnaöflun', 74_400),
      new FlatFee('fyrir auglýsingu á vefnum', 24_800),
      new FlatFee('áætlað verð fyrir gerð og birtingu auglýsinga (eftir samkomulagi)', EstimatedAdvertisementFee)
    ];
  }
}
