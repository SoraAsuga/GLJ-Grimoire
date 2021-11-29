import { lookup } from 'dns/promises';
import { atom, selector } from 'recoil';
import { RoleSimulationItem } from './types';

export const roleSimulationState = atom<RoleSimulationItem[]>({
  key: 'role-simulation/role',
  default: [
    {
      id: '',
      name: '演示',
      level: 1,
      str: 1,
      dex: 1,
      int: 1,
      agi: 1,
      vit: 1,
      exName: 'luk',
      ex: 1,
      createDate: '2000-01-01 00:00',
    },
  ],
});
