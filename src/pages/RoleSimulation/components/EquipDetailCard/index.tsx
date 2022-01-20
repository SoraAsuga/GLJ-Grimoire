import { ENumericalNumber, NUMERICAL_NUMBER } from '@/constants/numericalValue';
import { getRoleSelector } from '@/store/role-simulation';
import { IEquipment, IXtal } from '@/typings/equipment';
import {
  AimOutlined,
  BorderOutlined,
  EditOutlined,
  FileDoneOutlined,
  FireOutlined,
  SkinOutlined,
  StarOutlined,
} from '@ant-design/icons';
import React, { FC, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import EquipEdit from '../EquipEdit';

import './index.less';

interface IProps {
  item: IEquipment;
  headerMenu?: boolean;
  id?: string;
}

const EquipDetailCard: FC<IProps> = (props) => {
  const { item, headerMenu = true, id } = props;
  const [show, setShow] = useState(false);

  if (id) {
    const roleSelector = useMemo(() => getRoleSelector(id), [id]);
    const [role, setRole] = useRecoilState(roleSelector);
  }

  const enchantingItem = () =>
    item.enchanting &&
    item.enchanting.map((item) => {
      const { type, value, isNegative, weaponLimit } = item;

      return (
        <section
          className="enchanting"
          key={type}
          style={isNegative ? { color: 'red' } : { color: '#00327c' }}
        >
          <AimOutlined className="enchanting__icon" />
          {weaponLimit && (
            <span style={{ color: 'blue', fontSize: '14px', paddingTop: '4px' }}>
              {weaponLimit}
            </span>
          )}
          <span className="enchanting__name">{NUMERICAL_NUMBER[type].name}</span>
          <span className="enchanting__value">
            {isNegative ? '-' : '+'}
            {value}
            {NUMERICAL_NUMBER[type].type === 'Percentage' && '%'}
          </span>
        </section>
      );
    });

  /** 动态生成锻晶按钮 */
  const crystalButton = (xtal: IXtal) => {
    if (xtal) {
      return (
        <button className="card-content__crystal-btn">
          <StarOutlined className="crystal-btn__icon" />
          <span className="crystal-btn__name">{xtal.name}</span>
        </button>
      );
    }
    return (
      <button className="card-content__crystal-btn">
        <BorderOutlined className="crystal-btn__icon" />
        <span className="crystal-btn__name">空空的锻晶孔</span>
      </button>
    );
  };

  return (
    <>
      <section className="equip-detail-card__container">
        <header className="card-header">
          <StarOutlined className="card-header__icon" />
          <span className="card-header__name">{item.name}</span>
          <span className="card-header__type">{item.weaponType}</span>
          {headerMenu && (
            <button className="card-header__btn" onClick={() => setShow(!show)}>
              {show ? <FileDoneOutlined /> : <EditOutlined />}
            </button>
          )}
        </header>
        <section className="card-content">
          <section className="card-content__value">
            {item.mainValueType === ENumericalNumber.WEAPON_ATK ? (
              <FireOutlined style={{ margin: '0 5px' }} />
            ) : (
              <SkinOutlined style={{ margin: '0 5px' }} />
            )}

            <span className="card-header__value-type">
              {item.mainValueType === ENumericalNumber.WEAPON_ATK ? 'ATK' : 'DEF'}
            </span>
            <span className="card-header__value-number">{item.mainValue}</span>
            {item.stable && <span>{item.stable}%</span>}
          </section>
          {show ? (
            <div className="card-content__crystal">
              {crystalButton(item.xtal1)}
              {crystalButton(item.xtal2)}
            </div>
          ) : (
            <section className="card-content__enchanting">{enchantingItem()}</section>
          )}
        </section>
      </section>
    </>
  );
};

export default EquipDetailCard;
