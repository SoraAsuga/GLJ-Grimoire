import { EFoodData } from '@/components/numericalValue';
import { atom } from 'recoil';
import { ISkillConfig } from './skill-configuration';

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

export const currentSkillConfigState = atom<ISkillConfig>({
  key: 'current-data/skill-config',
  default: undefined,
  dangerouslyAllowMutability: true,
});
