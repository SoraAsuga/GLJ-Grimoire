import { NUMERICAL_NUMBER, ENumericalNumber } from '@/constants/numericalValue';
import { EEquipmentLocation, EWeaponType, IEquipment } from '@/typings/equipment';
import { atom } from 'recoil';

export const equipsState = atom<IEquipment[]>({
  key: 'role-simulation/role-list',
  default: [],
});
