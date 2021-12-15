import { IEquipment } from '@/typings/equipment';
import { atom } from 'recoil';

export interface IChosenEquips {
  equip: IEquipment;
  id: string;
}

export const chosenEquipsState = atom<IChosenEquips[]>({
  key: 'role-simulation/equips-chosen',
  default: [],
});
