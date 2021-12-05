import _ from 'lodash';
import { getRoleSelector, roleSimulationState } from '@/store/role-simulation';
import {
  DeploymentUnitOutlined,
  EditOutlined,
  SmileOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons/lib/icons';
import { Cascader, Col, InputNumber, Row, Slider } from 'antd';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ENumericalNumber } from '@/constants/numericalValue';

import { IRoleAbility, IRoleAbilityEx } from '@/typings/role';
import SplitLine from '../../components/SplitLine';
import { IProps } from '../types';
import './index.less';

const MIN_VALUE = 1;
const MAX_VALUE = 510;

interface IAbilityExOption {
  label: string;
  value: IRoleAbilityEx['type'];
}

const RoleAbility: FC<IProps> = (props) => {
  /** 当前角色ID */
  const { id } = props;
  /** 角色 */
  const roleSelector = useMemo(() => getRoleSelector(id), [id]);
  const [role, setRole] = useRecoilState(roleSelector);

  /** 属性名称与值的状态 */
  const [ability, setAbility] = useState(role.ability);

  /** 特殊能力的值与状态 */
  const [ex, setEx] = useState<IRoleAbilityEx>(role.abilityEx);

  /** 特殊能力选择项 */
  const options: IAbilityExOption[] = [
    {
      value: null,
      label: '无',
    },
    {
      value: ENumericalNumber.TEC,
      label: 'TEC',
    },
    {
      value: ENumericalNumber.MEN,
      label: 'MEN',
    },
    {
      value: ENumericalNumber.LUK,
      label: 'LUK',
    },
    {
      value: ENumericalNumber.CRT,
      label: 'CRT',
    },
  ];

  const setStoreRole = useCallback(_.debounce(setRole, 100), []);

  /** 改变能力数值 */
  const changeValue = (name: string, value: number) => {
    const ability = { ...role.ability, [name.toLowerCase()]: value };
    setAbility(ability);
    setStoreRole({ ...role, ability });
  };

  /** 改变 ex 的值 */
  const changeEx = useCallback(
    (value: number) => {
      const abilityEx = { ...ex, value };
      setEx(abilityEx);
      setStoreRole({ ...role, abilityEx });
    },
    [ex],
  );

  /** 改变 ex 的名称 */
  const changeExName = useCallback(
    (value: IRoleAbilityEx['type']) => {
      const abilityEx = { ...ex, type: value };
      setEx(abilityEx);
      setStoreRole({ ...role, abilityEx });
    },
    [ex],
  );

  /** 动态生成能力值标签 */
  const abilityInputTab = () => {
    return Object.entries(ability).map(([name, value]) => {
      if (name !== 'ex') {
        return (
          <section key={name} className="edit-role__ability">
            <DeploymentUnitOutlined style={{ marginRight: '5px' }} />
            <span className="edit-role__ability-name">{name.toUpperCase()}</span>
            <Row className="ability-input">
              <Col span={12}>
                <Slider
                  min={1}
                  max={510}
                  onChange={changeValue.bind(this, name)}
                  value={typeof value === 'number' ? value : 1}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={510}
                  style={{ margin: '0 16px' }}
                  value={value}
                  onChange={changeValue.bind(this, name)}
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
      <div className="page-ability__container" style={{ marginTop: '0' }}>
        <SplitLine icon={<StarOutlined />} title="角色名称" />
        <span>
          <SmileOutlined style={{ marginRight: '5px' }} />
          角色名：缘染之空
        </span>
        <EditOutlined style={{ marginLeft: '50px' }} />
      </div>
      <div className="page-ability__container">
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
      </div>
      <div className="page-ability__container">
        <SplitLine icon={<StarOutlined />} title="角色能力" />
        {abilityInputTab()}
        <section key={name} className="edit-role__ability">
          <DeploymentUnitOutlined style={{ marginRight: '5px' }} />
          <span className="edit-role__ability-name">
            <Cascader
              options={options}
              onChange={(value) => changeExName(value as unknown as IRoleAbilityEx['type'])}
              defaultValue={[null]}
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
                disabled={ex.type === null}
                value={ex.value || 1}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={510}
                style={{ margin: '0 16px' }}
                disabled={ex.type === null}
                value={ex.value || 1}
                onChange={changeEx}
              />
            </Col>
          </Row>
        </section>
      </div>
    </section>
  );
};

export default RoleAbility;
