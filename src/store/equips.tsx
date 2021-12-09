import { EQUIPS } from '@/constants/numericalValue';
import { IEquipment } from '@/typings/equipment';
import { atom } from 'recoil';

export const equipsState = atom<IEquipment[]>({
  key: 'role-simulation/equips',
  default: [...EQUIPS],
});
