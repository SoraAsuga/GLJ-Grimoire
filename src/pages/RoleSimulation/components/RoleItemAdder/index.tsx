import { roleSimulationState } from '@/store/role-simulation';
import { UserAddOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

import './index.less';
import { EWeaponType, EEquipmentLocation } from '@/typings/equipment';
import { ENumericalNumber } from '@/components/numericalValue';

const RoleItemAdder: FC = () => {
  const history = useHistory();
  const setList = useSetRecoilState(roleSimulationState);

  const addRole = (id: string) => {
    setList((oldList) => [
      ...oldList,
      {
        id,
        name: '新建角色',
        level: 1,
        createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        ability: {
          str: 1,
          dex: 1,
          int: 1,
          vit: 1,
          agi: 1,
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
      },
    ]);
  };

  const handleClickEdit = () => {
    const id = nanoid();
    addRole(id);
    history.push(`/RoleSimulation/EditRole/${id}`);
  };

  return (
    <Card className="role-item role-item__new" onClick={handleClickEdit}>
      <div className="role-item__container">
        <div className="role-item__icon">
          <UserAddOutlined />
        </div>
        <div className="role-item__title">点击创建新角色</div>
      </div>
    </Card>
  );
};

export default RoleItemAdder;
