import { atom } from 'recoil';
import { FoodConfigurationItem } from './types';

export const foodConfigurationState = atom<FoodConfigurationItem[]>({
  key: 'food-configuration/configuration',
  default: [
    { name: '料理1', id: 'defaultFood', foodList: [] },
    { name: '料理2', id: 'defaultFood-1', foodList: [] },
  ],
});
