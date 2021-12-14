import { EFoodData, ENumericalNumber } from '@/constants/numericalValue';

export interface SkillListItem {
  name: string;
  skillTrue: any[];
}

export interface FoodConfigurationItem {
  name: string;
  id: string;
  foodList: FoodListItem[];
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
