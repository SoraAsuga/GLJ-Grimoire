import React, { createContext, FC, useContext, useMemo } from 'react';
import { currentSkillConfigState } from '@/store/current-data';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ISkillPointData } from '@/store/skill-configuration';
import { ITreeOption, ETreeType } from './types';
import TreeNode from './TreeNode';

import './index.less';

interface ITreeContext {
  skillPointsMode: boolean;
  treeSkillData?: ISkillPointData;
  updateLevel?: (skillName: string, level: number) => void;
}

export const treeContext = createContext<ITreeContext>({
  skillPointsMode: false,
});

export interface ITreeProps extends Partial<ITreeContext> {
  data: ITreeOption;
  /** 类目 */
  catalog: string;
  /** name */
  name: string;
}

const Tree: FC<ITreeProps> = (props) => {
  const { data, skillPointsMode = false, catalog, name } = props;
  const childProps = { ...data, type: ETreeType.ROOT };

  /** 当前配置 */
  const [currentConfig, setCurrentConfig] = useRecoilState(currentSkillConfigState);
  const treeSkillData = useMemo(
    () => currentConfig.data[catalog].find((skillTree) => skillTree.name === name),
    [currentConfig],
  );

  const updateLevel = (skillName: string, level: number) => {
    const currentCatalog = currentConfig.data[catalog];
    const newSkillData = Object.assign({}, treeSkillData.skillData, { [skillName]: level });
    const newTreeSkillData = currentCatalog.map((skillTree) =>
      skillTree.name === name ? { ...skillTree, skillData: newSkillData } : skillTree,
    );

    const newConfigData: Record<string, ISkillPointData[]> = {
      ...currentConfig.data,
      [catalog]: newTreeSkillData,
    };

    setCurrentConfig({ ...currentConfig, data: newConfigData });
  };

  return (
    <treeContext.Provider value={{ skillPointsMode, treeSkillData, updateLevel }}>
      <section className="tree">
        <TreeNode {...childProps} />
      </section>
    </treeContext.Provider>
  );
};

export default Tree;
