import Seller from './Seller';
import Fee from '../fees/Fee';
import FlatFee from '../fees/FlatFee';
import AbstractSeller from './AbstractSeller';

export default class KaupstadurSeller extends AbstractSeller implements Seller {
  public name = 'Kaupstadur';
  public logoUrl = 'data:image/svg+xml,%3Csvg width="2rem" height="2rem" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M10 15V0H0V25.0002L10 15L30 35H40L20 15H10Z" fill="%237EB179"%3E%3C/path%3E%3Cpath d="M25 0L10 15H20L35 0H25Z" fill="%237EB179"%3E%3C/path%3E%3Cpath d="M10.0043 35H0L10 25.0002L10.0043 35Z" fill="%237EB179"%3E%3C/path%3E%3C/svg%3E';
  public color = '#7eb179';
  public tariffUrl = 'https://kaupstadur.is/';
  public showName = true;

  public feesTaken(price: number, hoursWorked: number): Fee[] {
    return [
      new FlatFee('miðað við Platínupakkann', 489_000),
    ];
  }
}
