import React, { createContext, FC } from 'react';
import { ITreeOption, ETreeType } from './types';
import TreeNode from './TreeNode';

import './index.less';

interface ITreeContext {
  /** 技能树模式：
   * - 只读：此时只能点击
   */
  mode: 'readonly' | 'writable';
  /** 技能类目 */
  catalog: string;
  /** 技能树名称 */
  treeName: string;
}

/**
 * 整棵树的属性，通过 context，避免透传
 */
export const treeContext = createContext<ITreeContext>({
  mode: 'readonly',
  catalog: '',
  treeName: '',
});

export interface ITreeProps extends Partial<ITreeContext> {
  data: ITreeOption;
  mode: ITreeContext['mode'];
}

const Tree: FC<ITreeProps> = (props) => {
  const { data, mode = 'readonly', catalog, treeName } = props;
  const childProps = { ...data, type: ETreeType.ROOT };

  return (
    <treeContext.Provider value={{ mode, catalog, treeName }}>
      <section className="tree">
        <TreeNode {...childProps} />
      </section>
    </treeContext.Provider>
  );
};

export default Tree;
