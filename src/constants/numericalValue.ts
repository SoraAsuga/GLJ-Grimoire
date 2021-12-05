/** 数值枚举类型 */
export enum ENumericalNumberType {
  Normal = 'Normal',
  Percentage = 'Percentage',
}

/** 数值枚举 */
export enum ENumericalNumber {
  ATK,
  ATK_PERCENT,
  TEC,
  LUK,
  MEN,
  CRT,
}

/** 数值枚举值的类型 */
interface INumericalNumberValue {
  type: ENumericalNumberType;
  name: string;
}

/** 数值枚举映射 */
export const NUMERICAL_NUMBER: Record<ENumericalNumber, INumericalNumberValue> = {
  [ENumericalNumber.ATK]: {
    type: ENumericalNumberType.Normal,
    name: 'ATK',
  },
  [ENumericalNumber.ATK_PERCENT]: {
    type: ENumericalNumberType.Percentage,
    name: 'ATK%',
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
};
