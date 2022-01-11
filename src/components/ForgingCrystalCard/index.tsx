import { IForgingCrystal, NUMERICAL_NUMBER } from '@/constants/numericalValue';
import EquipEdit from '@/pages/RoleSimulation/components/EquipEdit';
import { AimOutlined, StarOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';

import './index.less';

interface IProps {
  item: IForgingCrystal;
}

const ForgingCrystalCard: FC<IProps> = (props) => {
  const { item } = props;
  const [show, setShow] = useState(false);

  /** 窗口展示 */
  const onCancel = () => {
    setShow(false);
  };

  /** 动态生成附魔条目 */
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
      <section className="forging-crystal-card_container">
        <header className="card-header">
          <StarOutlined className="card-header_icon" />
          <span className="card-header_name">{item.name}</span>
          {item.strengthen && <span className="card-header_tips">强化锻晶</span>}
        </header>
        <section className="card-content">
          <section className="card-content_enchanting">{enchantingItem()}</section>
        </section>
      </section>
    </>
  );
};

export default ForgingCrystalCard;
