import BorgSeller from './BorgSeller';
import EignarmidlunSeller from './EignarmidlunSeller';
import LindSeller from './LindSeller';
import MiklaborgSeller from './MiklaborgSeller';
import RemaxSeller from './RemaxSeller';
import HeimiliSeller from './HeimiliSeller';
import LandmarkSeller from './Landmark';
import Midlun from './Midlun';

export default [
  new BorgSeller(),
  new EignarmidlunSeller(),
  new HeimiliSeller(),
  new LandmarkSeller(),
  new LindSeller(),
  new Midlun(),
  new MiklaborgSeller(),
  new RemaxSeller(),
];
