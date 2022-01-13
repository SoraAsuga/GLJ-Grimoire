import { ENumericalNumber } from '@/constants/numericalValue';
import { EWeaponType } from '@/typings/equipment';
import {
  AimOutlined,
  AlertOutlined,
  BuildOutlined,
  BulbOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  FireOutlined,
  InfoCircleOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { values } from 'lodash';
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
                    args: [],
                    fn: () => {
                      return '随武器射程';
                    },
                  },
                },
              },
            },
            {
              name: '技能类型',
              icon: <QuestionCircleOutlined />,
              desc: {
                raw: '{expression:type}',
                values: {
                  type: {
                    args: [],
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
                    args: [],
                    fn: () => {
                      return '可以放入连击';
                    },
                  },
                },
              },
            },
            {
              name: '动作速度',
              icon: <DashboardOutlined />,
              desc: {
                raw: '{expression:action}',
                values: {
                  action: {
                    args: [],
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
          icon: <BulbOutlined />,
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
                      case EWeaponType.TwoHandedSword:
                        return 250 + level * 5;
                      default:
                        return 150 + level * 5;
                    }
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '该技能伤害 倍率增加100%';
                      default:
                        return '该技能伤害 必定命中';
                    }
                  },
                },
              },
            },
            {
              name: '额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: [],
                  fn: () => {
                    return '施放成功后获得 迅速 效果';
                  },
                },
              },
            },
          ],
        },
      },
      {
        type: ESkillEffectType.Block,
        data: {
          icon: <BulbOutlined />,
          name: '迅速',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '释放下一个技能前',
            },
          ],
          effects: [
            {
              type: [ENumericalNumber.ATTACK_MP_RECOVERY],
              raw: '攻击MP回复 + {expression:recover}',
              values: {
                recover: {
                  args: ['level'],
                  fn: (level: number) => {
                    return level * 2;
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: [],
                  fn: () => {
                    return '下一个技能动作时间减少 50%';
                  },
                },
              },
            },
          ],
        },
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '迅速 效果会覆盖所有会影响动作时间的加成',
          },
        ],
      },
    ],
  },
];
