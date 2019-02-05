import BorgSeller from './BorgSeller';
import EignarmidlunSeller from './EignarmidlunSeller';
import LindSeller from './LindSeller';
import MiklaborgSeller from './MiklaborgSeller';
import RemaxSeller from './RemaxSeller';
import HeimiliSeller from './HeimiliSeller';
import LandmarkSeller from './Landmark';
import MidlunSeller from './MidlunSeller';
import NyttHeimiliSeller from './NyttHeimiliSeller';
import EignaverSeller from './EignaverSeller';

export default [
  new BorgSeller(),
  new EignarmidlunSeller(),
  new EignaverSeller(),
  new HeimiliSeller(),
  new LandmarkSeller(),
  new LindSeller(),
  new MidlunSeller(),
  new MiklaborgSeller(),
  new NyttHeimiliSeller(),
  new RemaxSeller(),
];
