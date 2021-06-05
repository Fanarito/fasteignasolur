import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';

export default class F450Seller extends AbstractSeller implements Seller {
  public name = '450 fasteignasala';
  public logoUrl = 'img/sellers/450.png';
  public color = '#0c4479';
  public tariffUrl =
    'https://394dd5be-a1d7-4d93-bcb8-2664ff013312.filesusr.com/ugd/41e5cb_abe96b45612843af881c234f651b90c8.pdf';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0195, 0),
      new FlatFee('fyrir gagnaöflun', 57_995),
    ];
  }
}
