import { ENumericalNumber } from '@/constants/numericalValue';
import { IEquipment } from './equipment';

/** 角色信息 */
export interface IRoleItem {
  id: string;
  name: string;
  level: number;
  createDate: string;
  ability: IRoleAbility;
  abilityEx: IRoleAbilityEx;
  equipment: IRoleEquipment;
}

/** 额外能力类型 */
export type TRoleAbilityExType =
  | null
  | ENumericalNumber.CRT
  | ENumericalNumber.LUK
  | ENumericalNumber.MEN
  | ENumericalNumber.TEC;

export interface IRoleAbilityEx {
  type: TRoleAbilityExType;
  value: number;
}

/** 基础能力 */
export interface IRoleAbility {
  str: number;
  dex: number;
  int: number;
  agi: number;
  vit: number;
}

/** 装备信息 */
export interface IRoleEquipment {
  mainWeapon?: IEquipment;
  secondaryWeapon?: IEquipment;
  armorEquip?: IEquipment;
  additionalEquip?: IEquipment;
  specialEquip?: IEquipment;
  fashionEquip1?: IEquipment;
  fashionEquip2?: IEquipment;
  fashionEquip3?: IEquipment;
}
