import { ENumericalNumber, NUMERICAL_NUMBER } from '@/constants/numericalValue';
import { IEquipment } from '@/typings/equipment';
import {
  AimOutlined,
  EditOutlined,
  FireOutlined,
  SkinOutlined,
  StarOutlined,
} from '@ant-design/icons';
import React, { FC, useState } from 'react';
import EquipEdit from '../EquipEdit';

import './index.less';

interface IProps {
  item: IEquipment;
  headerMenu?: boolean;
}

const EquipDetailCard: FC<IProps> = (props) => {
  const { item, headerMenu = true } = props;
  const [show, setShow] = useState(false);

  const onCancel = () => {
    setShow(false);
  };

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
          <AimOutlined className="enchanting_icon" />
          {weaponLimit && (
            <span style={{ color: 'blue', fontSize: '14px', paddingTop: '4px' }}>
              {weaponLimit}
            </span>
          )}
          <span className="enchanting_name">{NUMERICAL_NUMBER[type].name}</span>
          <span className="enchanting_value">
            {isNegative ? '-' : '+'}
            {value}
            {NUMERICAL_NUMBER[type].type === 'Percentage' && '%'}
          </span>
        </section>
      );
    });

  return (
    <>
      <EquipEdit visible={show} onCancel={onCancel} />
      <section className="equip-detail-card_container">
        <header className="card-header">
          <StarOutlined className="card-header_icon" />
          <span className="card-header_name">{item.name}</span>
          <span className="card-header_type">{item.weaponType}</span>
          {headerMenu && (
            <button className="card-header_btn" onClick={() => setShow(true)}>
              <EditOutlined />
            </button>
          )}
        </header>
        <section className="card-content">
          <section className="card-content_value">
            {item.mainValueType === ENumericalNumber.WEAPON_ATK ? (
              <FireOutlined style={{ margin: '0 5px' }} />
            ) : (
              <SkinOutlined style={{ margin: '0 5px' }} />
            )}

            <span className="card-header_value-type">
              {item.mainValueType === ENumericalNumber.WEAPON_ATK ? 'ATK' : 'DEF'}
            </span>
            <span className="card-header_value-number">{item.mainValue}</span>
            {item.stable && <span>{item.stable}%</span>}
          </section>
          <section className="card-content_enchanting">{enchantingItem()}</section>
        </section>
      </section>
    </>
  );
};

export default EquipDetailCard;
