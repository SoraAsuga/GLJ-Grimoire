import { spawn } from 'child_process';
import { EWeaponType } from '@/typings/equipment';
import {
  AimOutlined,
  BookOutlined,
  BuildOutlined,
  ExperimentOutlined,
  FireOutlined,
  HourglassOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { divide } from 'lodash';
import React, { FC, Fragment, useCallback, useMemo, useRef, useState } from 'react';

import './index.less';
import useRefState from '@/hooks/useRefState';
import {
  ESkillEffectType,
  IDescribeBlockProps,
  IDescribeDescProps,
  IDescribeSkillData,
  IDescribeTableProps,
  IDescription,
} from './types';

const Describe: FC = () => {
  const skillData: IDescribeSkillData = {
    name: '威力打击',
    neededMainWeapon: [EWeaponType.OneHandedSword],
    effects: [
      {
        type: ESkillEffectType.Table,
        data: {
          items: [
            {
              name: 'MP消耗',
              icon: <AimOutlined></AimOutlined>,
              desc: {
                raw: '{expression:mp}',
                values: {
                  mp: {
                    args: ['level'],
                    fn: (level) => {
                      return level < 5 ? 300 : 600;
                    },
                  },
                },
              },
            },
          ],
        },
      },
      {
        type: ESkillEffectType.Desc,
        data: {
          items: [
            {
              name: '造成惯性',
              value: '物理',
            },
            {
              name: '伤害惯性',
              value: '物理',
            },
          ],
        },
      },
      {
        type: ESkillEffectType.Block,
        data: {
          name: '伤害',
          type: ['物理伤害'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '火属性',
            },
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x {expression:magnification}%',
              values: {
                constant: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      default:
                        return 200 + level * 10;
                    }
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      default:
                        return 150 + level * 5;
                    }
                  },
                },
              },
            },
          ],
        },
      },
    ],
  };

  const [state, setState] = useRefState({
    level: 1,
    roleLevel: 1,
    weaponType: skillData.neededMainWeapon[0],
    secondaryWeaponType: EWeaponType.EmptyHanded,
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

  return (
    <section className="describe">
      <header className="describe-header">
        <BookOutlined className="describe-header_icon" />
        <span className="describe-header_title">{skillData.name}</span>
      </header>
      {renderSkillEffects()}
      <p>
        技能等级: {state.level}
        <button onClick={() => setState({ level: Math.max(1, state.level - 1) })}>-</button>
        <button onClick={() => setState({ level: Math.min(10, state.level + 1) })}>+</button>
      </p>
    </section>
  );
};

export default Describe;
