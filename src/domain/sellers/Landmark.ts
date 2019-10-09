import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class LandmarkSeller extends AbstractSeller implements Seller {
  public name = 'Landmark';
  public logoUrl = 'img/sellers/landmark.png';
  public color = '#356093';
  public tariffUrl = 'https://www.landmark.is/text1/';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0225, 0),
      new FlatFee('fyrir gagnaöflun', 55_900),
    ];
  }
}
