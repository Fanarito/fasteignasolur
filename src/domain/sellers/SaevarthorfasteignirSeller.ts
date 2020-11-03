import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class SaevarthorfasteignirSeller extends AbstractSeller
  implements Seller {
  public name = 'Fasteignasala Sævars Þórs';
  public logoUrl = 'img/sellers/saevar.webp';
  public color = '#a6943e';
  public tariffUrl = 'https://www.saevarthorfasteignir.is/#verdskra';
  public showName = true;

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.01, 0),
      new FlatFee('fyrir gagnaöflun', 49_600),
    ];
  }
}
