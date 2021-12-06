import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { IRoleItem } from '@/typings/role';
import { ENumericalNumber } from '@/constants/numericalValue';

const defaultRole = {
  id: 'default',
  name: '演示',
  level: 1,
  createDate: '2000-01-01 00:00',
  ability: {
    str: 1,
    dex: 1,
    int: 1,
    agi: 1,
    vit: 1,
  },
  abilityEx: {
    type: null,
    value: 1,
  },
  equipment: {},
};

export const roleSimulationState = atom<IRoleItem[]>({
  key: 'role-simulation/role-list',
  default: [defaultRole],
});

export const getRoleSelector = (roleId: string) => {
  return selector({
    key: `role-simulation/role/${roleId}`,
    get({ get }) {
      const newDefaultRole = { ...defaultRole, id: roleId };
      return get(roleSimulationState).find(({ id }) => id === roleId) || newDefaultRole;
    },
    set({ set }, newValue: IRoleItem) {
      console.log('set roleList');
      set(roleSimulationState, (current) => {
        return current.map((roleItem) => (roleItem.id === roleId ? newValue : roleItem));
      });
    },
  });
};
