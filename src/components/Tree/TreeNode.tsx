import React, { FC, useCallback } from 'react';
import cls from 'classnames';
import { ITreeOption, ETreeType } from './types';

interface ITreeProps {
  data: ITreeOption;
}

const TreeNode: FC<ITreeProps> = (props) => {
  const {
    data,
    data: { content, childList = [], brotherList = [], type = ETreeType.ROOT },
  } = props;

  const renderChildTree = useCallback(
    (list: ITreeOption[], treeType: ETreeType) => {
      return list.map((childProps, index) => (
        <TreeNode key={index} data={{ ...childProps, type: treeType }} />
      ));
    },
    [data],
  );

  const hasChildren = childList.length !== 0;
  const hasBrother = brotherList.length !== 0;

  return (
    <>
      <div
        className={cls('tree-node__wrapper', {
          'tree-node__brother': type === ETreeType.BROTHER || hasBrother,
          'tree-node__root': type === ETreeType.ROOT,
        })}
      >
        <div className="tree-node">
          <div className="tree-node__content">{content}</div>
          {hasChildren && (
            <div className="tree-node__children">{renderChildTree(childList, ETreeType.CHILD)}</div>
          )}
        </div>
      </div>
      {hasBrother && renderChildTree(brotherList, ETreeType.BROTHER)}
    </>
  );
};

export default TreeNode;
