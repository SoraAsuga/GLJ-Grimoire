import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import cls from 'classnames';
import { currentSkillState } from '@/store/current-data';
import { useSetRecoilState } from 'recoil';
import { ITreeOption, ETreeType } from './types';
import SkillNode from './SkillNode';
import { treeContext } from '.';

/** 前置技能加点等级 */
const MIN_PRE_SKILL_LEVEL = 5;
const MAX_SKILL_LEVEL = 10;

interface ISkillNodeRef {
  reset: () => void;
}

interface ITreeNodeProps extends ITreeOption {
  /** 子节点变化 */
  onSkillPointIncrease?: () => void;
}

const TreeNode = forwardRef<ISkillNodeRef, ITreeNodeProps>((props, ref) => {
  const {
    data,
    childList = [],
    brotherList = [],
    type = ETreeType.ROOT,
    onSkillPointIncrease,
  } = props;

  /** 加点模式 */
  const { skillPointsMode, treeSkillData, updateLevel } = useContext(treeContext);

  const setSkillState = useSetRecoilState(currentSkillState);

  const [level, setLevel] = useState(() => {
    return treeSkillData?.skillData[data?.content] || 0;
  });

  /** 保存子节点引用，方便调用 reset 方法 */
  const childRefs = useRef<ISkillNodeRef[]>([]);

  const addChildRef = (r: ISkillNodeRef) => {
    if (r !== null) {
      childRefs.current.push(r);
    }
  };

  const updateLevelValue = (level: number) => {
    if (data?.content) {
      updateLevel?.(data.content, level);
      setLevel(level);
    }
  };

  /** 让父组件可以调用子组件的方法 */
  const reset = useCallback(() => {
    updateLevelValue(0);
    resetChildrenLevel();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      reset,
    }),
    [],
  );

  const resetChildrenLevel = useCallback(() => {
    childRefs.current.forEach((childRef) => {
      childRef.reset();
    });
  }, []);

  /** 鼠标左键 */
  const handleLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!skillPointsMode) {
      setSkillState(data?.content);
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    const newLevel = Math.min(MAX_SKILL_LEVEL, level + 1);

    updateLevelValue(newLevel);

    onSkillPointIncrease?.();
  };

  /** 鼠标右键 */
  const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!skillPointsMode) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    if (level - 1 < MIN_PRE_SKILL_LEVEL) {
      resetChildrenLevel();
    }

    const newLevel = Math.max(0, level - 1);

    updateLevelValue(newLevel);

    console.log('click: right');
  };

  const handleChildSkillPointIncrease = useCallback(() => {
    if (level < MIN_PRE_SKILL_LEVEL) {
      updateLevelValue(MIN_PRE_SKILL_LEVEL);
      onSkillPointIncrease?.();
    }
  }, [level]);

  const hasChildren = childList.length !== 0;
  const hasBrother = brotherList.length !== 0;

  const renderTreeNode = (list: ITreeOption[], treeType: ETreeType) => {
    return list.map((childProps, index) => (
      <TreeNode
        ref={(r) => addChildRef(r)}
        key={index}
        {...{
          ...childProps,
          onSkillPointIncrease: handleChildSkillPointIncrease,
          type: treeType,
        }}
      />
    ));
  };

  /** react 每次更新会触发子节点重新渲染，导致 ref 改变，存起来就行 */
  const renderChildren = useMemo(() => {
    childRefs.current = [];
    return renderTreeNode(childList, ETreeType.CHILD);
  }, [level]);
  const renderBrothers = useMemo(() => {
    childRefs.current = [];
    return renderTreeNode(brotherList, ETreeType.BROTHER);
  }, [level]);

  return (
    <>
      <div
        className={cls('tree-node__wrapper', {
          'tree-node__brother': type === ETreeType.BROTHER || hasBrother,
          'tree-node__root': type === ETreeType.ROOT,
        })}
      >
        <div className="tree-node">
          <div
            className="tree-node__content"
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
          >
            {Boolean(data) && (
              <SkillNode content={data.content} icon={data.icon} level={level}></SkillNode>
            )}
          </div>
          {hasChildren && <div className="tree-node__children">{renderChildren}</div>}
        </div>
      </div>
      {hasBrother && renderBrothers}
    </>
  );
});

export default TreeNode;
