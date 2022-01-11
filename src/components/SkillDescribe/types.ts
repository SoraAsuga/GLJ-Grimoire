import { EWeaponType } from '@/typings/equipment';

export enum ESkillEffectType {
  /** 表格展示 */
  Table,
  Block,
  Desc,
  Tips,
}

export interface ISkillEffectOption {
  type: ESkillEffectType;
}

export interface IDescription {
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

/** 展示为描述块形式的描述信息 */
export interface IDescribeBlockProps {
  name: string;
  type: string[];
  properties: {
    icon: React.ReactNode;
    desc: string;
  }[];
  effects: IDescription[];
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
    };

export interface IDescribeSkillData {
  name: string;
  neededMainWeapon: EWeaponType[];
  neededSecondaryWeapon: EWeaponType[];
  effects: TDescribeSkillEffects[];
}
