import { ENumericalNumber } from '../constants/numericalValue';

/** 装备位置 */
export enum EEquipmentLocation {
  MainWeapon,
  SecondaryWeapon,
  ArmorEquip,
  AdditionalEquip,
  SpecialEquip,
  FashionEquip,
}

/** 附魔 */
export interface IEnchanting {
  type: ENumericalNumber;
  value: number;
}

/** 装备 */
export interface IEquipment {
  id: number;
  name: string;
  /** 装备位置 */
  location: EEquipmentLocation;
  /** 主属性类型 */
  mainValueType: ENumericalNumber;
  /** 主属性数值 */
  mainValue: number;
  /** 精炼值 */
  refine: number;
  /** 稳定率，武器才有 */
  stable?: number;
  /** 附魔 */
  enchanting: IEnchanting[];
}
