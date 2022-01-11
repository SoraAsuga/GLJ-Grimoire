import { EWeaponType } from '@/typings/equipment';
import {
  AimOutlined,
  AppstoreOutlined,
  BuildOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  FireOutlined,
} from '@ant-design/icons';
import React from 'react';
import { ESkillEffectType, IDescribeSkillData } from './types';

export const SkillData: IDescribeSkillData[] = [
  {
    name: '横扫千军',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [EWeaponType.Any],
    effects: [
      {
        type: ESkillEffectType.Table,
        data: {
          items: [
            {
              name: 'MP消耗',
              icon: <ExperimentOutlined />,
              desc: {
                raw: '{expression:mp}',
                values: {
                  mp: {
                    args: ['level'],
                    fn: (level) => {
                      return level < 6 ? 300 : 200;
                    },
                  },
                },
              },
            },
            {
              name: '射程',
              icon: <AimOutlined />,
              desc: {
                raw: '{expression:range}',
                values: {
                  range: {
                    args: [''],
                    fn: () => {
                      return '随武器射程';
                    },
                  },
                },
              },
            },
            {
              name: '技能类型',
              icon: <AppstoreOutlined />,
              desc: {
                raw: '{expression:type}',
                values: {
                  type: {
                    args: [''],
                    fn: () => {
                      return '瞬发';
                    },
                  },
                },
              },
            },
            {
              name: '连击',
              icon: <BuildOutlined />,
              desc: {
                raw: '{expression:combo}',
                values: {
                  combo: {
                    args: [''],
                    fn: () => {
                      return '可以放入连击';
                    },
                  },
                },
              },
            },
            {
              name: '动作时间',
              icon: <DashboardOutlined />,
              desc: {
                raw: '{expression:action}',
                values: {
                  action: {
                    args: [''],
                    fn: () => {
                      return '稍慢';
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
  },
];
