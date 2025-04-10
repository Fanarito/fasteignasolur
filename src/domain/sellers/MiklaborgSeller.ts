import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class MiklaborgSeller extends AbstractSeller implements Seller {
  public name = 'Miklaborg';
  public logoUrl = 'img/sellers/miklaborg.png';
  public color = '#c92829';
  public tariffUrl = 'http://www.miklaborg.is/um-okkur/verdskra-mikluborgar';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0195, 682_000),
      new FlatFee('fyrir gagnaöflun', 54_560),
      new FlatFee('fyrir atvinnuljósmyndara (dýrara fyrir sérbýli)', 23_800),
      new FlatFee('auglýsingakostnaður', 54_560),
    ];
  }
}
