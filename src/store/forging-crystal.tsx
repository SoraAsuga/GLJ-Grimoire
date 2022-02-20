import { FORGING_CRYSTAL } from '@/components/numericalValue';
import { IXtal } from '@/typings/equipment';
import { atom } from 'recoil';

export const forgingCrystalState = atom<IXtal[]>({
  key: 'forging-crystal/items',
  default: [...FORGING_CRYSTAL],
});
