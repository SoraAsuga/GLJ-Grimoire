import React, { FC } from 'react';
import { ITreeOption, ETreeType } from './types';
import TreeNode from './TreeNode';

import './index.less';

interface ITreeProps {
  data: ITreeOption;
}

const Tree: FC<ITreeProps> = (props) => {
  const { data } = props;

  return (
    <section className="tree">
      <TreeNode data={{ ...data, type: ETreeType.ROOT }} />
    </section>
  );
};

export default Tree;
