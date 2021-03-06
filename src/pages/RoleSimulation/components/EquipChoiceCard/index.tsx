import { EEquipmentLocation, EWeaponType } from '@/typings/equipment';
import { IRoleItem } from '@/typings/role';
import {
  RocketOutlined,
  CloseOutlined,
  QuestionOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import React, { FC } from 'react';
import { IType } from '../../pages/EditRole/pages/RoleEquip';
import EquipDetailCard from '../EquipDetailCard';

import './index..less';

interface IProps {
  item: IType;
  role: IRoleItem;
  changeShow: (type?: EEquipmentLocation, location?: string) => () => void;
  deleteCurrentEquip: (item: IType) => () => void;
  showXtalList?: (show: boolean) => void;
  changeXtalType?: (
    type: EWeaponType,
    location: 'xtal1' | 'xtal2',
    weaponLocation: EEquipmentLocation,
  ) => void;
}

const EquipChoiceCard: FC<IProps> = (props) => {
  const { item, role, changeShow, deleteCurrentEquip, showXtalList, changeXtalType } = props;

  return (
    <div className="role-equip__card" key={item.name}>
      <div className="role-equip__card-container">
        <header className="role-equip__card-header">
          <RocketOutlined />
          <span className="card-header__title">{item.name}</span>
          {role.equipment[item.location] && role.equipment[item.location].name !== '空' && (
            <button className="card-header__btn" onClick={deleteCurrentEquip(item)}>
              <CloseOutlined />
            </button>
          )}
          <button className="card-header__btn" onClick={changeShow(item.type, item.location)}>
            <UnorderedListOutlined />
          </button>
        </header>
        {role.equipment[item.location] ? (
          role.equipment[item.location].name !== '空' ? (
            <EquipDetailCard
              item={role.equipment[item.location]}
              showXtalList={showXtalList}
              changeXtalType={changeXtalType}
            />
          ) : (
            <button className="role-equip__content" onClick={changeShow(item.type, item.location)}>
              <section className="role-equip__content-details">
                <QuestionOutlined className="content-details__icon" />
                <span className="content-details__text">点击添加装备</span>
              </section>
            </button>
          )
        ) : (
          <button className="role-equip__content" onClick={changeShow(item.type, item.location)}>
            <section className="role-equip__content-details">
              <QuestionOutlined className="content-details__icon" />
              <span className="content-details__text">点击添加装备</span>
            </section>
          </button>
        )}
      </div>
    </div>
  );
};

export default EquipChoiceCard;
