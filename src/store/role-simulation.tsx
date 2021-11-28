import { atom, selector } from 'recoil';
import { RoleSimulationItem } from './types';

export const roleSimulationState = atom<RoleSimulationItem[]>({
  key: 'role-simulation/role',
  default: [
    {
      id: '',
      name: 'string',
      level: 1,
      str: 1,
      dex: 1,
      int: 1,
      agi: 1,
      vit: 1,
    },
  ],
});
