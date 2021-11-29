export interface RoleSimulationItem {
  id: string;
  name: string;
  level: number;
  str: number;
  dex: number;
  int: number;
  agi: number;
  vit: number;
  exName?: string;
  ex?: number;
  outfit?: any[];
  skill?: any[];
  food?: any[];
  createDate: string;
}

export interface SkillListItem {
  name: string;
  skillTrue: any[];
}
