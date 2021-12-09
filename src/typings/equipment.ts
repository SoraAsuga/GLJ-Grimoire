import { ENumericalNumber } from '../constants/numericalValue';

/** 装备位置 */
export enum EEquipmentLocation {
  /** 仅主手武器 */
  MainWeaponOnly,
  /** 仅副手武器 */
  SecondaryWeaponOnly,
  /** 双手皆可 */
  BothHandWeapon,
  /** 身体装备 */
  ArmorEquip,
  /** 追加装备 */
  AdditionalEquip,
  /** 特殊装备 */
  SpecialEquip,
  /** 时装 */
  FashionEquip,
}

/** 武器类型 */
export enum EWeaponType {
  /** 单手剑 */
  OneHandedSword,
  /** 双手剑 */
  TwoHandedSword,
  /** 弓 */
  Bow,
  /** 弩 */
  BowGun,
  /** 拳套 */
  Knuckle,
  /** 法杖 */
  Staff,
  /** 魔导具 */
  MagicDevice,
  /** 旋风枪 */
  Halberd,
  /** 拔刀剑 */
  Katana,
  /** 箭矢 */
  Arrow,
  /** 小刀 */
  Dagger,
  /** 忍者卷轴 */
  NinjutsuScroll,
  /** 盾牌 */
  Shield,
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
  type: EEquipmentLocation;
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
  /** 武器类型 */
  weaponType?: EWeaponType;
  /** 精炼值 */
  refine?: number;
  /** 稳定率，武器才有 */
  stable?: number;
  /** 重化轻化，防具才有 */
  reform?: EModificationState;
  /** 附魔 */
  enchanting?: IEnchanting[];
  /** 锻晶 */
  xtal?: IXtal[];
  /** 自定义 */
  isDIY?: string;
}
