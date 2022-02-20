import { EFoodData } from '@/components/numericalValue';
import { atom, selector } from 'recoil';
import { ISkillConfig, ISkillPointData } from './skill-configuration';

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

/**
 * 获取某个技能树的数据
 * @param catalog 技能类目
 * @param treeName 技能树名称
 * @param skillName 技能名称 （空白节点没有名称）
 */
export const getSkillLevelSelector = (catalog: string, treeName: string, skillName: string) => {
  return selector({
    /** 必须保证这个 key 唯一 */
    key: `current-data/skill-config/${catalog}/${treeName}/${skillName}`,
    get({ get }) {
      /** 获取技能树 */
      const treeSkillData = get(currentSkillConfigState).data[catalog]?.find(
        (skillTree) => skillTree.name === treeName,
      );

      /** 获取技能等级 */
      return treeSkillData.skillData[skillName] || 0;
    },
    set({ set }, newLevel: number) {
      set(currentSkillConfigState, (current) => {
        const currentCatalog = current.data[catalog];
        /** 获取技能树 */
        const treeSkillData = currentCatalog.find((skillTree) => skillTree.name === treeName);

        /** 生成更新后的技能等级表 */
        const newSkillData = Object.assign({}, treeSkillData.skillData, { [skillName]: newLevel });
        /** 将技能等级表写入类目数据 */
        const newCatalog = currentCatalog.map((skillTree) =>
          skillTree.name === treeName ? { ...skillTree, skillData: newSkillData } : skillTree,
        );

        const newConfigData: Record<string, ISkillPointData[]> = {
          ...current.data,
          [catalog]: newCatalog,
        };

        return { ...current, data: newConfigData };
      });
    },
  });
};

/**
 * config: [{
 *    name,
 *    id,
 *    catalogs: [{
 *      name,
 *      id,
 *      treeReactNode,
 *      skillData: {}
 *    }]
 * }]
 *
 * =>
 *
 * config: [{
 *    name,
 *    id,
 *    catalogs: number[];
 * }]
 *
 * catalogIndex: {
 *   [id]: {
 *      name,
 *      id,
 *      treeReactNode,
 *      skillDataId,
 *    }
 * }
 *
 * skillDataIndex: {
 *   [id]: {
 *      [skillName]: skillLevel
 *   }
 * }
 */
