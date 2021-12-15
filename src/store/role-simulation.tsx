import { atom, selector, useSetRecoilState } from 'recoil';
import { IRoleItem } from '@/typings/role';
import { EEquipmentLocation, EWeaponType, IEquipment } from '@/typings/equipment';
import { ENumericalNumber } from '@/constants/numericalValue';

const defaultRole: IRoleItem = {
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
  equipment: {
    mainWeapon: {
      id: 'empty-handed',
      name: '空',
      weaponType: EWeaponType.EmptyHanded,
      location: EEquipmentLocation.MainWeapon,
      mainValueType: ENumericalNumber.WEAPON_ATK,
      mainValue: 0,
      allowedSecondaryWeapon: [
        EWeaponType.MagicDevice,
        EWeaponType.Knuckle,
        EWeaponType.Dagger,
        EWeaponType.Shield,
        EWeaponType.Arrow,
        EWeaponType.EmptyHanded,
        EWeaponType.NinjutsuScroll,
      ],
    },
    secondaryWeapon: {
      id: 'empty-handed',
      name: '空',
      weaponType: EWeaponType.EmptyHanded,
      location: EEquipmentLocation.MainWeapon,
      mainValueType: ENumericalNumber.WEAPON_ATK,
      mainValue: 0,
      allowedSecondaryWeapon: [
        EWeaponType.MagicDevice,
        EWeaponType.Knuckle,
        EWeaponType.Dagger,
        EWeaponType.Shield,
        EWeaponType.Arrow,
        EWeaponType.EmptyHanded,
        EWeaponType.NinjutsuScroll,
      ],
    },
    armorEquip: null,
    additionalEquip: null,
    specialEquip: null,
    fashionEquip1: null,
    fashionEquip2: null,
    fashionEquip3: null,
  },
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

export const useSetRoleEquipment = (roleId: string) => {
  const _setter = useSetRecoilState(roleSimulationState);

  const _set = (location: EEquipmentLocation, equipment: IEquipment) => {
    _setter((current) => {
      return current.map((roleItem) =>
        roleItem.id === roleId
          ? { ...roleItem, equipment: { ...roleItem.equipment, [location]: equipment } }
          : roleItem,
      );
    });
  };

  return;
};
