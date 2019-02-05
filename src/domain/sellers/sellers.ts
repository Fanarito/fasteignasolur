import BorgSeller from './BorgSeller';
import EignarmidlunSeller from './EignarmidlunSeller';
import LindSeller from './LindSeller';
import MiklaborgSeller from './MiklaborgSeller';
import RemaxSeller from './RemaxSeller';
import HeimiliSeller from './HeimiliSeller';
import LandmarkSeller from './Landmark';

export default [
  new BorgSeller(),
  new EignarmidlunSeller(),
  new HeimiliSeller(),
  new LandmarkSeller(),
  new LindSeller(),
  new MiklaborgSeller(),
  new RemaxSeller(),
];
