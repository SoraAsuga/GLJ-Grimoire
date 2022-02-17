import { ENumericalNumber } from '@/components/numericalValue';
import { EWeaponType } from '@/typings/equipment';

export enum ESkillEffectType {
  /** 表格展示 */
  Table,
  Block,
  Desc,
  Tip,
}

export interface ISkillEffectOption {
  type: ESkillEffectType;
}

export interface IDescription {
  type?: ENumericalNumber[];
  raw: string;
  values: Record<
    string,
    {
      args: string[];
      fn: (...args: any[]) => any;
    }
  >;
}

/** 展示为表格形式的描述信息 */
export interface IDescribeTableProps {
  items: {
    name: string;
    icon: React.ReactNode;
    desc: IDescription;
  }[];
}

/** 展示为描述形式的描述信息 */
export interface IDescribeDescProps {
  items: {
    name: string;
    value: string;
  }[];
}

/** 展示为额外形式的描述信息 */
export interface IAdditional {
  type?: ENumericalNumber[];
  name: string;
  icon: any;
  raw: string;
  values: Record<
    string,
    {
      args: string[];
      fn: (...args: any[]) => any;
    }
  >;
}

/** 展示为描述块形式的描述信息 */
export interface IDescribeBlockProps {
  icon?: any;
  name: string;
  type: string[];
  properties: {
    icon: React.ReactNode;
    desc: string;
  }[];
  effects: IDescription[];
  additional?: IAdditional[];
}

/** 展示为提升形式的描述信息 */
export interface IDescribeTipProps {
  icon: any;
  content: string;
}

type TDescribeSkillEffects =
  | {
      type: ESkillEffectType.Table;
      data: IDescribeTableProps;
    }
  | {
      type: ESkillEffectType.Desc;
      data: IDescribeDescProps;
    }
  | {
      type: ESkillEffectType.Block;
      data: IDescribeBlockProps;
    }
  | {
      type: ESkillEffectType.Tip;
      data: IDescribeTipProps[];
    };

export interface IDescribeSkillData {
  name: string;
  neededMainWeapon: EWeaponType[];
  neededSecondaryWeapon: EWeaponType[];
  effects: TDescribeSkillEffects[];
}
