import { ENumericalNumber } from '@/components/numericalValue';
import { EWeaponType } from '@/typings/equipment';
import {
  AimOutlined,
  AlertOutlined,
  AppstoreOutlined,
  BuildOutlined,
  BulbOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  FireOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import React from 'react';
import { ESkillEffectType, IDescribeSkillData } from '../../constants/types';

export const SkillData: IDescribeSkillData[] = [
  {
    name: '威力攻击',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 100;
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
                      return '同施放武器';
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
                      return '快';
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
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x {expression:magnification}%',
              values: {
                constant: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 50 + level * 5;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 150 + level * 5;
                      default:
                        return 100 + level * 5;
                    }
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '该技能伤害倍率增加 50';
                      default:
                        return '该技能造成 胆怯 概率增加 50%';
                    }
                  },
                },
              },
            },
            {
              name: '技能命中后',
              icon: <AlertOutlined />,
              raw: '有 {expression:effect}% 概率使目标陷入 胆怯',
              values: {
                effect: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 5 * level;
                      default:
                        return 50 + 5 * level;
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
  {
    name: '迅捷攻击',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: ['weaponType'],
                    fn: (weaponType: EWeaponType) => {
                      switch (weaponType) {
                        case EWeaponType.TwoHandedSword:
                          return 200;
                        default:
                          return 100;
                      }
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
                      return '同施放武器';
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
                      return '极快';
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
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x {expression:magnification}%',
              values: {
                constant: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 150 + level * 5;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 200 + level * 10;
                      default:
                        return 150 + level * 10;
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
              raw: '该技能总行动速度 +{expression:effect}%',
              values: {
                effect: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 5 * level;
                  },
                },
              },
            },
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '该技能伤害倍率增加 50';
                      default:
                        return '该技能 MP消耗 减少100';
                    }
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
          name: '迅捷',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '命中成功后',
            },
          ],
          effects: [
            {
              type: [ENumericalNumber.CRITICAL_RATE],
              raw: '接下来 {expression:time} 秒内，暴击率 + {expression:crt}',
              values: {
                time: {
                  args: ['level'],
                  fn: (level: number) => {
                    if (level > 5) {
                      return 10;
                    }
                    return 5;
                  },
                },
                crt: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 50;
                      default:
                        return 25;
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
  {
    name: '横扫千军',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                      return '同施放武器';
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
                        return '该技能伤害 倍率增加100';
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
  {
    name: '爆气斩',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 500;
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
                      return '稍快';
                    },
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
          name: '爆气',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '释放成功后',
            },
          ],
          effects: [
            {
              raw: '{expression:recover}',
              values: {
                recover: {
                  args: [],
                  fn: () => {
                    return '释放成功后接下来 600秒内 前10次 一般攻击 变为 强化攻击；第11次一般攻击变为发动二连闪击及剑光一闪，并结束状态';
                  },
                },
              },
            },
          ],
          additional: [
            {
              type: [ENumericalNumber.ATTACK_MP_RECOVERY],
              name: '额外效果',
              icon: <AlertOutlined />,
              raw: '攻击MP恢复+{expression:effect}',
              values: {
                effect: {
                  args: ['level', 'secondaryWeaponType'],
                  fn: (level: number, secondaryWeaponType: EWeaponType) => {
                    switch (secondaryWeaponType) {
                      case EWeaponType.OneHandedSword:
                        return 1.25 * level;
                      default:
                        return 2.5 * level;
                    }
                  },
                },
              },
            },
            {
              type: [ENumericalNumber.DEF, ENumericalNumber.MDEF, ENumericalNumber.DODGE],
              name: '额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: [],
                  fn: () => {
                    return 'DEF，MDEF,回避值强制固定为0';
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
          name: '强化攻击',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '状态期间',
            },
          ],
          effects: [
            {
              raw: '普通攻击常数 + {expression:constant}  普通攻击倍率 + {expression:magnification}',
              values: {
                constant: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 10 * level;
                  },
                },
                magnification: {
                  args: ['level', 'weaponType'],
                  fn: (level: number, weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 10 + 4 * level;
                      default:
                        return 10 + 9 * level;
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
                  args: ['secondaryWeaponType'],
                  fn: (secondaryWeaponType: EWeaponType) => {
                    switch (secondaryWeaponType) {
                      case EWeaponType.OneHandedSword:
                        return '改变攻击动作，单次伤害被分成4次斩击(双剑仅普攻的第一击受影响被分为4次，故总段数为6~7次)';
                      default:
                        return '改变攻击动作，单次伤害被分成4次斩击';
                    }
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
          name: '二连闪击',
          type: ['物理伤害'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x {expression:magnification}% x 2次',
              values: {
                constant: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 300 + level * 20;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 150 + level * 5;
                      default:
                        return 50 + level * 5;
                    }
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
          name: '剑光一闪',
          type: ['物理伤害'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x {expression:magnification}% x 2次',
              values: {
                constant: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 300 + level * 20;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 250 + level * 5;
                      default:
                        return 550 + level * 5;
                    }
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
            content: '受到任意异常状态，会使 爆气 立刻结束，狂战士之怒 将可避免这一效果',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '攻击被 miss 或 闪躲 时，技能剩余次数则不会减少',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content:
              '第11段攻击视作一次 技能攻击，被分成 二连闪击 及 剑光一闪 共三次伤害，这三次伤害皆为 必定命中',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content:
              '二连闪击 及 剑光一闪 共用一次惯性判定、会受「下个技能受益」类的效果加成，也会令持续时间到下个技能的状态消失。',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '剑光一闪 不受 行动速度 影响、也不受 大师级剑术 加成',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '连击效果不会影响此技能的伤害',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '效果持续期间，此技能无法再次使用',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '双剑 使用时，只加成主手ATK计算的部分',
          },
        ],
      },
    ],
  },
  {
    name: '流星坠击',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 600;
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
                      return '同施放武器';
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
                      return '一般';
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
          name: '流星一击',
          type: ['物理伤害'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x | {expression:magnification} |%',
              values: {
                constant: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 400 + level * 20;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 600 + level * 20 + ' + 基础STR x 10%';
                      default:
                        return 400 + level * 20;
                    }
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '该技能伤害倍率增加 200，且伤害倍率随 基础STR 增长而增加';
                      default:
                        return '该技能造成 眩晕 概率增加 75%';
                    }
                  },
                },
              },
            },
            {
              name: '技能命中后',
              icon: <AlertOutlined />,
              raw: '有 {expression:effect}% 概率使目标陷入 眩晕',
              values: {
                effect: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 2.5 * level;
                      default:
                        return 75 + 2.5 * level;
                    }
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
          name: '星流爆破',
          type: ['物理伤害 范围伤害'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK | x | {expression:magnification} |%',
              values: {
                magnification: {
                  args: ['weaponType', 'secondaryWeaponType', 'level'],
                  fn: (
                    weaponType: EWeaponType,
                    secondaryWeaponType: EWeaponType,
                    level: number,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                        return 100 + 50 * level + ' + 基础DEX x 50%';
                      }
                    }
                    return 100 + 50 * level;
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.OneHandedSword:
                        return '该技能伤害倍率随 基础DEX 增长而增加';
                      default:
                        return '无';
                    }
                  },
                },
              },
            },
            {
              name: '滞空期间',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: [],
                  fn: () => {
                    return '自身处于 无敌 状态';
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
            content: '释放技能会跃向空中，对目标发动 流星一击，坠地时产生 星流爆破 造成范围伤害',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '星流爆破 的中心位置为技能发动时目标的位置，因此会因目标移动导致无伤害',
          },
        ],
      },
    ],
  },
  {
    name: '音速斩切',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 200;
                    },
                  },
                },
              },
            },
            {
              name: '射程',
              icon: <AimOutlined />,
              desc: {
                raw: '{expression:range}m',
                values: {
                  range: {
                    args: ['level', 'weaponType'],
                    fn: (level: number, weaponType: EWeaponType) => {
                      switch (weaponType) {
                        case EWeaponType.TwoHandedSword:
                          if (level < 4) {
                            return 8;
                          } else if (level < 8 && level >= 4) {
                            return 12;
                          } else if (level > 7 && level != 10) {
                            return 16;
                          }
                          return 20;
                        default:
                          if (level < 4) {
                            return 12;
                          } else if (level < 8 && level >= 4) {
                            return 16;
                          } else if (level > 7 && level != 10) {
                            return 20;
                          }
                          return 24;
                      }
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
                      return '稍快';
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
          name: '音速斩切',
          type: ['物理伤害 范围'],
          properties: [
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
                  args: ['level'],
                  fn: (level: number) => {
                    return 100 + level * 5;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 150 + level * 5;
                      default:
                        return 100 + level * 5;
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
              raw: '该技能暴击率 + {expression:effect}%',
              values: {
                effect: {
                  args: ['level', 'weaponType'],
                  fn: (level: number, weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 1 * level;
                      default:
                        return 10 * level;
                    }
                  },
                },
              },
            },
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '该技能伤害倍率增加 50';
                      default:
                        return '该技能额外暴击率提升10倍，且射程增加4m';
                    }
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
          name: '蓄势待发',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '5秒内',
            },
          ],
          effects: [
            {
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: [],
                  fn: () => {
                    return '若再次使用此技能，此技能将强化为 超音速斩切';
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
          name: '超音速斩切',
          type: ['物理伤害 范围'],
          properties: [
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
                  args: ['level'],
                  fn: (level: number) => {
                    return 100 + level * 5;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 200 + level * 10;
                      default:
                        return 300 + level * 10;
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
              raw: '该技能暴击率 + {expression:effect}%',
              values: {
                effect: {
                  args: ['level', 'weaponType'],
                  fn: (level: number, weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 1 * level;
                      default:
                        return 10 * level;
                    }
                  },
                },
              },
            },
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '该技能伤害倍率增加 100';
                      default:
                        return '该技能额外暴击率提升10倍，且射程增加4m';
                    }
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
            content:
              '释放技能会冲刺到目标跟前，并对路径上的所有敌人给予伤害，同时获得 蓄势待发 效果',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content:
              '释放 超音速斩切 将冲刺到目标身后1m处，并对路径上的所有敌人给予伤害，同时获得 蓄势待发 效果',
          },
        ],
      },
    ],
  },
  {
    name: '真空刃',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 300;
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
                      return '同施放武器';
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
                      return '快';
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
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x {expression:magnification}% x 10次',
              values: {
                constant: {
                  args: [],
                  fn: () => {
                    return 30;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 15 + level * 3;
                      default:
                        return 10 + level * 3;
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
                  args: [],
                  fn: () => {
                    return '此技能必定不暴击';
                  },
                },
              },
            },
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '该技能伤害倍率增加 5';
                      default:
                        return '无';
                    }
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
          name: '技能效果',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '命中成功后',
            },
          ],
          effects: [
            {
              type: [ENumericalNumber.CRITICAL_DAMAGE],
              raw: '接下来 {expression:time} 秒内，暴击伤害 + {expression:crt}',
              values: {
                time: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 2 + level;
                  },
                },
                crt: {
                  args: ['level', 'secondaryWeaponType', 'weaponType'],
                  fn: (
                    level: number,
                    secondaryWeaponType: EWeaponType,
                    weaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                        return 0.5 + 0.5 * level + ' + 总DEX x 2%';
                      }
                    }
                    return 0.25 + 0.25 * level + ' + 总DEX x 1%';
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['level', 'secondaryWeaponType', 'weaponType'],
                  fn: (
                    level: number,
                    secondaryWeaponType: EWeaponType,
                    weaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                        return '暴击伤害加成量翻倍';
                      }
                    }
                    return '无';
                  },
                },
              },
            },
            {
              name: '额外效果',
              icon: <AlertOutlined />,
              raw: '暴击伤害加成量，最少为1，最多为{expression:effect}',
              values: {
                effect: {
                  args: ['level', 'secondaryWeaponType', 'weaponType'],
                  fn: (
                    level: number,
                    secondaryWeaponType: EWeaponType,
                    weaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                        return 10;
                      }
                    }
                    return 5;
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: '风暴气流',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 400;
                    },
                  },
                },
              },
            },
            {
              name: '射程',
              icon: <AimOutlined />,
              desc: {
                raw: '{expression:range}m',
                values: {
                  range: {
                    args: [],
                    fn: () => {
                      return 12;
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
              value: '魔法',
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
          name: '刃风',
          type: ['物理伤害 范围'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK | x | {expression:magnification} |%',
              values: {
                magnification: {
                  args: ['weaponType', 'level', 'secondaryWeaponType'],
                  fn: (
                    weaponType: EWeaponType,
                    level: number,
                    secondaryWeaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                        return 150 + 10 * level;
                      }
                    }
                    return 250 + 10 * level + ' + 基础STR×20%';
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType', 'level', 'secondaryWeaponType'],
                  fn: (
                    weaponType: EWeaponType,
                    level: number,
                    secondaryWeaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                        return '无';
                      }
                    }
                    return '伤害倍率提升100,且伤害倍率随 基础STR 增加而提升';
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
          name: '风刃气旋',
          type: ['物理伤害 范围'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '持续3秒，每0.5秒一次伤害',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + 80 | x | {expression:magnification} |% x 6次',
              values: {
                magnification: {
                  args: ['weaponType', 'level', 'secondaryWeaponType'],
                  fn: (
                    weaponType: EWeaponType,
                    level: number,
                    secondaryWeaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                        return 50 + 5 * level + ' + 基础DEX x 20%';
                      }
                    }
                    return 50 + 5 * level;
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType', 'level', 'secondaryWeaponType'],
                  fn: (
                    weaponType: EWeaponType,
                    level: number,
                    secondaryWeaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                        return '伤害倍率随 基础DEX 增加而提升';
                      }
                    }
                    return '无';
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
            content:
              '释放技能会向目标发射一道 刃风，刃风 将在造成伤害后消失，并随即于目标位置产生 风刃气旋。',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '风刃气旋 的中心位置为 刃风 击中目标时的位置',
          },
        ],
      },
    ],
  },
  {
    name: '破坏之刃',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 300;
                    },
                  },
                },
              },
            },
            {
              name: '射程',
              icon: <AimOutlined />,
              desc: {
                raw: '{expression:range}m',
                values: {
                  range: {
                    args: [],
                    fn: () => {
                      return 7;
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
                      return '一般';
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
              desc: '受距离威力影响',
            },
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '总伤害拆分为3次伤害',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x | {expression:magnification} |%',
              values: {
                constant: {
                  args: ['level'],
                  fn: (level: number) => {
                    return level * 30;
                  },
                },
                magnification: {
                  args: ['weaponType', 'level', 'secondaryWeaponType'],
                  fn: (
                    weaponType: EWeaponType,
                    level: number,
                    secondaryWeaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType === EWeaponType.OneHandedSword) {
                        return 75 * level;
                      }
                      return 75 * level + ' + 基础DEX x 50%';
                    }
                    return 75 * level + ' + 基础STR';
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType', 'level', 'secondaryWeaponType'],
                  fn: (
                    weaponType: EWeaponType,
                    level: number,
                    secondaryWeaponType: EWeaponType,
                  ) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType === EWeaponType.OneHandedSword) {
                        return '无';
                      }
                      return '技能伤害倍率随 基础DEX 的增长而提升';
                    }
                    return '技能伤害倍率随 基础STR 的增长而提升';
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
                    return '此技能 必定暴击';
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
          name: '剑芒',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '尚未持有此效果时',
            },
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '10秒内',
            },
          ],
          effects: [
            {
              type: [ENumericalNumber.WEAPON_ATK_PERCENT],
              raw: '武器ATK + | {expression:effect} |',
              values: {
                effect: {
                  args: ['level', 'secondaryWeaponType'],
                  fn: (level: number, secondaryWeaponType: EWeaponType) => {
                    if (secondaryWeaponType === EWeaponType.Shield) {
                      return 1 * level + ' + 盾精炼值';
                    }
                    return 1 * level;
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['level', 'secondaryWeaponType'],
                  fn: (level: number, secondaryWeaponType: EWeaponType) => {
                    if (secondaryWeaponType === EWeaponType.Shield) {
                      return '根据盾牌精炼值获得额外加成量';
                    }
                    return '无';
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
                    return '获得 振奋 效果';
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
          name: '振奋',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: 'HP 恢复效果',
            },
          ],
          effects: [
            {
              type: [ENumericalNumber.WEAPON_ATK_PERCENT],
              raw: 'HP恢复 {expression:effect}',
              values: {
                effect: {
                  args: ['weaponType', 'secondaryWeaponType'],
                  fn: (weaponType: EWeaponType, secondaryWeaponType: EWeaponType) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType === EWeaponType.Shield) {
                        return '1000 + 基础VIT x 200% + 盾牌DEF';
                      }
                      return '1000 + 基础VIT x 200%';
                    }
                    return '固定值 1000';
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType', 'secondaryWeaponType'],
                  fn: (weaponType: EWeaponType, secondaryWeaponType: EWeaponType) => {
                    if (weaponType === EWeaponType.OneHandedSword) {
                      if (secondaryWeaponType === EWeaponType.Shield) {
                        return '回复量受 基础VIT 盾牌DEF 加成';
                      }
                      return '回复量受 基础VIT 加成';
                    }
                    return '无';
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
            content: '若没有处于 剑芒 状态，将获得 剑芒 状态',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content: '处于 剑芒 状态时将无法获得 剑芒 状态',
          },
        ],
      },
    ],
  },
  {
    name: '剑术要领',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
    effects: [
      {
        type: ESkillEffectType.Table,
        data: {
          items: [
            {
              name: '技能类型',
              icon: <AppstoreOutlined />,
              desc: {
                raw: '{expression:mp}',
                values: {
                  mp: {
                    args: [],
                    fn: () => {
                      return '被动';
                    },
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
          name: '被动效果',
          type: [],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '攻击加成',
            },
          ],
          effects: [
            {
              type: [ENumericalNumber.WEAPON_ATK_PERCENT, ENumericalNumber.ATK_PERCENT],
              raw: 'ATK + {expression:atk}% ，武器ATK + {expression:weaponAtk}%',
              values: {
                atk: {
                  args: ['level'],
                  fn: (level: number) => {
                    if (level <= 2) {
                      return 1;
                    } else if (level > 2 && level < 8) {
                      return 2;
                    }
                    return 3;
                  },
                },
                weaponAtk: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 3 * level;
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: '剑速提升',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
    effects: [
      {
        type: ESkillEffectType.Table,
        data: {
          items: [
            {
              name: '技能类型',
              icon: <AppstoreOutlined />,
              desc: {
                raw: '{expression:mp}',
                values: {
                  mp: {
                    args: [],
                    fn: () => {
                      return '被动';
                    },
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
          name: '被动效果',
          type: [],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '攻速加成',
            },
          ],
          effects: [
            {
              type: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
              raw: '攻击速度 + {expression:atk} ，攻击速度 + {expression:weaponAtk}%',
              values: {
                atk: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 10 * level;
                  },
                },
                weaponAtk: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 1 * level;
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: '大师级剑术',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
    effects: [
      {
        type: ESkillEffectType.Table,
        data: {
          items: [
            {
              name: '技能类型',
              icon: <AppstoreOutlined />,
              desc: {
                raw: '{expression:mp}',
                values: {
                  mp: {
                    args: [],
                    fn: () => {
                      return '被动';
                    },
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
          name: '被动效果',
          type: [],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '伤害加成',
            },
          ],
          effects: [
            {
              raw: '剑术技能中的所有攻击技能，总伤害提升 {expression:effect}%',
              values: {
                effect: {
                  args: ['level'],
                  fn: (level: number) => {
                    return 2 * level;
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: '战吼',
    neededMainWeapon: [
      EWeaponType.OneHandedSword,
      EWeaponType.TwoHandedSword,
      EWeaponType.EmptyHanded,
      EWeaponType.Bow,
      EWeaponType.BowGun,
      EWeaponType.Staff,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Halberd,
      EWeaponType.Katana,
    ],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.Katana,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 300;
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
                      return '快';
                    },
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
          name: '技能效果',
          type: ['全队加成'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '释放成功后',
            },
          ],
          effects: [
            {
              raw: '{expression:time}秒内, ATK + {expression:atk}%',
              values: {
                time: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.OneHandedSword:
                        return 65 + level;
                      default:
                        return 15 + level;
                    }
                  },
                },
                atk: {
                  args: ['weaponType', 'level'],
                  fn: (weaponType: EWeaponType, level: number) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 5 + level;
                      default:
                        return level;
                    }
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '技能加成提升 5%';
                      case EWeaponType.OneHandedSword:
                        return '技能持续时间增加 50秒';
                      default:
                        return '无';
                    }
                  },
                },
              },
            },
            {
              name: '释放成功后',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: [],
                  fn: () => {
                    return '消除所有友方的 畏惧 状态';
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
            content: '学习骑士精神中的骑士勇姿后，此技能追加一定几率抵抗畏惧的效果，最大几率100%',
          },
        ],
      },
      {
        type: ESkillEffectType.Tip,
        data: [
          {
            icon: <InfoCircleOutlined />,
            content:
              '不同玩家施放战吼，状态覆盖的原则是：技能等级高者优先于技能等级低者；若技能等级相同，则持续时间较长者优先。',
          },
        ],
      },
    ],
  },
  {
    name: '狂战士之怒',
    neededMainWeapon: [
      EWeaponType.OneHandedSword,
      EWeaponType.TwoHandedSword,
      EWeaponType.EmptyHanded,
      EWeaponType.Bow,
      EWeaponType.BowGun,
      EWeaponType.Staff,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Halberd,
      EWeaponType.Katana,
    ],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.Katana,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: [],
                    fn: () => {
                      return 500;
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
                      return '快';
                    },
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
          name: '狂暴化',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '释放成功后',
            },
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '30秒内',
            },
          ],
          effects: [
            {
              type: [
                ENumericalNumber.ASPD,
                ENumericalNumber.ASPD_PERCENT,
                ENumericalNumber.CRITICAL_RATE,
                ENumericalNumber.STABILITY,
                ENumericalNumber.DEF,
                ENumericalNumber.MDEF,
              ],
              raw: 'ASPD + {expression:aspd}0, ASPD + {expression:aspd}%, 暴击率 + {expression:crt}, 稳定率 + {expression:sta}, DEF + {expression:def}, MDEF + {expression:def}',
              values: {
                aspd: {
                  args: ['level'],
                  fn: (level: number) => {
                    return level * 10;
                  },
                },
                crt: {
                  args: ['level', 'weaponType'],
                  fn: (level: number, weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return 5 * level;
                      default:
                        return 2.5 * level;
                    }
                  },
                },
                sta: {
                  args: ['level', 'weaponType'],
                  fn: (level: number, weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                      case EWeaponType.OneHandedSword:
                        return 50 - level * 2.5;
                      default:
                        return 100 - level * 5;
                    }
                  },
                },
                def: {
                  args: ['level', 'weaponType'],
                  fn: (level: number, weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.OneHandedSword:
                        return 50 - level * 0.5;
                      default:
                        return 100 - level;
                    }
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['weaponType', 'secondaryWeaponType'],
                  fn: (weaponType: EWeaponType, secondaryWeaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.TwoHandedSword:
                        return '暴击率加成翻倍，稳定率降低减半';
                      case EWeaponType.OneHandedSword:
                        if (secondaryWeaponType !== EWeaponType.OneHandedSword) {
                          return 'DEF、MDEF负面减轻，稳定率降低减半';
                        }
                        return '稳定率降低减半';
                      default:
                        return '无';
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
                    return '获得 斩击强化效果';
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
                  args: ['weaponType'],
                  fn: (weaponType: EWeaponType) => {
                    switch (weaponType) {
                      case EWeaponType.OneHandedSword:
                      case EWeaponType.TwoHandedSword:
                        return '使 爆气斩 的状态不会因为受到异常状态而解除';
                      default:
                        return '无';
                    }
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
          name: '斩击强化',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '状态期间',
            },
          ],
          effects: [
            {
              raw: '普通攻击倍率 + {expression:effect}%',
              values: {
                effect: {
                  args: ['level'],
                  fn: (level: number) => {
                    return level * 10;
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: '快速蹴击',
    neededMainWeapon: [EWeaponType.OneHandedSword, EWeaponType.TwoHandedSword],
    neededSecondaryWeapon: [
      EWeaponType.EmptyHanded,
      EWeaponType.OneHandedSword,
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
    ],
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
                    args: ['secondaryWeaponType'],
                    fn: (secondaryWeaponType: EWeaponType) => {
                      switch (secondaryWeaponType) {
                        case EWeaponType.OneHandedSword:
                          return 200;
                        default:
                          return 300;
                      }
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
                      return '同施放武器';
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
                      return '稍快';
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
              value: '一般攻击',
            },
            {
              name: '伤害惯性',
              value: '一般攻击',
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
              desc: '受距离威力影响',
            },
          ],
          effects: [
            {
              raw: '| 有效ATK + {expression:constant} | x {expression:magnification}%',
              values: {
                constant: {
                  args: ['level'],
                  fn: (level: number) => {
                    if (level <= 9) {
                      return (level + 1) * (level + 1) * 3;
                    }
                    return 300;
                  },
                },
                magnification: {
                  args: ['level'],
                  fn: (level: number) => {
                    if (level <= 9) {
                      return 30 + 5 * level;
                    }
                    return 30 + 5 * 9;
                  },
                },
              },
            },
          ],
          additional: [
            {
              name: '武器额外效果',
              icon: <AlertOutlined />,
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: ['secondaryWeaponType'],
                  fn: (secondaryWeaponType: EWeaponType) => {
                    switch (secondaryWeaponType) {
                      case EWeaponType.OneHandedSword:
                        return '技能命中时概率使目标翻覆';
                      default:
                        return '无';
                    }
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
          name: '技能效果',
          type: ['自身增益'],
          properties: [
            {
              icon: <FireOutlined></FireOutlined>,
              desc: '技能等级为10级时',
            },
          ],
          effects: [
            {
              raw: '{expression:effect}',
              values: {
                effect: {
                  args: [],
                  fn: () => {
                    return '下一招技能 MP消耗减半';
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
