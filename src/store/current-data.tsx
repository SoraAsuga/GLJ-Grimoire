import { EFoodData } from '@/constants/numericalValue';
import { atom } from 'recoil';

export const currentSkillState = atom<string>({
  key: 'current-data/skill',
  default: '',
});

export const currentFoodState = atom<
  {
    foodData: EFoodData;
    userConfiguration: { value: number; chose: boolean; level: number };
  }[]
>({
  key: 'current-data/food',
  default: [],
});