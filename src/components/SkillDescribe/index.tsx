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
import React, { FC } from 'react';

import './index.less';

const Describe: FC = () => {
  const skillData = {
    name: '威力打击',
    needMainWeapon: EWeaponType.OneHandedSword,
    effect: [
      {
        weaponType: [EWeaponType.OneHandedSword, EWeaponType.DualSword],
        attribute: [
          { name: 'MP消耗', value: 100, icon: <ExperimentOutlined /> },
          { name: '射程', value: '同施放武器', icon: <AimOutlined /> },
          { name: '技能类型', value: '瞬发', icon: <BuildOutlined /> },
          { name: '连击', value: '可以放入连击', icon: <HourglassOutlined /> },
          { name: '动作时间', value: '快', icon: <QuestionCircleOutlined /> },
          { name: '咏唱时间', value: '0S', icon: <SyncOutlined /> },
        ],
        name: '伤害',
        icon: <FireOutlined />,
        inertia: ['物理', '物理'],
        damageType: '物理伤害',
        damageNumber: { min: 55, max: 100 },
        damageMultiply: { min: 105, max: 150 },
        additionalEffects: [{ name: '命中成功后' }],
      },
      {
        weaponType: [EWeaponType.TwoHandedSword],
        attribute: [
          { name: 'MP消耗', value: 100, icon: <ExperimentOutlined /> },
          { name: '射程', value: '同施放武器', icon: <AimOutlined /> },
          { name: '技能类型', value: '瞬发', icon: <BuildOutlined /> },
          { name: '连击', value: '可以放入连击', icon: <HourglassOutlined /> },
          { name: '动作时间', value: '快', icon: <QuestionCircleOutlined /> },
          { name: '咏唱时间', value: '0S', icon: <SyncOutlined /> },
        ],
        name: '伤害',
        icon: <FireOutlined />,
        inertia: ['物理', '物理'],
        damageType: '物理伤害',
        damageNumber: { min: 55, max: 100 },
        damageMultiply: { min: 105, max: 150 },
        additionalEffects: [{ name: '命中成功后' }],
      },
    ],
    inertia: ['物理', '物理'],
  };

  /** 动态生成技能属性 */
  const attributeItem = () => {
    const currentSkill = skillData.effect.filter((item) =>
      item.weaponType.filter((item) => item === EWeaponType.OneHandedSword),
    )[0];
    return currentSkill.attribute.map((item) => (
      <div className="describe-attribute__item" key={item.name}>
        <div className="describe-attribute__item-icon ">{item.icon}</div>
        <div className="describe-attribute__item-title">{item.name}</div>
        <div className="describe-attribute__item-content">{item.value}</div>
      </div>
    ));
  };

  /** 动态生成技能效果 */
  const skillEffectItem = () => {
    return (
      <div className="describe-effect">
        {skillData.inertia && (
          <div className="describe-effect__inertia">
            <div className="describe-effect__inertia-title">伤害惯性</div>
            <div className="describe-effect__inertia-value">{skillData.inertia[0]}</div>
            <div className="describe-effect__inertia-title">造成惯性</div>
            <div className="describe-effect__inertia-value">{skillData.inertia[1]}</div>
          </div>
        )}
        <div></div>
      </div>
    );
  };

  return (
    <section className="describe">
      <header className="describe-header">
        <BookOutlined className="describe-header_icon" />
        <span className="describe-header_title">{skillData.name}</span>
      </header>
      <div className="describe-attribute">{attributeItem()}</div>
      {skillEffectItem()}
    </section>
  );
};

export default Describe;
