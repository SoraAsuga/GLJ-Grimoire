import { EWeaponType } from '@/typings/equipment';
import {
  ExperimentOutlined,
  AimOutlined,
  BuildOutlined,
  HourglassOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
  FireOutlined,
} from '@ant-design/icons';
import React from 'react';
import { atom, selector } from 'recoil';
import { SkillListItem } from './types';

export const skillDataState = atom({
  key: 'skill-data/list',
  default: [
    {
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
    },
  ],
});
