import {
  DeploymentUnitOutlined,
  EditOutlined,
  SmileOutlined,
  StarOutlined,
} from '@ant-design/icons/lib/icons';
import { Button, Col, InputNumber, Row, Slider } from 'antd';
import React, { FC, useState } from 'react';

import SplitLine from '../../components/SplitLine';
import './index.less';

const RoleAbility: FC = () => {
  const [ability, setAbility] = useState([
    { name: 'STR', value: 1 },
    { name: 'DEX', value: 1 },
    { name: 'INT', value: 1 },
    { name: 'VIT', value: 1 },
    { name: 'AGI', value: 1 },
  ]);
  const [ex, setEx] = useState(['无', 1]);

  /** 改变能力数值 */
  const changeValue = (name: string) => (value: number) => {
    const newAbility = ability.map((item) => {
      if (item.name === name) {
        return { name, value };
      }
      return item;
    });
    setAbility(newAbility);
  };

  /** 动态生成能力值标签 */
  const abilityInputTab = () => {
    return ability.map((item) => {
      const { name, value } = item;
      if (name) {
        return (
          <section key={name} className="Edit-role__ability">
            <DeploymentUnitOutlined style={{ marginRight: '5px' }} />
            <span className="Edit-role__ability-name">{name}</span>
            <Row className="ability-input">
              <Col span={12}>
                <Slider
                  min={1}
                  max={510}
                  onChange={changeValue(name)}
                  value={typeof value === 'number' ? value : 1}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={510}
                  style={{ margin: '0 16px' }}
                  value={value}
                  onChange={changeValue(name)}
                />
              </Col>
            </Row>
          </section>
        );
      }
    });
  };

  return (
    <section className="Edit-role__page">
      <SplitLine icon={<StarOutlined />} title="角色名称" />
      <span>
        <SmileOutlined style={{ marginRight: '5px' }} />
        角色名：缘染之空
      </span>
      <EditOutlined style={{ marginLeft: '50px' }} />
      <SplitLine icon={<StarOutlined />} title="角色能力" />
      {abilityInputTab()}
    </section>
  );
};

export default RoleAbility;
