import { PicLeftOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import React, { FC } from 'react';
import SplitLine from '../../components/SplitLine';
import { IProps } from '../types';

import './index.less';

const RoleData: FC<IProps> = (props) => {
  const { id } = props;
  const ability = [
    [
      { name: 'STR', value: 1 },
      { name: 'DEX', value: 1 },
      { name: 'INT', value: 1 },
      { name: 'VIT', value: 1 },
      { name: 'AGI', value: 1 },
    ],
    [
      { name: 'HP上限', value: 1000 },
      { name: 'MP上限', value: 100 },
      { name: 'HP自然回复', value: 1 },
      { name: 'MP自然回复', value: 1 },
      { name: 'MP攻击回复', value: 1 },
    ],
    [
      { name: 'ATK', value: 1 },
      { name: 'MATK', value: 1 },
      { name: '稳定率', value: 100 + '%' },
      { name: '魔法稳定率', value: 100 + '%' },
      { name: '暴击率', value: 1 },
      { name: '暴击伤害', value: 1 },
    ],
    [
      { name: 'DEF', value: 1 },
      { name: 'MDEF', value: 1 },
      { name: '物理抗性', value: 1 + '%' },
      { name: '魔法抗性', value: 1 + '%' },
      { name: '受物理伤害', value: 1 + '%' },
      { name: '受魔法伤害', value: 1 + '%' },
      { name: '受百分比伤害', value: 1 + '%' },
    ],
    [
      { name: '命中', value: 1 },
      { name: '回避', value: 1 },
      { name: '攻击速度', value: 1 },
      { name: '咏唱速度', value: 1 },
      { name: '动作时间', value: 100 + '%' },
      { name: '咏唱时间', value: 100 + '%' },
    ],
    [
      { name: '拔刀伤害', value: 100 + '%' },
      { name: '近距离威力', value: 100 + '%' },
      { name: '远距离威力', value: 100 + '%' },
      { name: '伤害倍率', value: 100 + '%' },
    ],
    [{ name: '仇恨值', value: 100 + '%' }],
    [
      { name: '掉宝率', value: 100 + '%' },
      { name: '复活时间', value: 300 },
    ],
  ];

  const dataItem = (title: string, array: any[]) => {
    return (
      <div className="role-data">
        <header className="role-data__header">{title}</header>
        <div className="role-data__content">
          {array.map((item) => {
            const { name, value } = item;
            return (
              <Tooltip
                key={name + 'data'}
                title="prompt text"
                color={'#4e8eee'}
                className="role-data__item"
              >
                <span className="role-data__item-name">{name}</span>
                <span className="role-data__item-value">{value}</span>
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="edit-role__page-data">
      <div className="edit-role__page-field">
        {dataItem('角色能力', ability[0])}
        {dataItem('HP、MP', ability[1])}
        {dataItem('攻击属性', ability[2])}
        {dataItem('特殊加成', ability[6])}
      </div>
      <div className="edit-role__page-line"></div>
      <div className="edit-role__page-field">
        {dataItem('防御属性', ability[3])}
        {dataItem('命中、回避、速度', ability[4])}
        {dataItem('伤害修正', ability[5])}
      </div>
    </section>
  );
};
export default RoleData;
