export interface RoleSimulationItem {
  id: string;
  name: string;
  level: number;
  str: number;
  dex: number;
  int: number;
  agi: number;
  vit: number;
  exAbility?: [string, number];
  outfit?: any[];
  skill?: any[];
  food?: any[];
}

export interface SkillListItem {
  name: string;
  skillTrue: any[];
}
