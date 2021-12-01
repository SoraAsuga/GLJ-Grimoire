import {
  DeploymentUnitOutlined,
  EditOutlined,
  SmileOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons/lib/icons';
import { Button, Cascader, Col, InputNumber, Row, Slider } from 'antd';
import React, { FC, useState } from 'react';

import SplitLine from '../../components/SplitLine';
import './index.less';

const RoleAbility: FC = () => {
  /** 属性名称与值的状态 */
  const [ability, setAbility] = useState([
    { name: 'STR', value: 1 },
    { name: 'DEX', value: 1 },
    { name: 'INT', value: 1 },
    { name: 'VIT', value: 1 },
    { name: 'AGI', value: 1 },
  ]);

  /** 特殊能力的值与状态 */
  const [ex, setEx] = useState(['无', 1]);

  /** 特殊能力选择项 */
  const options = [
    {
      value: '无',
      label: '无',
    },
    {
      value: 'TEC',
      label: 'TEC',
    },
    {
      value: 'MEN',
      label: 'MEN',
    },
    {
      value: 'LUK',
      label: 'LUK',
    },
    {
      value: 'CRT',
      label: 'CRT',
    },
  ];

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

  /** 改变 ex 的值 */
  const changeEx = (value) => {
    setEx([ex[0], value]);
  };

  /** 改变 ex 的名称 */
  const changeExName = (value) => {
    value[1] = ex[1];
    setEx(value);
  };

  /** 动态生成能力值标签 */
  const abilityInputTab = () => {
    return ability.map((item) => {
      const { name, value } = item;
      if (name) {
        return (
          <section key={name} className="edit-role__ability">
            <DeploymentUnitOutlined style={{ marginRight: '5px' }} />
            <span className="edit-role__ability-name">{name}</span>
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
    <section className="edit-role__page-ability">
      <SplitLine icon={<StarOutlined />} title="角色名称" />
      <span>
        <SmileOutlined style={{ marginRight: '5px' }} />
        角色名：缘染之空
      </span>
      <EditOutlined style={{ marginLeft: '50px' }} />
      <SplitLine icon={<StarOutlined />} title="角色名称" />
      <span>
        <UserOutlined style={{ marginRight: '5px' }} />
        角色等级{' '}
        <InputNumber
          min={1}
          max={240}
          defaultValue={1}
          onChange={() => {}}
          style={{ marginLeft: '10px' }}
        />
      </span>
      <SplitLine icon={<StarOutlined />} title="角色能力" />
      {abilityInputTab()}
      <section key={name} className="edit-role__ability">
        <DeploymentUnitOutlined style={{ marginRight: '5px' }} />
        <span className="edit-role__ability-name">
          <Cascader
            options={options}
            onChange={changeExName}
            defaultValue={['无']}
            allowClear={false}
            style={{ marginLeft: '10px', fontSize: '14px', width: '80px' }}
          />
        </span>
        <Row className="ability-input">
          <Col span={12}>
            <Slider
              min={1}
              max={255}
              onChange={changeEx}
              disabled={ex[0] === '无'}
              value={typeof ex[1] === 'number' ? ex[1] : 1}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={510}
              style={{ margin: '0 16px' }}
              value={ex[1]}
              disabled={ex[0] === '无'}
              onChange={changeEx}
            />
          </Col>
        </Row>
      </section>
    </section>
  );
};

export default RoleAbility;
