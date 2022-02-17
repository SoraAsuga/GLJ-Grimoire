import { EFoodData, ENumericalNumber } from '@/components/numericalValue';

export interface SkillListItem {
  name: string;
  skillTrue: any[];
}

export interface FoodConfigurationItem {
  name: string;
  id: string;
  foodList: FoodListItem[];
  choseFoodNumber: number;
}

export interface IUserConfiguration {
  value: number;
  chose: boolean;
  level: number;
}

export interface FoodListItem {
  foodData: EFoodData;
  userConfiguration: IUserConfiguration;
}
