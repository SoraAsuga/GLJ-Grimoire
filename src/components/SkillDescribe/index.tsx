import { EWeaponType } from '@/typings/equipment';
import { BookOutlined } from '@ant-design/icons';
import React, { FC, Fragment, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { currentSkillState } from '@/store/current-skill';

import './index.less';
import useRefState from '@/hooks/useRefState';
import { InputNumber, Select } from 'antd';
import {
  ESkillEffectType,
  IDescribeBlockProps,
  IDescribeDescProps,
  IDescribeSkillData,
  IDescribeTableProps,
  IDescription,
} from './types';
import { SkillData } from './skillData';

const { Option } = Select;

interface IDescribe {
  item: IDescribeSkillData;
}

const Describe: FC<IDescribe> = (props) => {
  const { item } = props;
  const skillData = item;

  const [state, setState] = useRefState({
    level: 1,
    roleLevel: 1,
    weaponType: skillData.neededMainWeapon[0],
    secondaryWeaponType: skillData.neededSecondaryWeapon[0],
  });

  const stateGetter = (name: string) => {
    console.log('stateGetter', state);
    return state[name];
  };

  const descInterpreter = (description: IDescription) => {
    const { raw, values } = description;

    const slice = raw.split(/[{}]/);

    function interpretValue(expName: string) {
      const { args, fn } = values[expName];
      const interpretedArgs = args.map((name) => stateGetter(name));
      return fn(...interpretedArgs);
    }

    return slice.map((str, i) => {
      if (str.startsWith('expression:')) {
        const expName = str.replace('expression:', '');
        return <Fragment key={i}>{interpretValue(expName)}</Fragment>;
      }

      return <Fragment key={i}>{str}</Fragment>;
    });
  };

  /** 生成表格样式的效果展示 */
  const renderTableItem = (props: IDescribeTableProps) => {
    console.log('renderTableItem', stateGetter('level'));

    const { items } = props;

    return items.map((item) => (
      <div className="describe-attribute__item" key={item.name}>
        <div className="describe-attribute__item-icon ">{item.icon}</div>
        <div className="describe-attribute__item-title">{item.name}</div>
        <div className="describe-attribute__item-content">{descInterpreter(item.desc)}</div>
      </div>
    ));
  };

  /** 生成描述样式的效果展示 */
  const renderDescItem = (props: IDescribeDescProps) => {
    const { items } = props;
    const renderItem = () =>
      items.map((item) => (
        <Fragment key={item.name}>
          <div className="describe-effect__inertia-title">{item.name}</div>
          <div className="describe-effect__inertia-value">{item.value}</div>
        </Fragment>
      ));

    return (
      <div className="describe-effect">
        <div className="describe-effect__inertia">{renderItem()}</div>
      </div>
    );
  };

  /** 生成块样式的效果展示 */
  const renderBlockItem = (props: IDescribeBlockProps) => {
    const { name, type, properties, effects } = props;

    const renderType = () => {
      return type.map((typeName) => <span key={typeName}>{typeName}</span>);
    };

    const renderProperties = () => {
      return properties.map((property) => (
        <div key={property.desc}>
          {property.icon}
          <span>{property.desc}</span>
        </div>
      ));
    };

    const renderEffects = () => {
      return effects.map((description) => <p>{descInterpreter(description)}</p>);
    };

    return (
      <section>
        <header>
          <span>{name}</span>
          <span>{renderType()}</span>
        </header>
        <p>{renderProperties()}</p>
        <section>{renderEffects()}</section>
      </section>
    );
  };

  /** 抽象不同样式对应的渲染函数 */
  const skillEffectsHandler = useMemo(
    () => ({
      [ESkillEffectType.Table]: renderTableItem,
      [ESkillEffectType.Desc]: renderDescItem,
      [ESkillEffectType.Block]: renderBlockItem,
    }),
    [],
  );

  const renderSkillEffects = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return skillData.effects.map(({ type, data }) => skillEffectsHandler[type](data));
  };

  /** 动态生成选项 */
  const menuItem = (item: EWeaponType[]) => {
    return item.map((item) => (
      <Option value={item} key={item}>
        {item}
      </Option>
    ));
  };

  return (
    <section className="describe">
      <header className="describe-header">
        <BookOutlined className="describe-header_icon" />
        <span className="describe-header_title">{skillData.name}</span>
      </header>
      {renderSkillEffects()}
      <section className="describe-menu">
        <div className="describe-menu__item">
          主手武器{' '}
          <Select
            defaultValue={state.weaponType}
            style={{ width: 120 }}
            onChange={() => {}}
            bordered={false}
          >
            {menuItem(skillData.neededMainWeapon)}
          </Select>
        </div>
        <div className="describe-menu__item">
          副手武器{' '}
          <Select
            defaultValue={state.secondaryWeaponType}
            style={{ width: 120 }}
            onChange={() => {}}
            bordered={false}
          >
            {menuItem(skillData.neededSecondaryWeapon)}
          </Select>
        </div>
        <div className="describe-menu__item">
          技能等级{' '}
          <InputNumber
            size="small"
            min={1}
            max={10}
            defaultValue={10}
            onChange={(value) => setState({ level: value })}
          />
        </div>
        <div className="describe-menu__item">
          角色等级{' '}
          <InputNumber
            size="small"
            min={1}
            max={240}
            defaultValue={240}
            onChange={(value) => setState({ roleLevel: value })}
          />
        </div>
      </section>
    </section>
  );
};

export default Describe;
