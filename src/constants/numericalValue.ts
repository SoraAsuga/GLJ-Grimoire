import {
  EEquipmentLocation,
  EModificationState,
  EWeaponType,
  IEquipment,
} from '@/typings/equipment';

/** 数值枚举类型 */
export enum ENumericalNumberType {
  Normal = 'Normal',
  Percentage = 'Percentage',
}

/** 数值枚举 */
export enum ENumericalNumber {
  /** 攻击力 */
  ATK,
  /** 攻击力百分比 */
  ATK_PERCENT,
  /** 武器攻击力 */
  WEAPON_ATK,
  /** 武器攻击力百分比 */
  WEAPON_ATK_PERCENT,
  /** 魔法攻击力 */
  MATK,
  /** 魔法攻击力百分比 */
  MATK_PERCENT,
  /** 物理贯穿 */
  PHYSICAL_PIERCE,
  /** 魔法贯穿 */
  MAGIC_PIERCE,
  /** 稳定率 */
  STABILITY,
  /** 攻击MP回复 */
  ATTACK_MP_RECOVERY,
  /** 攻击MP回复 */
  ATTACK_MP_RECOVERY_PERCENT,
  /** 力量 */
  STR,
  /** 力量百分比 */
  STR_PERCENT,
  /** 灵巧 */
  DEX,
  /** 灵巧百分比 */
  DEX_PERCENT,
  /** 智力 */
  INT,
  /** 智力百分比 */
  INT_PERCENT,
  /** 耐力 */
  VIT,
  /** 耐力百分比 */
  VIT_PERCENT,
  /** 敏捷 */
  AGI,
  /** 敏捷百分比 */
  AGI_PERCENT,
  /** 生命值上限 */
  HP,
  /** 生命值上限百分比 */
  HP_PERCENT,
  /** 魔力值 */
  MP,
  /** 生命值自然回复 */
  NHPR,
  /** 生命值自然回复百分比 */
  NHPR_PERCENT,
  /** 魔力值自然回复 */
  NMPR,
  /** 魔力值自然恢复百分比 */
  NMPR_PERCENT,
  /** 物理防御 */
  DEF,
  /** 物理防御百分比 */
  DEF_PERCENT,
  /** 魔法防御 */
  MDEF,
  /** 魔法防御百分比 */
  MDEF_PERCENT,
  /** 物理抗性 */
  PHYSICAL_RESISTANCE,
  /** 魔法抗性 */
  MAGIC_RESISTANCE,
  /** 敌方范围伤害减轻 */
  REDUCE_DMG_FOE_EPICENTER,
  /** 范围伤害减轻 */
  REDUCE_PLAYER_EPICENTER,
  /** 直线伤害减轻 */
  REDUCE_DMG_STRAIGHT_LINE,
  /** 冲撞伤害减轻 */
  REDUCE_DMG_CHARGE,
  /** 陨石伤害减轻 */
  REDUCE_DMG_METEOR,
  /** 子弹伤害减轻 */
  REDUCE_DMG_BULLET,
  /** 贴地伤害减轻 */
  REDUCE_DMG_BOWLING,
  /** 地面伤害减轻 */
  REDUCE_DMG_FLOOR,
  /** 命中 */
  ACCURACY,
  /** 命中百分比 */
  ACCURACY_PERCENT,
  /** 回避 */
  DODGE,
  /** 回避百分比 */
  DODGE_PERCENT,
  /** 暴击 */
  CRITICAL_RATE,
  /** 暴击百分比 */
  CRITICAL_RATE_PERCENT,
  /** 暴击伤害 */
  CRITICAL_DAMAGE,
  /** 暴击伤害百分比 */
  CRITICAL_DAMAGE_PERCENT,
  /** 攻击速度 */
  ASPD,
  /** 攻击速度百分比 */
  ASPD_PERCENT,
  /** 咏唱速度 */
  CSPD,
  /** 咏唱速度百分比 */
  CSPD_PERCENT,
  /** 对火属性伤害 */
  STRONGER_AGAINST_FIRE,
  /** 对水属性伤害 */
  STRONGER_AGAINST_WALTER,
  /** 对地属性伤害 */
  STRONGER_AGAINST_EARTH,
  /** 对风属性伤害 */
  STRONGER_AGAINST_WIND,
  /** 对光属性伤害 */
  STRONGER_AGAINST_LIGHT,
  /** 对暗属性伤害 */
  STRONGER_AGAINST_DARK,
  /** 对无属性伤害 */
  STRONGER_AGAINST_NORMAL,
  /** 抗火属性 */
  FIRE_RESISTANCE,
  /** 抗水属性 */
  WALTER_RESISTANCE,
  /** 抗地属性 */
  EARTH_RESISTANCE,
  /** 抗风属性 */
  WIND_RESISTANCE,
  /** 抗光属性 */
  LIGHT_RESISTANCE,
  /** 抗暗属性 */
  DARK_RESISTANCE,
  /** 抗无属性 */
  NORMAL_RESISTANCE,
  /** 技巧 */
  TEC,
  /** 幸运 */
  LUK,
  /** 异抗 */
  MEN,
  /** 暴击 */
  CRT,
  /** 异常抗性百分比 */
  AILMENT_RESISTANCE_PERCENT,
  /** 阻挡回复百分比 */
  GUARD_RECHARGE_PERCENT,
  /** 阻挡力 */
  GUARD_POWER,
  /** 阻挡力百分比 */
  GUARD_POWER_PERCENT,
  /** 闪躲回复百分比 */
  EVASION_RECHARGE_PERCENT,
  /** 仇恨值百分比 */
  AGGRO_PERCENT,
  /** 火属性 */
  FIRE,
  /** 水属性 */
  WALTER,
  /** 地属性 */
  EARTH,
  /** 风属性 */
  WIND,
  /** 光属性 */
  LIGHT,
  /** 暗属性 */
  DARK,
  /** 掉宝率 */
  DROP_RATE_PERCENT,
  /** 物理屏障 */
  PHYSICAL_BARRIER,
  /** 魔法屏障 */
  MAGIC_BARRIER,
  /** 百分比屏障 */
  FRACTIONAL_BARRIER_PERCENT,
  /** 近距离威力 */
  SHORT_RANGE_DAMAGE_PERCENT,
  /** 远距离威力 */
  LONG_RANGE_DAMAGE_PERCENT,
  /** 拔刀攻击 */
  UNSHEATHE_ATTACK_PERCENT,
}

/** 数值枚举值的类型 */
interface INumericalNumberValue {
  type: ENumericalNumberType;
  name: string;
}

/** 料理数据类型 */
export interface IFoodData {
  name: ENumericalNumber;
  isNegative?: boolean;
  max: number;
  halfIncrement: number;
}

/** 料理数据枚举 */
export enum EFoodData {
  /** 生命值 */
  HP,
  /** 魔力值 */
  MP,
  /** 力量 */
  STR,
  /** 灵巧 */
  DEX,
  /** 智力 */
  INT,
  /** 耐力 */
  VIT,
  /** 敏捷 */
  AGI,
  /** 攻击力 */
  ATK,
  /** 魔法攻击力 */
  MATK,
  /** 武器攻击力 */
  WEAPON_ATK,
  /** 物理抗性 */
  PHYSICAL_RESISTANCE,
  /** 魔法抗性 */
  MAGIC_RESISTANCE,
  /** 增仇 */
  AGGRO_PERCENT,
  /** 减仇 */
  AGGRO_REDUCE_PERCENT,
  /** 攻击魔力值回复 */
  ATTACK_MP_RECOVERY,
  /** 暴击率 */
  CRITICAL_RATE,
  /** 命中 */
  ACCURACY,
  /** 回避 */
  DODGE,
  /** 物理防御 */
  DEF,
  /** 魔法防御 */
  MDEF,
}

/** 料理数据枚举映射 */
export const FOOD_DATA: Record<EFoodData, IFoodData> = {
  [EFoodData.HP]: {
    name: ENumericalNumber.HP,
    max: 5000,
    halfIncrement: 400,
  },
  [EFoodData.MP]: {
    name: ENumericalNumber.MP,
    max: 1000,
    halfIncrement: 60,
  },
  [EFoodData.STR]: {
    name: ENumericalNumber.STR,
    max: 30,
    halfIncrement: 2,
  },
  [EFoodData.DEX]: {
    name: ENumericalNumber.DEX,
    max: 30,
    halfIncrement: 2,
  },
  [EFoodData.INT]: {
    name: ENumericalNumber.INT,
    max: 30,
    halfIncrement: 2,
  },
  [EFoodData.VIT]: {
    name: ENumericalNumber.VIT,
    max: 30,
    halfIncrement: 2,
  },
  [EFoodData.AGI]: {
    name: ENumericalNumber.AGI,
    max: 30,
    halfIncrement: 2,
  },
  [EFoodData.ATK]: {
    name: ENumericalNumber.ATK,
    max: 100,
    halfIncrement: 6,
  },
  [EFoodData.MATK]: {
    name: ENumericalNumber.MATK,
    max: 100,
    halfIncrement: 6,
  },
  [EFoodData.WEAPON_ATK]: {
    name: ENumericalNumber.WEAPON_ATK,
    max: 100,
    halfIncrement: 6,
  },
  [EFoodData.PHYSICAL_RESISTANCE]: {
    name: ENumericalNumber.PHYSICAL_RESISTANCE,
    max: 50,
    halfIncrement: 4,
  },
  [EFoodData.MAGIC_RESISTANCE]: {
    name: ENumericalNumber.MAGIC_RESISTANCE,
    max: 50,
    halfIncrement: 4,
  },
  [EFoodData.AGGRO_PERCENT]: {
    name: ENumericalNumber.AGGRO_PERCENT,
    max: 100,
    halfIncrement: 6,
  },
  [EFoodData.AGGRO_REDUCE_PERCENT]: {
    name: ENumericalNumber.AGGRO_PERCENT,
    isNegative: true,
    max: 100,
    halfIncrement: 6,
  },
  [EFoodData.ATTACK_MP_RECOVERY]: {
    name: ENumericalNumber.ATTACK_MP_RECOVERY,
    max: 30,
    halfIncrement: 2,
  },
  [EFoodData.CRITICAL_RATE]: {
    name: ENumericalNumber.CRITICAL_RATE,
    max: 30,
    halfIncrement: 2,
  },
  [EFoodData.ACCURACY]: {
    name: ENumericalNumber.ACCURACY,
    max: 100,
    halfIncrement: 6,
  },
  [EFoodData.DODGE]: {
    name: ENumericalNumber.DODGE,
    max: 100,
    halfIncrement: 6,
  },
  [EFoodData.DEF]: {
    name: ENumericalNumber.DEF,
    max: 100,
    halfIncrement: 6,
  },
  [EFoodData.MDEF]: {
    name: ENumericalNumber.MDEF,
    max: 100,
    halfIncrement: 6,
  },
};

/** 数值枚举映射 */
export const NUMERICAL_NUMBER: Record<ENumericalNumber, INumericalNumberValue> = {
  [ENumericalNumber.ATK]: {
    type: ENumericalNumberType.Normal,
    name: 'ATK',
  },
  [ENumericalNumber.ATK_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'ATK',
  },
  [ENumericalNumber.WEAPON_ATK]: {
    type: ENumericalNumberType.Normal,
    name: '武器ATK',
  },
  [ENumericalNumber.WEAPON_ATK_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '武器ATK',
  },
  [ENumericalNumber.MATK]: {
    type: ENumericalNumberType.Normal,
    name: 'MATK',
  },
  [ENumericalNumber.MATK_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'MATK',
  },
  [ENumericalNumber.PHYSICAL_PIERCE]: {
    type: ENumericalNumberType.Percentage,
    name: '物理贯穿',
  },
  [ENumericalNumber.MAGIC_PIERCE]: {
    type: ENumericalNumberType.Percentage,
    name: '魔法贯穿',
  },
  [ENumericalNumber.STABILITY]: {
    type: ENumericalNumberType.Percentage,
    name: '稳定率',
  },
  [ENumericalNumber.ATTACK_MP_RECOVERY]: {
    type: ENumericalNumberType.Normal,
    name: '攻击MP回复',
  },
  [ENumericalNumber.ATTACK_MP_RECOVERY_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '攻击MP回复',
  },
  [ENumericalNumber.STR]: {
    type: ENumericalNumberType.Normal,
    name: 'STR',
  },
  [ENumericalNumber.STR_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'STR',
  },
  [ENumericalNumber.DEX]: {
    type: ENumericalNumberType.Normal,
    name: 'DEX',
  },
  [ENumericalNumber.DEX_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'DEX',
  },
  [ENumericalNumber.INT]: {
    type: ENumericalNumberType.Normal,
    name: 'INT',
  },
  [ENumericalNumber.INT_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'INT',
  },
  [ENumericalNumber.VIT]: {
    type: ENumericalNumberType.Normal,
    name: 'VIT',
  },
  [ENumericalNumber.VIT_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'VIT',
  },
  [ENumericalNumber.AGI]: {
    type: ENumericalNumberType.Normal,
    name: 'AGI',
  },
  [ENumericalNumber.AGI_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'AGI',
  },
  [ENumericalNumber.HP]: {
    type: ENumericalNumberType.Normal,
    name: 'HP上限',
  },
  [ENumericalNumber.HP_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'HP上限',
  },
  [ENumericalNumber.MP]: {
    type: ENumericalNumberType.Normal,
    name: 'MP上限',
  },
  [ENumericalNumber.NHPR]: {
    type: ENumericalNumberType.Normal,
    name: 'HP自然回复',
  },
  [ENumericalNumber.NHPR_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'HP自然回复',
  },
  [ENumericalNumber.NMPR]: {
    type: ENumericalNumberType.Normal,
    name: 'MP自然回复',
  },
  [ENumericalNumber.NMPR_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'MP自然回复',
  },
  [ENumericalNumber.DEF]: {
    type: ENumericalNumberType.Normal,
    name: 'DEF',
  },
  [ENumericalNumber.DEF_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'DEF',
  },
  [ENumericalNumber.MDEF]: {
    type: ENumericalNumberType.Normal,
    name: 'MDEF',
  },
  [ENumericalNumber.MDEF_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'MDEF',
  },
  [ENumericalNumber.PHYSICAL_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '物理抗性',
  },
  [ENumericalNumber.MAGIC_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '魔法抗性',
  },
  [ENumericalNumber.REDUCE_DMG_FOE_EPICENTER]: {
    type: ENumericalNumberType.Percentage,
    name: '敌方范围伤害减轻',
  },
  [ENumericalNumber.REDUCE_PLAYER_EPICENTER]: {
    type: ENumericalNumberType.Percentage,
    name: '范围伤害减轻',
  },
  [ENumericalNumber.REDUCE_DMG_STRAIGHT_LINE]: {
    type: ENumericalNumberType.Percentage,
    name: '直线伤害减轻',
  },
  [ENumericalNumber.REDUCE_DMG_CHARGE]: {
    type: ENumericalNumberType.Percentage,
    name: '冲撞伤害减轻',
  },
  [ENumericalNumber.REDUCE_DMG_METEOR]: {
    type: ENumericalNumberType.Percentage,
    name: '陨石伤害减轻',
  },
  [ENumericalNumber.REDUCE_DMG_BULLET]: {
    type: ENumericalNumberType.Percentage,
    name: '子弹伤害减轻',
  },
  [ENumericalNumber.REDUCE_DMG_BOWLING]: {
    type: ENumericalNumberType.Percentage,
    name: '贴地伤害减轻',
  },
  [ENumericalNumber.REDUCE_DMG_FLOOR]: {
    type: ENumericalNumberType.Percentage,
    name: '地面伤害减轻',
  },
  [ENumericalNumber.ACCURACY]: {
    type: ENumericalNumberType.Normal,
    name: '命中',
  },
  [ENumericalNumber.ACCURACY_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '命中',
  },
  [ENumericalNumber.DODGE]: {
    type: ENumericalNumberType.Normal,
    name: '回避',
  },
  [ENumericalNumber.DODGE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '回避',
  },
  [ENumericalNumber.CRITICAL_RATE]: {
    type: ENumericalNumberType.Normal,
    name: '暴击率',
  },
  [ENumericalNumber.CRITICAL_RATE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '暴击率',
  },
  [ENumericalNumber.CRITICAL_DAMAGE]: {
    type: ENumericalNumberType.Normal,
    name: '暴击伤害',
  },
  [ENumericalNumber.CRITICAL_DAMAGE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '暴击伤害',
  },
  [ENumericalNumber.ASPD]: {
    type: ENumericalNumberType.Normal,
    name: '攻击速度',
  },
  [ENumericalNumber.ASPD_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '攻击速度',
  },
  [ENumericalNumber.CSPD]: {
    type: ENumericalNumberType.Normal,
    name: '咏唱速度',
  },
  [ENumericalNumber.CSPD_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '咏唱速度',
  },
  [ENumericalNumber.STRONGER_AGAINST_FIRE]: {
    type: ENumericalNumberType.Percentage,
    name: '对火属性伤害',
  },
  [ENumericalNumber.STRONGER_AGAINST_WALTER]: {
    type: ENumericalNumberType.Percentage,
    name: '对水属性伤害',
  },
  [ENumericalNumber.STRONGER_AGAINST_EARTH]: {
    type: ENumericalNumberType.Percentage,
    name: '对地属性伤害',
  },
  [ENumericalNumber.STRONGER_AGAINST_WIND]: {
    type: ENumericalNumberType.Percentage,
    name: '对风属性伤害',
  },
  [ENumericalNumber.STRONGER_AGAINST_LIGHT]: {
    type: ENumericalNumberType.Percentage,
    name: '对光属性伤害',
  },
  [ENumericalNumber.STRONGER_AGAINST_DARK]: {
    type: ENumericalNumberType.Percentage,
    name: '对暗属性伤害',
  },
  [ENumericalNumber.STRONGER_AGAINST_NORMAL]: {
    type: ENumericalNumberType.Percentage,
    name: '对无属性伤害',
  },
  [ENumericalNumber.FIRE_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '抗火属性',
  },
  [ENumericalNumber.WALTER_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '抗水属性',
  },
  [ENumericalNumber.EARTH_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '抗地属性',
  },
  [ENumericalNumber.WIND_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '抗风属性',
  },
  [ENumericalNumber.LIGHT_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '抗光属性',
  },
  [ENumericalNumber.DARK_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '抗暗属性',
  },
  [ENumericalNumber.NORMAL_RESISTANCE]: {
    type: ENumericalNumberType.Percentage,
    name: '抗无属性',
  },
  [ENumericalNumber.TEC]: {
    type: ENumericalNumberType.Normal,
    name: 'TEC',
  },
  [ENumericalNumber.LUK]: {
    type: ENumericalNumberType.Normal,
    name: 'LUK',
  },
  [ENumericalNumber.MEN]: {
    type: ENumericalNumberType.Normal,
    name: 'MEN',
  },
  [ENumericalNumber.CRT]: {
    type: ENumericalNumberType.Normal,
    name: 'CRT',
  },
  [ENumericalNumber.AILMENT_RESISTANCE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '异常抗性',
  },
  [ENumericalNumber.GUARD_RECHARGE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '阻挡回复',
  },
  [ENumericalNumber.GUARD_POWER]: {
    type: ENumericalNumberType.Normal,
    name: '阻挡力',
  },
  [ENumericalNumber.GUARD_POWER_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '阻挡力',
  },
  [ENumericalNumber.EVASION_RECHARGE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '闪躲回复',
  },
  [ENumericalNumber.AGGRO_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '仇恨值',
  },
  [ENumericalNumber.FIRE]: {
    type: ENumericalNumberType.Normal,
    name: '火属性',
  },
  [ENumericalNumber.WALTER]: {
    type: ENumericalNumberType.Normal,
    name: '水属性',
  },
  [ENumericalNumber.EARTH]: {
    type: ENumericalNumberType.Normal,
    name: '地属性',
  },
  [ENumericalNumber.WIND]: {
    type: ENumericalNumberType.Normal,
    name: '风属性',
  },
  [ENumericalNumber.LIGHT]: {
    type: ENumericalNumberType.Normal,
    name: '光属性',
  },
  [ENumericalNumber.DARK]: {
    type: ENumericalNumberType.Normal,
    name: '暗属性',
  },
  [ENumericalNumber.DROP_RATE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '掉宝率',
  },
  [ENumericalNumber.PHYSICAL_BARRIER]: {
    type: ENumericalNumberType.Normal,
    name: '物理屏障',
  },
  [ENumericalNumber.MAGIC_BARRIER]: {
    type: ENumericalNumberType.Normal,
    name: '魔法屏障',
  },
  [ENumericalNumber.FRACTIONAL_BARRIER_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '百分比屏障',
  },
  [ENumericalNumber.SHORT_RANGE_DAMAGE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '近距离威力',
  },
  [ENumericalNumber.LONG_RANGE_DAMAGE_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '远距离威力',
  },
  [ENumericalNumber.UNSHEATHE_ATTACK_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: '拔刀攻击',
  },
};

export const EQUIPS: IEquipment[] = [
  {
    id: 'empty-handed',
    name: '空',
    weaponType: EWeaponType.EmptyHanded,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 0,
    allowedSecondaryWeapon: [
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.EmptyHanded,
      EWeaponType.NinjutsuScroll,
    ],
  },
  {
    id: 'one-handed-1',
    name: '长剑',
    weaponType: EWeaponType.OneHandedSword,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 17,
    stable: 80,
    allowedSecondaryWeapon: [
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.OneHandedSword,
      EWeaponType.EmptyHanded,
      EWeaponType.NinjutsuScroll,
    ],
    enchanting: [
      { type: ENumericalNumber.HP, value: 50, isNegative: false },
      { type: ENumericalNumber.ACCURACY, value: 1, isNegative: false },
    ],
  },
  {
    id: 'two-handed-1',
    name: '重剑',
    weaponType: EWeaponType.TwoHandedSword,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 25,
    stable: 70,
    allowedSecondaryWeapon: [EWeaponType.EmptyHanded],
    enchanting: [
      { type: ENumericalNumber.CRITICAL_DAMAGE_PERCENT, value: 5, isNegative: false },
      { type: ENumericalNumber.ACCURACY_PERCENT, value: 5, isNegative: true },
    ],
  },
  {
    id: 'bow-1',
    name: '硬木弓',
    weaponType: EWeaponType.Bow,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 6,
    stable: 60,
    allowedSecondaryWeapon: [EWeaponType.Katana, EWeaponType.Arrow, EWeaponType.EmptyHanded],
    enchanting: [{ type: ENumericalNumber.STR, value: 1, isNegative: false }],
  },
  {
    id: 'bow-gun-1',
    name: '弩',
    weaponType: EWeaponType.BowGun,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 8,
    stable: 50,
    allowedSecondaryWeapon: [
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.EmptyHanded,
    ],
    enchanting: [{ type: ENumericalNumber.DEX, value: 10, isNegative: false }],
  },
  {
    id: 'staff-1',
    name: '魔杖',
    weaponType: EWeaponType.Staff,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 25,
    stable: 60,
    allowedSecondaryWeapon: [
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.NinjutsuScroll,
      EWeaponType.EmptyHanded,
    ],
    enchanting: [{ type: ENumericalNumber.MP, value: 100, isNegative: false }],
  },
  {
    id: 'magic-device-1',
    name: '魔力羽毛',
    weaponType: EWeaponType.MagicDevice,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 8,
    stable: 70,
    allowedSecondaryWeapon: [EWeaponType.NinjutsuScroll, EWeaponType.EmptyHanded],
    enchanting: [
      { type: ENumericalNumber.MP, value: 100, isNegative: false },
      { type: ENumericalNumber.ASPD_PERCENT, value: 1, isNegative: false },
    ],
  },
  {
    id: 'knuckle-1',
    name: '拳环',
    weaponType: EWeaponType.Knuckle,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 17,
    stable: 90,
    allowedSecondaryWeapon: [
      EWeaponType.MagicDevice,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.EmptyHanded,
    ],
    enchanting: [
      { type: ENumericalNumber.DEX, value: 1, isNegative: false },
      { type: ENumericalNumber.ASPD_PERCENT, value: 2, isNegative: false },
      { type: ENumericalNumber.ATTACK_MP_RECOVERY, value: 1, isNegative: false },
    ],
  },
  {
    id: 'halberd-1',
    name: '长柄刀',
    weaponType: EWeaponType.Halberd,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 21,
    stable: 60,
    allowedSecondaryWeapon: [EWeaponType.Dagger, EWeaponType.Arrow, EWeaponType.EmptyHanded],
    enchanting: [
      { type: ENumericalNumber.MP, value: 50, isNegative: false },
      { type: ENumericalNumber.ACCURACY, value: 1, isNegative: false },
    ],
  },
  {
    id: 'katana-1',
    name: '无铭打刀',
    weaponType: EWeaponType.Katana,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 6,
    stable: 70,
    allowedSecondaryWeapon: [
      EWeaponType.Dagger,
      EWeaponType.NinjutsuScroll,
      EWeaponType.EmptyHanded,
    ],
    enchanting: [{ type: ENumericalNumber.CRITICAL_RATE, value: 5, isNegative: false }],
  },
  {
    id: 'dagger-1',
    name: '商队小刀',
    weaponType: EWeaponType.Dagger,
    location: EEquipmentLocation.SecondaryWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 4,
    enchanting: [{ type: ENumericalNumber.EVASION_RECHARGE_PERCENT, value: 10, isNegative: false }],
  },
  {
    id: 'shield-1',
    name: '圆盾',
    weaponType: EWeaponType.Shield,
    location: EEquipmentLocation.SecondaryWeapon,
    mainValueType: ENumericalNumber.DEF,
    mainValue: 0,
    enchanting: [
      { type: ENumericalNumber.HP, value: 30, isNegative: false },
      { type: ENumericalNumber.GUARD_POWER_PERCENT, value: 15, isNegative: false },
      { type: ENumericalNumber.GUARD_RECHARGE_PERCENT, value: 15, isNegative: false },
    ],
  },
  {
    id: 'arrow-1',
    name: '商队的箭',
    weaponType: EWeaponType.Arrow,
    location: EEquipmentLocation.SecondaryWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 2,
    enchanting: [{ type: ENumericalNumber.ACCURACY, value: 2, isNegative: false }],
  },
  {
    id: 'ninjutsu-scroll-1',
    name: '忍术卷轴·暗遁',
    weaponType: EWeaponType.NinjutsuScroll,
    location: EEquipmentLocation.SecondaryWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 0,
    stable: 0,
    enchanting: [{ type: ENumericalNumber.AGGRO_PERCENT, value: 10, isNegative: true }],
  },
  {
    id: 'armor-1',
    name: '爱丽丝铠甲',
    weaponType: EWeaponType.Armor,
    location: EEquipmentLocation.ArmorEquip,
    mainValueType: ENumericalNumber.DEF,
    mainValue: 100,
    reform: EModificationState.Normal,
    enchanting: [
      { type: ENumericalNumber.HP_PERCENT, value: 10, isNegative: false },
      { type: ENumericalNumber.MP, value: 100, isNegative: false },
      { type: ENumericalNumber.WEAPON_ATK_PERCENT, value: 10, isNegative: false },
      { type: ENumericalNumber.ACCURACY_PERCENT, value: 10, isNegative: false },
      { type: ENumericalNumber.DODGE_PERCENT, value: 10, isNegative: false },
      { type: ENumericalNumber.PHYSICAL_RESISTANCE, value: 10, isNegative: false },
      { type: ENumericalNumber.MAGIC_RESISTANCE, value: 10, isNegative: false },
    ],
  },
  {
    id: 'additional-equip-1',
    name: '面铠',
    weaponType: EWeaponType.AdditionalEquip,
    location: EEquipmentLocation.AdditionalEquip,
    mainValueType: ENumericalNumber.DEF,
    mainValue: 190,
    enchanting: [
      { type: ENumericalNumber.UNSHEATHE_ATTACK_PERCENT, value: 7, isNegative: false },
      { type: ENumericalNumber.MP, value: 200, isNegative: false },
      {
        type: ENumericalNumber.SHORT_RANGE_DAMAGE_PERCENT,
        value: 5,
        isNegative: false,
        weaponLimit: EWeaponType.Katana,
      },
      {
        type: ENumericalNumber.LONG_RANGE_DAMAGE_PERCENT,
        value: 5,
        isNegative: false,
        weaponLimit: EWeaponType.Bow,
      },
    ],
  },
  {
    id: 'special-equip-1',
    name: '烂漫守石',
    weaponType: EWeaponType.SpecialEquip,
    location: EEquipmentLocation.SpecialEquip,
    mainValueType: ENumericalNumber.DEF,
    mainValue: 0,
    enchanting: [
      { type: ENumericalNumber.MP, value: 200, isNegative: false },
      { type: ENumericalNumber.ASPD, value: 750, isNegative: false },
      { type: ENumericalNumber.CSPD, value: 750, isNegative: false },
      { type: ENumericalNumber.AILMENT_RESISTANCE_PERCENT, value: 8, isNegative: true },
    ],
  },
];
