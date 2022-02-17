import { EFoodData } from '@/components/numericalValue';
import { atom } from 'recoil';
import { FoodConfigurationItem } from './types';

export const foodConfigurationState = atom<FoodConfigurationItem[]>({
  key: 'food-configuration/configuration',
  default: [
    {
      name: '料理1',
      id: 'defaultFood',
      foodList: [
        { foodData: EFoodData.HP, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.MP, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.STR, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.DEX, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.INT, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.VIT, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.AGI, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.ATK, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.MATK, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.WEAPON_ATK, userConfiguration: { value: 0, chose: false, level: 0 } },
        {
          foodData: EFoodData.PHYSICAL_RESISTANCE,
          userConfiguration: { value: 0, chose: false, level: 0 },
        },
        {
          foodData: EFoodData.MAGIC_RESISTANCE,
          userConfiguration: { value: 0, chose: false, level: 0 },
        },
        {
          foodData: EFoodData.AGGRO_PERCENT,
          userConfiguration: { value: 0, chose: false, level: 0 },
        },
        {
          foodData: EFoodData.AGGRO_REDUCE_PERCENT,
          userConfiguration: { value: 0, chose: false, level: 0 },
        },
        {
          foodData: EFoodData.ATTACK_MP_RECOVERY,
          userConfiguration: { value: 0, chose: false, level: 0 },
        },
        {
          foodData: EFoodData.CRITICAL_RATE,
          userConfiguration: { value: 0, chose: false, level: 0 },
        },
        { foodData: EFoodData.ACCURACY, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.DODGE, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.DEF, userConfiguration: { value: 0, chose: false, level: 0 } },
        { foodData: EFoodData.MDEF, userConfiguration: { value: 0, chose: false, level: 0 } },
      ],
      choseFoodNumber: 0,
    },
  ],
});
