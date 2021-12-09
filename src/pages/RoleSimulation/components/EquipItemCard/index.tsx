import { IEquipment } from '@/typings/equipment';
import { EditOutlined, StarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import EquipEdit from '../EquipEdit';

import './index.less';

interface IProps {
  item: IEquipment;
}

const EquipDetailCard: FC<IProps> = (props) => {
  const { item } = props;
  const [show, setShow] = useState(false);

  const onCancel = () => {
    setShow(false);
  };

  return (
    <>
      <EquipEdit visible={show} onCancel={onCancel} />
      <section className="equip-detail-card_container">
        <header className="card-header">
          <StarOutlined className="card-header_icon" />
          <span className="card-header_name">{item.name}</span>
          <span className="card-header_value">
            <span className="card-header_value-type">
              {item.mainValueType !== 28 ? 'ATK' : 'DEF'}
            </span>
            <span className="card-header_value-number">{item.mainValue}</span>
          </span>
          <button onClick={() => setShow(true)}>
            <EditOutlined />
          </button>
        </header>
        <section className="card-content">
          <section className="card-content_value"></section>
          <section className="card-content_enchanting"></section>
        </section>
      </section>
    </>
  );
};

export default EquipDetailCard;
