import {
  ENumericalNumber,
  ENumericalNumberType,
  NUMERICAL_NUMBER,
} from '@/constants/numericalValue';
import { getRoleSelector } from '@/store/role-simulation';
import { EWeaponType, IEnchanting, IEquipment } from '@/typings/equipment';
import { Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { IProps } from '../types';

import './index.less';

const RoleData: FC<IProps> = (props) => {
  /** 当前角色 ID */
  const { id } = props;

  /** 当前角色数据 */
  const roleSelector = useMemo(() => getRoleSelector(id), [id]);
  const [role, setRole] = useRecoilState(roleSelector);

  /** 判断附魔限制 */
  const enchantingLimit = (weaponLocation: IEquipment) => {
    return weaponLocation.enchanting.map((item) => {
      if (item.weaponLimit) {
        let result;
        for (const key in role.equipment) {
          if (!result) {
            if (role.equipment[key]) result = role.equipment[key].weaponType === item.weaponLimit;
          } else {
            return item;
          }
        }
      } else {
        return item;
      }
    });
  };

  /** 统计装备附魔 */
  const enchantingData: IEnchanting[][] = [];
  if (role.equipment.mainWeapon && role.equipment.mainWeapon.name !== '空') {
    enchantingData[0] = enchantingLimit(role.equipment.mainWeapon);
  }
  if (role.equipment.secondaryWeapon && role.equipment.mainWeapon.name !== '空') {
    switch (role.equipment.secondaryWeapon.weaponType) {
      case EWeaponType.Dagger:
      case EWeaponType.Arrow:
      case EWeaponType.Shield:
      case EWeaponType.NinjutsuScroll:
        enchantingData[1] = enchantingLimit(role.equipment.secondaryWeapon);
        break;
      default:
        break;
    }
  }
  if (role.equipment.armorEquip) {
    enchantingData[2] = enchantingLimit(role.equipment.armorEquip);
  }
  if (role.equipment.additionalEquip) {
    enchantingData[3] = enchantingLimit(role.equipment.additionalEquip);
  }
  if (role.equipment.specialEquip) {
    enchantingData[4] = enchantingLimit(role.equipment.specialEquip);
  }
  if (role.equipment.fashionEquip1) {
    enchantingData[5] = role.equipment.fashionEquip1.enchanting;
  }
  if (role.equipment.fashionEquip2) {
    enchantingData[6] = role.equipment.fashionEquip2.enchanting;
  }
  if (role.equipment.fashionEquip3) {
    enchantingData[7] = role.equipment.fashionEquip3.enchanting;
  }

  console.log('enchanting: ', enchantingData);

  /** 带基础值加成计算 */
  const abilityData = ({
    additionType,
    basics,
  }: {
    additionType?: ENumericalNumber[];
    basics?: number;
  }) => {
    /** 结果暂存 */
    let result = basics;
    enchantingData.map((item) =>
      item.map((enchanting) => {
        /** 筛选附魔类型 */
        if (additionType.some((item) => item === enchanting.type)) {
          /** 判断加成为常数或百分比 */
          if (NUMERICAL_NUMBER[enchanting.type].type === ENumericalNumberType.Percentage) {
            /** 判断增益或减益 */
            if (enchanting.isNegative) {
              result -= basics * enchanting.value * 0.01;
            } else {
              result += basics * enchanting.value * 0.01;
            }
          } else {
            /** 判断增益或减益 */
            if (enchanting.isNegative) {
              result -= enchanting.value;
            } else {
              result += enchanting.value;
            }
          }
        }
      }),
    );
    return result;
  };

  /** 攻回计算 */
  const attackMpRecovery = (additionType?: ENumericalNumber[]) => {};

  /** 角色数值项 */
  const data = [
    [
      {
        name: ENumericalNumber.STR,
        value: abilityData({
          additionType: [ENumericalNumber.STR, ENumericalNumber.STR_PERCENT],
          basics: role.ability.str,
        }),
        title: '力量，影响角色基础暴击伤害',
      },
      {
        name: ENumericalNumber.DEX,
        value: abilityData({
          additionType: [ENumericalNumber.DEX, ENumericalNumber.DEX_PERCENT],
          basics: role.ability.dex,
        }),
        title: '灵巧，影响角色咏唱速度及命中率',
      },
      {
        name: ENumericalNumber.INT,
        value: abilityData({
          additionType: [ENumericalNumber.INT, ENumericalNumber.INT_PERCENT],
          basics: role.ability.int,
        }),
        title: '智力，影响角色魔法伤害及MDEF',
      },
      {
        name: ENumericalNumber.VIT,
        value: abilityData({
          additionType: [ENumericalNumber.VIT, ENumericalNumber.VIT_PERCENT],
          basics: role.ability.vit,
        }),
        title: '耐力，影响角色生命值及DEF',
      },
      {
        name: ENumericalNumber.AGI,
        value: abilityData({
          additionType: [ENumericalNumber.AGI, ENumericalNumber.AGI_PERCENT],
          basics: role.ability.agi,
        }),
        title: '敏捷，影响角色攻击速度及回避',
      },
    ],
    [
      {
        name: ENumericalNumber.HP,
        value: abilityData({
          additionType: [ENumericalNumber.HP, ENumericalNumber.HP_PERCENT],
          basics: (93 + role.ability.vit / 3 + 127 / 17) * role.level,
        }),
        title: '生命值,归零时角色倒地',
      },
      {
        name: ENumericalNumber.MP,
        value: abilityData({
          additionType: [ENumericalNumber.MP],
          basics: 100 + 1 * role.level,
        }),
        title: '魔力值，释放技能使用的资源',
      },
      {
        name: ENumericalNumber.NHPR,
        value: abilityData({
          additionType: [ENumericalNumber.NHPR, ENumericalNumber.NHPR_PERCENT],
          basics: 14 + 0.32 * role.level,
        }),
        title: '自然生命值回复，未处于战斗状态时每3秒回复一次',
      },
      {
        name: ENumericalNumber.NMPR,
        value: abilityData({
          additionType: [ENumericalNumber.NMPR, ENumericalNumber.NMPR_PERCENT],
          basics: 14 + 0.32 * role.level,
        }),
        title: '自然魔力值回复，未处于战斗状态时每3秒回复一次',
      },
      {
        name: ENumericalNumber.ATTACK_MP_RECOVERY,
        value: attackMpRecovery([
          ENumericalNumber.ATTACK_MP_RECOVERY,
          ENumericalNumber.ATTACK_MP_RECOVERY_PERCENT,
        ]),
        title: '攻击魔力值回复，每次普通攻击回复的MP总量',
      },
    ],
    [
      {
        name: ENumericalNumber.ATK,
        value: 1,
        title: '攻击力，显示于面板上的攻击力总量，影响受ATK加成的技能伤害',
      },
      {
        name: ENumericalNumber.MATK,
        value: 1,
        title: '魔法攻击力，显示于面板上的魔法攻击力总量，影响受MATK加成的技能伤害',
      },
      {
        name: ENumericalNumber.STABILITY,
        value: 100 + '%',
        title:
          '稳定率，影响最终物理伤害与一般攻击的伤害范围，将在100%~稳定率的值间随机浮动，以1%为单位变化',
      },
      {
        name: ENumericalNumber.MAGIC_STABILITY,
        value: 100 + '%',
        title:
          '魔法稳定率，影响最终魔法伤害范围，将在100%~魔法稳定率的值间随机浮动，以1%为单位变化，上限为90%',
      },
      {
        name: ENumericalNumber.CRITICAL_RATE,
        value: 1,
        title: '暴击率，伤害产生暴击的几率，多于100的部分可以抵消BOSS的暴击抗性',
      },
      {
        name: ENumericalNumber.CRITICAL_DAMAGE,
        value: 1,
        title: '暴击伤害，发生暴击时的伤害提升率，超出300%后的加成量将折半',
      },
    ],
    [
      { name: ENumericalNumber.DEF, value: 1, title: '物理防御，减少所受的物理伤害' },
      { name: ENumericalNumber.MDEF, value: 1, title: '魔法防御，减少所受的魔法伤害' },
      {
        name: ENumericalNumber.PHYSICAL_RESISTANCE,
        value: 1 + '%',
        title: '物理抗性，按比例降低所受物理伤害，每50%拆分相乘',
      },
      {
        name: ENumericalNumber.MAGIC_RESISTANCE,
        value: 1 + '%',
        title: '魔法抗性，按比例降低所受魔法伤害，每50%拆分相乘',
      },
      { name: '受物理伤害', value: 1 + '%', title: '受到的物理伤害比率' },
      { name: '受魔法伤害', value: 1 + '%', title: '受到的魔法伤害比率' },
      { name: '受百分比伤害', value: 1 + '%', title: '受到的百分比伤害比率' },
    ],
    [
      {
        name: ENumericalNumber.ACCURACY,
        value: 1,
        title: '命中，影响伤害的MISS，擦伤的概率，魔法伤害必定命中',
      },
      {
        name: ENumericalNumber.DODGE,
        value: 1,
        title: '回避，影响被攻击时MISS的概率，魔法伤害无法回避',
      },
      {
        name: ENumericalNumber.ASPD,
        value: 1,
        title:
          '攻击速度，达到1100时一般攻击无冷却时间，超过1000的部分每180将增加1%行动速度，上限为50%',
      },
      {
        name: ENumericalNumber.CSPD,
        value: 1,
        title:
          '咏唱速度，对收咏唱速度影响的技能将缩短咏唱时间，前1000点每20点减少1%咏唱时间，超过1000后每180减少1%咏唱时间，上限为100%',
      },
      {
        name: '动作时间',
        value: 100 + '%',
        title:
          '动作时间，受行动速度影响的行动所花费的时间（如部分技能释放，一般攻击等）比例，最快可为50%',
      },
      {
        name: '咏唱时间',
        value: 100 + '%',
        title: '咏唱时间，受咏唱速度影响的技能咏唱所需要的时间比例，最少可为0%',
      },
    ],
    [
      {
        name: ENumericalNumber.UNSHEATHE_ATTACK_PERCENT,
        value: 100 + '%',
        title: '拔刀攻击，受拔刀攻击影响的技能及一般攻击发生拔刀攻击时，伤害将乘以该倍率',
      },
      {
        name: ENumericalNumber.SHORT_RANGE_DAMAGE_PERCENT,
        value: 100 + '%',
        title: '近距离威力，在攻击受近距离威力影响，且攻击时距离目标0~8米时，伤害将乘以该倍率',
      },
      {
        name: ENumericalNumber.LONG_RANGE_DAMAGE_PERCENT,
        value: 100 + '%',
        title: '远距离威力，在攻击受远距离威力影响，且攻击时距离目标8米以上时，伤害将乘以该倍率',
      },
    ],
    [
      {
        name: ENumericalNumber.AGGRO_PERCENT,
        value: 100 + '%',
        title: '仇恨值，造成的仇恨值将乘以该倍率，对部分情况无效',
      },
    ],
    [
      {
        name: ENumericalNumber.DROP_RATE_PERCENT,
        value: 100 + '%',
        title: '掉宝率，物品掉落的概率将乘以该倍率',
      },
      { name: '复活时间', value: 300, title: '倒地后重返重返战场需要的时间' },
    ],
  ];

  const dataItem = (title: string, array: any[]) => {
    return (
      <div className="role-data">
        <header className="role-data__header">{title}</header>
        <div className="role-data__content">
          {array.map((item) => {
            const { name, value, title } = item;
            return (
              <Tooltip
                key={name + 'data'}
                title={title}
                color={'#4e8eee'}
                className="role-data__item"
              >
                <span className="role-data__item-name">{name}</span>
                <span className="role-data__item-value">{value}</span>
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="edit-role__page-data">
      <div className="edit-role__page-field">
        {dataItem('角色能力', data[0])}
        {dataItem('HP、MP', data[1])}
        {dataItem('攻击属性', data[2])}
        {dataItem('特殊加成', data[6])}
      </div>
      <div className="edit-role__page-line"></div>
      <div className="edit-role__page-field">
        {dataItem('防御属性', data[3])}
        {dataItem('命中、回避、速度', data[4])}
        {dataItem('伤害修正', data[5])}
      </div>
    </section>
  );
};
export default RoleData;
