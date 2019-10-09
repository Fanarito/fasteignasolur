import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';

export default class KaupsyslanSeller extends AbstractSeller implements Seller {
  public name = 'Kaupsýslan';
  public logoUrl = 'img/sellers/kaupsyslan.png';
  public color = '#e7302a';
  public tariffUrl = 'https://www.kaupsyslan.is/gjaldskra';
  public showName = true;

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0175, 496_000),
      new FlatFee('fyrir gagnaöflun', 52_900),
    ];
  }
}
