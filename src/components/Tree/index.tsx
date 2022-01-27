import React, { createContext, FC, useContext } from 'react';
import { ITreeOption, ETreeType } from './types';
import TreeNode from './TreeNode';

import './index.less';

export const treeContext = createContext({ skillPointsMode: false });

interface ITreeProps {
  skillPointsMode?: boolean;
  data: ITreeOption;
}

const Tree: FC<ITreeProps> = (props) => {
  const { data, skillPointsMode = false } = props;
  const childProps = { ...data, type: ETreeType.ROOT };

  return (
    <treeContext.Provider value={{ skillPointsMode }}>
      <section className="tree">
        <TreeNode {...childProps} />
      </section>
    </treeContext.Provider>
  );
};

export default Tree;
