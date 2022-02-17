import {
  ENumericalNumber,
  ENumericalNumberType,
  FOOD_DATA,
  NUMERICAL_NUMBER,
} from '@/components/numericalValue';
import { currentFoodState } from '@/store/current-data';
import { getRoleSelector } from '@/store/role-simulation';
import { EWeaponType, IEnchanting, IEquipment } from '@/typings/equipment';
import { Tooltip } from 'antd';
import { constant, toNumber } from 'lodash';
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

  /** 当前料理数据 */
  const [currentChoseFood] = useRecoilState(currentFoodState);

  /** 判断附魔的武器限制 */
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

  /** 统计装备附魔效果 */
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
  if (currentChoseFood.length !== 0) {
    enchantingData[8] = currentChoseFood.map((item) => {
      return {
        type: FOOD_DATA[item.foodData].name,
        value: item.userConfiguration.value,
        isNegative: FOOD_DATA[item.foodData].isNegative,
      };
    });
  }

  /** 以基础值为基准的加成数值计算 */
  const hasBasicsData = ({
    additionType,
    basics,
    rounding,
    decimal,
    limit,
  }: {
    /** 加成类型 */
    additionType?: ENumericalNumber[];
    /** 基础值 */
    basics: number;
    /** 是否取整 */
    rounding?: boolean;
    /** 保留小数位数 */
    decimal?: number;
    /** 上限值 */
    limit?: number;
  }) => {
    /** 结果暂存 */
    let result = basics;
    enchantingData.map((item) =>
      item.map((enchanting) => {
        /** 筛选附魔类型 */
        if (
          additionType.some((item) => (enchanting !== undefined ? item === enchanting.type : false))
        ) {
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
    if (limit && result >= limit) result = limit;
    if (rounding) {
      return Math.floor(result);
    } else if (decimal) {
      return toNumber(result.toFixed(decimal));
    }
    return result;
  };

  /** 无基础值加成数值计算 */
  const noBasicsData = ({
    additionType,
    rounding,
    decimal,
    limit,
  }: {
    /** 加成类型 */
    additionType?: ENumericalNumber[];
    /** 是否取整 */
    rounding?: boolean;
    /** 保留小数位数 */
    decimal?: number;
    /** 上限值 */
    limit?: number;
  }) => {
    /** 结果暂存 */
    let result = 0;
    enchantingData.map((item) =>
      item.map((enchanting) => {
        /** 筛选附魔类型 */
        if (
          additionType.some((item) => (enchanting !== undefined ? item === enchanting.type : false))
        ) {
          /** 判断增益或减益 */
          if (enchanting.isNegative) {
            result -= enchanting.value;
          } else {
            result += enchanting.value;
          }
        }
      }),
    );
    if (limit && result >= limit) result = limit;
    if (rounding) {
      return Math.floor(result);
    } else if (decimal) {
      return toNumber(result.toFixed(decimal));
    }
    return result;
  };

  /** 攻击类基础值计算 */
  const atkBasics = (
    ability: number[],
    additionValue: number[],
    isMatk?: boolean,
    secondaryWeapon?: boolean,
  ) => {
    if (!secondaryWeapon) {
      let result = role.level;
      if (isMatk && role.equipment.mainWeapon.weaponType === EWeaponType.Knuckle) {
        result +=
          hasBasicsData({
            basics: role.equipment.mainWeapon.mainValue,
            additionType: [ENumericalNumber.WEAPON_ATK, ENumericalNumber.WEAPON_ATK_PERCENT],
            rounding: true,
          }) * 0.5;
      } else {
        result += hasBasicsData({
          basics: role.equipment.mainWeapon.mainValue,
          additionType: [ENumericalNumber.WEAPON_ATK, ENumericalNumber.WEAPON_ATK_PERCENT],
          rounding: true,
        });
      }
      for (let i = 0; i < ability.length; i++) {
        result += ability[i] * additionValue[i];
      }
      return result;
    }
    return 10;
  };

  /** 攻击速度基础值计算 */
  const aspdBasics = (ability: number[], additionValue: number[]) => {
    let result = role.level;
    for (let i = 0; i < ability.length; i++) {
      result += ability[i] * additionValue[i];
    }
    return result;
  };

  /** 抽出会参与其余面板计算的能力值的计算结果 */
  const abilityResult = {
    str: hasBasicsData({
      additionType: [ENumericalNumber.STR, ENumericalNumber.STR_PERCENT],
      basics: role.ability.str,
      rounding: true,
    }),
    dex: hasBasicsData({
      additionType: [ENumericalNumber.DEX, ENumericalNumber.DEX_PERCENT],
      basics: role.ability.dex,
      rounding: true,
    }),
    int: hasBasicsData({
      additionType: [ENumericalNumber.INT, ENumericalNumber.INT_PERCENT],
      basics: role.ability.int,
      rounding: true,
    }),
    vit: hasBasicsData({
      additionType: [ENumericalNumber.VIT, ENumericalNumber.VIT_PERCENT],
      basics: role.ability.vit,
      rounding: true,
    }),
    agi: hasBasicsData({
      additionType: [ENumericalNumber.AGI, ENumericalNumber.AGI_PERCENT],
      basics: role.ability.agi,
      rounding: true,
    }),
    mp: hasBasicsData({
      additionType: [ENumericalNumber.MP],
      basics: 100 + 1 * role.level,
      rounding: true,
      limit: 2000,
    }),
    cspd: hasBasicsData({
      additionType: [ENumericalNumber.CSPD, ENumericalNumber.CSPD_PERCENT],
      basics:
        role.level +
        hasBasicsData({
          additionType: [ENumericalNumber.DEX, ENumericalNumber.DEX_PERCENT],
          basics: role.ability.dex,
          rounding: true,
        }) *
          2.94,
      rounding: true,
    }),
  };

  /** 有数值上限的结果运算 */
  const hasLimitResult = ({
    constant,
    enchanting,
    abilityNumber,
    abilityAddition,
    limit,
    extra,
  }: {
    /** 常数 */
    constant: number;
    /** 附魔加成类型 */
    enchanting: ENumericalNumber[];
    /** 能力值 */
    abilityNumber: number[];
    /** 能力加成量 */
    abilityAddition: number[];
    /** 上限 */
    limit: number;
    /** 额外值 */
    extra?: number;
  }) => {
    let result = 0;
    for (let i = 0; i < abilityNumber.length; i++) {
      result += abilityNumber[i] * abilityAddition[i];
    }
    result = Math.floor(
      result +
        constant +
        noBasicsData({
          additionType: enchanting,
        }),
    );
    if (extra) result += extra;
    if (result > limit) {
      return limit;
    }
    return result;
  };

  /** 与主手武器类型相关的数值计算 */
  const hasWeaponType = (type: string) => {
    const { stable } = role.equipment.mainWeapon;
    if (role.equipment.mainWeapon) {
      switch (type) {
        /** 攻击力计算 */
        case 'atk':
          switch (role.equipment.mainWeapon.weaponType) {
            case EWeaponType.OneHandedSword:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.OneHandedSword:
                  return hasBasicsData({
                    basics: atkBasics(
                      [abilityResult.str, abilityResult.dex, abilityResult.agi],
                      [1, 2, 1],
                    ),
                    additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                    rounding: true,
                  });
                case EWeaponType.MagicDevice:
                  return (
                    hasBasicsData({
                      basics: atkBasics([abilityResult.str, abilityResult.dex], [2, 2]),
                      additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                      rounding: true,
                    }) * 0.85
                  );
                default:
                  return hasBasicsData({
                    basics: atkBasics([abilityResult.str, abilityResult.dex], [2, 2]),
                    additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.TwoHandedSword:
              return hasBasicsData({
                basics: atkBasics([abilityResult.str, abilityResult.dex], [3, 1]),
                additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                rounding: true,
              });
            case EWeaponType.Bow:
              if (role.equipment.secondaryWeapon.weaponType === EWeaponType.Arrow) {
                return (
                  hasBasicsData({
                    basics: atkBasics([abilityResult.str, abilityResult.dex], [1, 3]),
                    additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                    rounding: true,
                  }) + role.equipment.secondaryWeapon.mainValue
                );
              }
              return hasBasicsData({
                basics: atkBasics([abilityResult.str, abilityResult.dex], [1, 3]),
                additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                rounding: true,
              });
            case EWeaponType.BowGun:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Arrow:
                  return (
                    hasBasicsData({
                      basics: atkBasics([abilityResult.dex], [4]),
                      additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                      rounding: true,
                    }) + role.equipment.secondaryWeapon.mainValue
                  );
                case EWeaponType.MagicDevice:
                  return (
                    hasBasicsData({
                      basics: atkBasics([abilityResult.dex], [4]),
                      additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                      rounding: true,
                    }) * 0.85
                  );
                default:
                  return hasBasicsData({
                    basics: atkBasics([abilityResult.dex], [4]),
                    additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.Staff:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.MagicDevice:
                  return (
                    hasBasicsData({
                      basics: atkBasics([abilityResult.str, abilityResult.int], [3, 1]),
                      additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                      rounding: true,
                    }) * 0.85
                  );
                default:
                  return hasBasicsData({
                    basics: atkBasics([abilityResult.str, abilityResult.int], [3, 1]),
                    additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.MagicDevice:
              return hasBasicsData({
                basics: atkBasics([abilityResult.int, abilityResult.agi], [2, 2]),
                additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                rounding: true,
              });
            case EWeaponType.Knuckle:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.MagicDevice:
                  return (
                    hasBasicsData({
                      basics: atkBasics([abilityResult.dex, abilityResult.agi], [0.5, 2]),
                      additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                      rounding: true,
                    }) * 0.85
                  );
                default:
                  return hasBasicsData({
                    basics: atkBasics([abilityResult.dex, abilityResult.agi], [0.5, 2]),
                    additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.Katana:
              return hasBasicsData({
                basics: atkBasics([abilityResult.str, abilityResult.dex], [1.5, 2.5]),
                additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                rounding: true,
              });
            case EWeaponType.Halberd:
              return hasBasicsData({
                basics: atkBasics([abilityResult.str, abilityResult.agi], [2.5, 1.5]),
                additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                rounding: true,
              });
            default:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.MagicDevice:
                  return (
                    hasBasicsData({
                      basics: role.level + abilityResult.str * 0.85,
                      additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                      rounding: true,
                    }) * 0.85
                  );
                default:
                  return hasBasicsData({
                    basics: role.level + abilityResult.str * 0.85,
                    additionType: [ENumericalNumber.ATK, ENumericalNumber.ATK_PERCENT],
                    rounding: true,
                  });
              }
          }
        /** 魔法攻击力计算 */
        case 'matk':
          switch (role.equipment.mainWeapon.weaponType) {
            case EWeaponType.OneHandedSword:
            case EWeaponType.TwoHandedSword:
            case EWeaponType.Bow:
            case EWeaponType.BowGun:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Knuckle:
                  return (role.level + abilityResult.int * 3 + abilityResult.dex * 1) * 0.85;
                default:
                  return role.level + abilityResult.int * 3 + abilityResult.dex * 1;
              }
            case EWeaponType.Staff:
            case EWeaponType.MagicDevice:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Knuckle:
                  return (
                    hasBasicsData({
                      basics: atkBasics([abilityResult.int, abilityResult.dex], [4, 1]),
                      additionType: [ENumericalNumber.MATK, ENumericalNumber.MATK_PERCENT],
                      rounding: true,
                    }) * 0.85
                  );
                default:
                  return hasBasicsData({
                    basics: atkBasics([abilityResult.int, abilityResult.dex], [4, 1]),
                    additionType: [ENumericalNumber.MATK, ENumericalNumber.MATK_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.Knuckle:
              return hasBasicsData({
                basics: atkBasics([abilityResult.int, abilityResult.dex], [4, 1], true),
                additionType: [ENumericalNumber.MATK, ENumericalNumber.MATK_PERCENT],
                rounding: true,
              });
            case EWeaponType.Katana:
              return hasBasicsData({
                basics: role.level + abilityResult.int * 1.5 + abilityResult.dex * 1,
                additionType: [ENumericalNumber.MATK, ENumericalNumber.MATK_PERCENT],
                rounding: true,
              });
            case EWeaponType.Halberd:
              return hasBasicsData({
                basics: role.level + abilityResult.int * 2 + abilityResult.dex * 1,
                additionType: [ENumericalNumber.MATK, ENumericalNumber.MATK_PERCENT],
                rounding: true,
              });
            default:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Knuckle:
                  return (
                    hasBasicsData({
                      basics: role.level + abilityResult.int * 4 + abilityResult.dex * 1,
                      additionType: [ENumericalNumber.MATK, ENumericalNumber.MATK_PERCENT],
                      rounding: true,
                    }) * 0.85
                  );
                default:
                  return hasBasicsData({
                    basics: role.level + abilityResult.int * 4 + abilityResult.dex * 1,
                    additionType: [ENumericalNumber.MATK, ENumericalNumber.MATK_PERCENT],
                    rounding: true,
                  });
              }
          }
        /** 稳定率计算 */
        case 'stability':
          switch (role.equipment.mainWeapon.weaponType) {
            case EWeaponType.OneHandedSword:
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str, abilityResult.dex],
                abilityAddition: [0.025, 0.075],
                limit: 100,
              });
            case EWeaponType.TwoHandedSword:
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.dex],
                abilityAddition: [0.1],
                limit: 100,
              });
            case EWeaponType.Bow:
              if (role.equipment.secondaryWeapon.weaponType === EWeaponType.Arrow) {
                return hasLimitResult({
                  constant: stable,
                  enchanting: [ENumericalNumber.STABILITY],
                  abilityNumber: [abilityResult.str, abilityResult.dex],
                  abilityAddition: [0.05, 0.05],
                  limit: 100,
                  extra: role.equipment.secondaryWeapon.mainValue,
                });
              }
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str, abilityResult.dex],
                abilityAddition: [0.05, 0.05],
                limit: 100,
              });
            case EWeaponType.BowGun:
              if (role.equipment.secondaryWeapon.weaponType === EWeaponType.Arrow) {
                return hasLimitResult({
                  constant: stable,
                  enchanting: [ENumericalNumber.STABILITY],
                  abilityNumber: [abilityResult.str],
                  abilityAddition: [0.05],
                  limit: 100,
                  extra: role.equipment.secondaryWeapon.mainValue * 0.5,
                });
              }
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str],
                abilityAddition: [0.05],
                limit: 100,
              });
            case EWeaponType.Staff:
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str],
                abilityAddition: [0.05],
                limit: 100,
              });
            case EWeaponType.MagicDevice:
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.dex],
                abilityAddition: [0.1],
                limit: 100,
              });
            case EWeaponType.Knuckle:
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.dex],
                abilityAddition: [0.025],
                limit: 100,
              });
            case EWeaponType.Katana:
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str, abilityResult.dex],
                abilityAddition: [0.075, 0.025],
                limit: 100,
              });
            case EWeaponType.Halberd:
              return hasLimitResult({
                constant: stable,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str, abilityResult.dex],
                abilityAddition: [0.05, 0.05],
                limit: 100,
              });
            default:
              return 0;
          }
        /** 魔法稳定率计算 */
        case 'magicStability':
          switch (role.equipment.mainWeapon.weaponType) {
            case EWeaponType.OneHandedSword:
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str, abilityResult.dex],
                abilityAddition: [0.025, 0.075],
                limit: 90,
              });
            case EWeaponType.TwoHandedSword:
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.dex],
                abilityAddition: [0.1],
                limit: 90,
              });
            case EWeaponType.Bow:
              if (role.equipment.secondaryWeapon.weaponType === EWeaponType.Arrow) {
                return hasLimitResult({
                  constant: stable * 0.5 + 50,
                  enchanting: [ENumericalNumber.STABILITY],
                  abilityNumber: [abilityResult.str, abilityResult.dex],
                  abilityAddition: [0.05, 0.05],
                  limit: 90,
                  extra: role.equipment.secondaryWeapon.mainValue,
                });
              }
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str, abilityResult.dex],
                abilityAddition: [0.05, 0.05],
                limit: 90,
              });
            case EWeaponType.BowGun:
              if (role.equipment.secondaryWeapon.weaponType === EWeaponType.Arrow) {
                return hasLimitResult({
                  constant: stable * 0.5 + 50,
                  enchanting: [ENumericalNumber.STABILITY],
                  abilityNumber: [abilityResult.str],
                  abilityAddition: [0.05],
                  limit: 90,
                  extra: role.equipment.secondaryWeapon.mainValue * 0.5,
                });
              }
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str],
                abilityAddition: [0.05],
                limit: 90,
              });
            case EWeaponType.Staff:
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str],
                abilityAddition: [0.05],
                limit: 90,
              });
            case EWeaponType.MagicDevice:
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.dex],
                abilityAddition: [0.1],
                limit: 90,
              });
            case EWeaponType.Knuckle:
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.dex],
                abilityAddition: [0.025],
                limit: 90,
              });
            case EWeaponType.Katana:
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str, abilityResult.dex],
                abilityAddition: [0.075, 0.025],
                limit: 90,
              });
            case EWeaponType.Halberd:
              return hasLimitResult({
                constant: stable * 0.5 + 50,
                enchanting: [ENumericalNumber.STABILITY],
                abilityNumber: [abilityResult.str, abilityResult.dex],
                abilityAddition: [0.05, 0.05],
                limit: 90,
              });
            default:
              return 50;
          }
        /** 攻击速度计算 */
        case 'aspd':
          switch (role.equipment.mainWeapon.weaponType) {
            case EWeaponType.OneHandedSword:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Shield:
                  return (
                    hasBasicsData({
                      basics: aspdBasics([abilityResult.str, abilityResult.dex], [0.2, 4.2]) + 100,
                      additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                      rounding: true,
                    }) * 0.5
                  );
                default:
                  return hasBasicsData({
                    basics: aspdBasics([abilityResult.str, abilityResult.dex], [0.2, 4.2]) + 100,
                    additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.TwoHandedSword:
              return hasBasicsData({
                basics: aspdBasics([abilityResult.str, abilityResult.agi], [0.2, 2.2]) + 50,
                additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                rounding: true,
              });
            case EWeaponType.Bow:
              return hasBasicsData({
                basics: aspdBasics([abilityResult.dex, abilityResult.agi], [0.2, 3.1]) + 75,
                additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                rounding: true,
              });
            case EWeaponType.BowGun:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Shield:
                  return (
                    hasBasicsData({
                      basics: aspdBasics([abilityResult.dex, abilityResult.agi], [0.2, 2.2]) + 100,
                      additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                      rounding: true,
                    }) * 0.5
                  );
                default:
                  return hasBasicsData({
                    basics: aspdBasics([abilityResult.dex, abilityResult.agi], [0.2, 2.2]) + 100,
                    additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.Staff:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Shield:
                  return (
                    hasBasicsData({
                      basics: aspdBasics([abilityResult.int, abilityResult.agi], [0.2, 1.8]) + 60,
                      additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                      rounding: true,
                    }) * 0.5
                  );
                default:
                  return hasBasicsData({
                    basics: aspdBasics([abilityResult.int, abilityResult.agi], [0.2, 1.8]) + 60,
                    additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.MagicDevice:
              return hasBasicsData({
                basics: aspdBasics([abilityResult.int, abilityResult.agi], [0.2, 4]) + 90,
                additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                rounding: true,
              });
            case EWeaponType.Knuckle:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Shield:
                  return (
                    hasBasicsData({
                      basics: aspdBasics([abilityResult.str, abilityResult.agi], [0.1, 4.6]) + 100,
                      additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                      rounding: true,
                    }) * 0.5
                  );
                default:
                  return hasBasicsData({
                    basics: aspdBasics([abilityResult.str, abilityResult.agi], [0.1, 4.6]) + 100,
                    additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                    rounding: true,
                  });
              }
            case EWeaponType.Katana:
              return hasBasicsData({
                basics: aspdBasics([abilityResult.str, abilityResult.agi], [0.3, 3.9]) + 200,
                additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                rounding: true,
              });
            case EWeaponType.Halberd:
              return hasBasicsData({
                basics: aspdBasics([abilityResult.str, abilityResult.agi], [0.2, 3.5]) + 25,
                additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                rounding: true,
              });
            default:
              switch (role.equipment.secondaryWeapon.weaponType) {
                case EWeaponType.Shield:
                  return (
                    hasBasicsData({
                      basics: aspdBasics([abilityResult.agi], [9.6]) + 1000,
                      additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                      rounding: true,
                    }) * 0.5
                  );
                default:
                  return hasBasicsData({
                    basics: aspdBasics([abilityResult.agi], [9.6]) + 1000,
                    additionType: [ENumericalNumber.ASPD, ENumericalNumber.ASPD_PERCENT],
                    rounding: true,
                  });
              }
          }
      }
    }
  };

  /** 暴击率计算 */
  const critical = () => {
    let basics = 25;
    if (role.abilityEx.type !== null && role.abilityEx.type[0] === ENumericalNumber.CRT) {
      basics += Math.floor(role.abilityEx.value / 3.4);
    }
    const result = hasBasicsData({
      additionType: [ENumericalNumber.CRITICAL_RATE, ENumericalNumber.CRITICAL_RATE_PERCENT],
      basics,
      rounding: true,
    });
    return result;
  };

  /** 暴击伤害计算 */
  const criticalDamage = () => {
    const basics = 150 + Math.floor(abilityResult.str / 5);
    let result = hasBasicsData({
      additionType: [ENumericalNumber.CRITICAL_DAMAGE, ENumericalNumber.CRITICAL_DAMAGE_PERCENT],
      basics,
      rounding: true,
    });
    if (result > 300) {
      result = 300 + (result - 300) / 2;
    }
    return result;
  };

  /** 防御计算 */
  const defense = (abilityAddition: number, additionType: ENumericalNumber[]) => {
    let basics = 0;
    if (role.equipment.armorEquip) {
      basics = abilityAddition + role.equipment.armorEquip.mainValue + role.level;
      return hasBasicsData({
        additionType,
        basics,
        rounding: true,
      });
    }
    basics = abilityAddition * 0.1 + role.level * 0.4;
    return hasBasicsData({
      additionType,
      basics,
      rounding: true,
    });
  };

  /** 抗性计算 */
  const resistance = (additionType: ENumericalNumber[]) => {
    const basics = noBasicsData({ additionType });
    let result = 1;
    if (basics > 50) {
      let i = Math.floor(basics / 50);
      for (i; i > 0; i++) {
        result *= 0.5;
      }
      result *= 1 - (basics % 50) * 0.01;
      return Math.floor(result * 100);
    }
    return basics;
  };

  /** 咏唱时间计算 */
  const chantTime = () => {
    if (abilityResult.cspd <= 1000) {
      return Math.ceil(100 - abilityResult.cspd / 20);
    } else if (abilityResult.cspd > 1000 && abilityResult.cspd <= 10000) {
      return Math.ceil(100 - 1000 / 20 - (abilityResult.cspd - 1000) / 180);
    }
    return 0;
  };

  /** 受伤害比率 */
  const bearDamage = (def: number, resistance: number) => {
    let result = 100;
    if (def <= 250) {
      result *= 1 - Math.floor(def / 12.5) * 0.01;
    } else if (def > 250 && def <= 1000) {
      result *= 1 - (20 + Math.floor((def - 250) / 150)) * 0.01;
    } else {
      result *= 1 - (20 + 5 + Math.floor((def - 1000) / 1000)) * 0.01;
    }
    result *= 1 - resistance * 0.01;
    return Math.floor(result);
  };

  /** 角色数值类型 */
  interface IData {
    name: ENumericalNumber | string;
    value: number;
    title: string;
  }

  /** 角色数值项 */
  const data: IData[][] = [
    [
      {
        name: ENumericalNumber.STR,
        value: abilityResult.str,
        title: '力量，影响角色基础暴击伤害',
      },
      {
        name: ENumericalNumber.DEX,
        value: abilityResult.dex,
        title: '灵巧，影响角色咏唱速度及命中率',
      },
      {
        name: ENumericalNumber.INT,
        value: abilityResult.int,
        title: '智力，影响角色魔法伤害及MDEF',
      },
      {
        name: ENumericalNumber.VIT,
        value: abilityResult.vit,
        title: '耐力，影响角色生命值及DEF',
      },
      {
        name: ENumericalNumber.AGI,
        value: abilityResult.agi,
        title: '敏捷，影响角色攻击速度及回避',
      },
    ],
    [
      {
        name: ENumericalNumber.HP,
        value: hasBasicsData({
          additionType: [ENumericalNumber.HP, ENumericalNumber.HP_PERCENT],
          basics: 100 + (role.level - 1) * 8 + (abilityResult.vit / 3) * role.level,
          rounding: true,
        }),
        title: '生命值,归零时角色倒地',
      },
      {
        name: ENumericalNumber.MP,
        value: abilityResult.mp,
        title: '魔力值，释放技能使用的资源',
      },
      {
        name: ENumericalNumber.NHPR,
        value: hasBasicsData({
          additionType: [ENumericalNumber.NHPR, ENumericalNumber.NHPR_PERCENT],
          basics: 14 + 0.32 * role.level,
          decimal: 2,
        }),
        title: '自然生命值回复，未处于战斗状态时每3秒回复一次',
      },
      {
        name: ENumericalNumber.NMPR,
        value: hasBasicsData({
          additionType: [ENumericalNumber.NMPR, ENumericalNumber.NMPR_PERCENT],
          basics: 14 + 0.32 * role.level,
          decimal: 2,
        }),
        title: '自然魔力值回复，未处于战斗状态时每3秒回复一次',
      },
      {
        name: ENumericalNumber.ATTACK_MP_RECOVERY,
        value: hasBasicsData({
          additionType: [
            ENumericalNumber.ATTACK_MP_RECOVERY,
            ENumericalNumber.ATTACK_MP_RECOVERY_PERCENT,
          ],
          basics: abilityResult.mp >= 2000 ? 30 : abilityResult.mp * 0.01 + 10,
          rounding: true,
        }),
        title: '攻击魔力值回复，每次普通攻击回复的MP总量',
      },
    ],
    [
      {
        name: ENumericalNumber.ATK,
        value: Math.floor(hasWeaponType('atk')),
        title: '攻击力，显示于面板上的攻击力总量，影响受ATK加成的技能伤害',
      },
      {
        name: ENumericalNumber.MATK,
        value: Math.floor(hasWeaponType('matk')),
        title: '魔法攻击力，显示于面板上的魔法攻击力总量，影响受MATK加成的技能伤害',
      },
      {
        name: ENumericalNumber.STABILITY,
        value: hasWeaponType('stability'),
        title:
          '稳定率，影响最终物理伤害与一般攻击的伤害范围，将在100%~稳定率的值间随机浮动，以1%为单位变化',
      },
      {
        name: ENumericalNumber.MAGIC_STABILITY,
        value: hasWeaponType('magicStability'),
        title:
          '魔法稳定率，影响最终魔法伤害范围，将在100%~魔法稳定率的值间随机浮动，以1%为单位变化，上限为90%',
      },
      {
        name: ENumericalNumber.CRITICAL_RATE,
        value: critical(),
        title: '暴击率，伤害产生暴击的几率，多于100的部分可以抵消BOSS的暴击抗性',
      },
      {
        name: ENumericalNumber.CRITICAL_DAMAGE,
        value: criticalDamage(),
        title: '暴击伤害，发生暴击时的伤害提升率，超出300%后的加成量将折半',
      },
    ],
    [
      {
        name: ENumericalNumber.DEF,
        value: defense(abilityResult.vit, [ENumericalNumber.DEF, ENumericalNumber.DEF_PERCENT]),
        title: '物理防御，减少所受的物理伤害',
      },
      {
        name: ENumericalNumber.MDEF,
        value: defense(abilityResult.int, [ENumericalNumber.MDEF, ENumericalNumber.MDEF_PERCENT]),
        title: '魔法防御，减少所受的魔法伤害',
      },
      {
        name: ENumericalNumber.PHYSICAL_RESISTANCE,
        value: resistance([ENumericalNumber.PHYSICAL_RESISTANCE]),
        title: '物理抗性，按比例降低所受物理伤害，每50%拆分相乘',
      },
      {
        name: ENumericalNumber.MAGIC_RESISTANCE,
        value: resistance([ENumericalNumber.MAGIC_RESISTANCE]),
        title: '魔法抗性，按比例降低所受魔法伤害，每50%拆分相乘',
      },
      {
        name: ENumericalNumber.PHYSICAL_INJURY,
        value: bearDamage(
          defense(abilityResult.vit, [ENumericalNumber.DEF, ENumericalNumber.DEF_PERCENT]),
          resistance([ENumericalNumber.PHYSICAL_RESISTANCE]),
        ),
        title: '受到的物理伤害比率',
      },
      {
        name: ENumericalNumber.MAGIC_INJURY,
        value: bearDamage(
          defense(abilityResult.int, [ENumericalNumber.MDEF, ENumericalNumber.MDEF_PERCENT]),
          resistance([ENumericalNumber.MAGIC_RESISTANCE]),
        ),
        title: '受到的魔法伤害比率',
      },
      {
        name: ENumericalNumber.PERCENT_INJURY,
        value: 100,
        title: '受到的百分比伤害比率',
      },
    ],
    [
      {
        name: ENumericalNumber.ACCURACY,
        value: Math.floor(
          hasBasicsData({
            additionType: [ENumericalNumber.ACCURACY, ENumericalNumber.ACCURACY_PERCENT],
            basics: role.level + abilityResult.dex,
          }),
        ),
        title: '命中，影响伤害的MISS，擦伤的概率，魔法伤害必定命中',
      },
      {
        name: ENumericalNumber.DODGE,
        value: Math.floor(
          hasBasicsData({
            additionType: [ENumericalNumber.DODGE, ENumericalNumber.DODGE_PERCENT],
            basics: role.level + abilityResult.agi,
          }),
        ),
        title: '回避，影响被攻击时MISS的概率，魔法伤害无法回避',
      },
      {
        name: ENumericalNumber.ASPD,
        value: hasWeaponType('aspd'),
        title:
          '攻击速度，达到1100时一般攻击无冷却时间，超过1000的部分每180将增加1%行动速度，上限为50%',
      },
      {
        name: ENumericalNumber.CSPD,
        value: abilityResult.cspd,
        title:
          '咏唱速度，对收咏唱速度影响的技能将缩短咏唱时间，前1000点每20点减少1%咏唱时间，超过1000后每180减少1%咏唱时间，上限为100%',
      },
      {
        name: ENumericalNumber.ACTION_TIME,
        value:
          hasWeaponType('aspd') > 10000
            ? 50
            : hasWeaponType('aspd') <= 1000
            ? 100
            : 100 - Math.ceil(Math.floor((hasWeaponType('aspd') - 1000) / 180)),
        title:
          '动作时间，受行动速度影响的行动所花费的时间（如部分技能释放，一般攻击等）比例，最快可为50%',
      },
      {
        name: ENumericalNumber.CHANT_TIME,
        value: chantTime(),
        title: '咏唱时间，受咏唱速度影响的技能咏唱所需要的时间比例，最少可为0%',
      },
    ],
    [
      {
        name: ENumericalNumber.UNSHEATHE_ATTACK_PERCENT,
        value:
          100 +
          noBasicsData({
            additionType: [ENumericalNumber.UNSHEATHE_ATTACK_PERCENT],
            rounding: true,
          }),
        title: '拔刀攻击，受拔刀攻击影响的技能及一般攻击发生拔刀攻击时，伤害将乘以该倍率',
      },
      {
        name: ENumericalNumber.SHORT_RANGE_DAMAGE_PERCENT,
        value:
          100 +
          noBasicsData({
            additionType: [ENumericalNumber.SHORT_RANGE_DAMAGE_PERCENT],
            rounding: true,
          }),
        title: '近距离威力，在攻击受近距离威力影响，且攻击时距离目标0~8米时，伤害将乘以该倍率',
      },
      {
        name: ENumericalNumber.LONG_RANGE_DAMAGE_PERCENT,
        value:
          100 +
          noBasicsData({
            additionType: [ENumericalNumber.LONG_RANGE_DAMAGE_PERCENT],
            rounding: true,
          }),
        title: '远距离威力，在攻击受远距离威力影响，且攻击时距离目标8米以上时，伤害将乘以该倍率',
      },
    ],
    [
      {
        name: ENumericalNumber.AGGRO_PERCENT,
        value: 100 + noBasicsData({ additionType: [ENumericalNumber.AGGRO_PERCENT] }),
        title: '仇恨值，造成的仇恨值将乘以该倍率，对部分情况无效',
      },
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
                <span className="role-data__item-value">
                  {NUMERICAL_NUMBER[name].type === ENumericalNumberType.Percentage
                    ? value + '%'
                    : value}
                </span>
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
