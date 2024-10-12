import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import { EstimatedAdvertisementFee } from '../fees/constants';

export default class AlltSeller extends AbstractSeller implements Seller {
  public name = 'Allt fasteignir';
  public logoUrl = 'img/sellers/allt.jpg';
  public color = '#7ad14e';
  public tariffUrl = 'https://www.allt.is/gjaldskra';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee(
        'í söluþóknun miðað við fulla þjónustu',
        price,
        0.0185,
        400_000,
      ),
      new FlatFee('fyrir gagnaöflun', 69_440),
      new FlatFee('áætlað verð fyrir gerð og birtingu auglýsinga (eftir samkomulagi)', EstimatedAdvertisementFee),
      new FlatFee('fyrir ljósmyndun (fellur niður ef eigin selst)', 30_000, {
        includedInTotal: false,
      }),
    ];
  }
}
