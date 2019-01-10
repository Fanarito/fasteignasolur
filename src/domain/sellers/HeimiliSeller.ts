import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';
import HourlyFee from '../fees/HourlyFee';
import AbstractSeller from './AbstractSeller';

export default class HeimiliSeller extends AbstractSeller implements Seller {
  public name = 'Heimili';
  public logoUrl = 'img/sellers/heimili.png';
  public color = '#f27d00';

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new SalesPercentageFee('aðstoðina', price, 0.031, 0),
      new FlatFee('að setja eign á söluskrá', 59_900, 'Skrá á söl'),
      new HourlyFee(12_000, hoursWorked),
      new FlatFee('aðstoð og/eða skjalafrágang', 295_000, 'Skjalafrágangur'),
    ];
  }
}
