import { FORGING_CRYSTAL } from '@/components/numericalValue';
import { atom } from 'recoil';

export const forgingCrystalState = atom<IForgingCrystal[]>({
  key: 'forging-crystal/items',
  default: [...FORGING_CRYSTAL],
});
