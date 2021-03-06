import { EForgingCrystal, ENumericalNumber } from '../components/numericalValue';

/** 装备位置 */

export enum EEquipmentLocation {
  /** 主武器 */
  MainWeapon = '主手武器',
  /** 副武器 */
  SecondaryWeapon = '副手武器',
  /** 身体装备 */
  ArmorEquip = '身体装备',
  /** 追加装备 */
  AdditionalEquip = '追加装备',
  /** 特殊装备 */
  SpecialEquip = '特殊装备',
  /** 时装 */
  FashionEquip = '时装',
}

/** 武器类型 */
export enum EWeaponType {
  /** 空手 */
  EmptyHanded = '空手',
  /** 单手剑 */
  OneHandedSword = '单手剑',
  /** 双手剑 */
  TwoHandedSword = '双手剑',
  /** 双剑 */
  DualSword = '双剑',
  /** 弓 */
  Bow = '弓',
  /** 弩 */
  BowGun = '弩',
  /** 拳套 */
  Knuckle = '拳套',
  /** 法杖 */
  Staff = '法杖',
  /** 魔导具 */
  MagicDevice = '魔导具',
  /** 旋风枪 */
  Halberd = '旋风枪',
  /** 拔刀剑 */
  Katana = '拔刀剑',
  /** 箭矢 */
  Arrow = '箭矢',
  /** 短剑 */
  Dagger = '短剑',
  /** 忍者卷轴 */
  NinjutsuScroll = '忍者卷轴',
  /** 盾牌 */
  Shield = '盾牌',
  /** 身体防具 */
  Armor = '身体防具',
  /** 追加装备 */
  AdditionalEquip = '追加装备',
  /** 特殊装备 */
  SpecialEquip = '特殊装备',
  /** 时装 */
  FashionEquip = '时装',
}

/** 防具改造类型 */
export enum EModificationState {
  /** 未改造 */
  Normal,
  /** 轻化 */
  Light,
  /** 重化 */
  Heavy,
}

/** 附魔 */
export interface IEnchanting {
  type: ENumericalNumber;
  value: number;
  isNegative: boolean;
  weaponLimit?: EWeaponType;
}

export interface IXtal {
  name: string;
  type: EForgingCrystal;
  strengthen?: boolean;
  enchanting: IEnchanting[];
}

/** 装备 */
export interface IEquipment {
  id: string;
  name: string;
  /** 装备位置 */
  location: EEquipmentLocation;
  /** 主属性类型 */
  mainValueType: ENumericalNumber;
  /** 主属性数值 */
  mainValue: number;
  /** 装备类型 */
  weaponType: EWeaponType;
  /** 精炼值 */
  refine?: number;
  /** 稳定率，武器才有 */
  stable?: number;
  /** 需求技能 */
  requiredSkill?: any;
  /** 重化轻化，防具才有 */
  reform?: EModificationState;
  /** 附魔 */
  enchanting?: IEnchanting[];
  /** 锻晶1 */
  xtal1?: IXtal;
  /** 锻晶2 */
  xtal2?: IXtal;
  /** 自定义 */
  isDIY?: string;
}
