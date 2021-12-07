import {
  RocketOutlined,
  CloseOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  FileDoneOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useState } from 'react';
import { IProps } from '../types';

import './index.less';

const RoleEquip: FC<IProps> = (props) => {
  const type = [
    '主手武器',
    '副手武器',
    '身体防具',
    '追加装备',
    '特殊装备',
    '时装一',
    '时装二',
    '时装三',
  ];
  const [show, setShow] = useState(false);

  /** 装备选择页面显示 */
  const changeShow = (type?) => () => {
    if (type) {
      console.log('true: ', type);
      setShow(!show);
    } else {
      console.log('false: ', type);
      setShow(!show);
    }
  };

  /** 动态生成装备卡 */
  const equipItem = () =>
    type.map((item) => {
      return (
        <div className="role-equip__card" key={item}>
          <header className="role-equip__card-header">
            <RocketOutlined />
            <span className="card-header__title">{item}</span>
            <button className="card-header__btn">
              <CloseOutlined />
            </button>
            <button className="card-header__btn" onClick={changeShow(item)}>
              <MenuUnfoldOutlined />
            </button>
          </header>
          <section className="role-equip__content">
            <button className="role-equip__content-details" onClick={changeShow(item)}>
              <QuestionOutlined className="content-details__icon" />
              <span className="content-details__text">无装备 OvO</span>
            </button>
          </section>
        </div>
      );
    });

  return (
    <section className="edit-role__page-equip">
      {equipItem()}
      <Modal
        visible={show}
        onCancel={changeShow()}
        footer={null}
        className="role-equip__list"
        getContainer={false}
      >
        <header className="role-equip__list-header">
          <div className="list-header__title">
            <RocketOutlined style={{ padding: '5px' }} className="list-header__title-icon" />
            <span className="list-header__title-text">装备清单</span>
          </div>
          <div className="list-header__menu">
            <button>
              <FileDoneOutlined className="btn-icon" />
              新增装备
            </button>
            <button>
              <FileAddOutlined className="btn-icon" />
              自定装备
            </button>
          </div>
        </header>
        <section className="role-equip__list-content">
          <div></div>
          <div></div>
        </section>
      </Modal>
    </section>
  );
};

export default RoleEquip;
