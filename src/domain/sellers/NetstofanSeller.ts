import AbstractSeller from './AbstractSeller';
import Seller from './Seller';
import Fee from '../fees/Fee';
import SalesPercentageFee from '../fees/SalesPercentageFee';
import FlatFee from '../fees/FlatFee';

export default class NetstofanSeller extends AbstractSeller implements Seller {
  public name = 'Netstofan';
  public logoUrl = 'img/sellers/netstofan.jpg';
  public color = '#00acee';
  public tariffUrl = 'https://netstofan.is/?page_id=23';

  public feesTaken(price: number): Fee[] {
    return [
      new SalesPercentageFee('í söluþóknun', price, 0.0186, 496_000),
      new FlatFee(
        'fyrir gagnaöflun (gjald er fellt niður við sölu á eign og því ekki tekið með í heildarreikningi)',
        55_000,
        {
          shortExplanation: 'Gagnaöflunargjald',
          includedInTotal: false,
        },
      ),
    ];
  }
}
