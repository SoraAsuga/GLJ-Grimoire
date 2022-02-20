import React, {
  FC,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import cls from 'classnames';
import { currentSkillState, getSkillLevelSelector } from '@/store/current-data';
import { useRecoilState, useSetRecoilState } from 'recoil';
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
  onchange?: (level: number, type: 'increase' | 'decrease') => void;
}

interface ITreeNodeRendererProps extends ITreeOption {
  data?: ITreeOption['data'];
  level?: number;
  onLeftClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onRightClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
  brothers: React.ReactNode;
}

interface ITreeNodeAddonProps extends ITreeNodeProps {
  curRef: React.ForwardedRef<ISkillNodeRef>;
  render: (props: ITreeNodeRendererProps) => React.ReactElement;
}

const ReadableTreeNodeAddon: FC<ITreeNodeAddonProps> = (props) => {
  const { render, data, childList = [], brotherList = [] } = props;

  const setSkillState = useSetRecoilState(currentSkillState);

  const skillName = data?.content || '';
  const isEmptyNode = !skillName;

  const handleLeftClick = () => {
    if (isEmptyNode) {
      return;
    }

    setSkillState(skillName);
  };

  const renderTreeNode = (list: ITreeOption[], treeType: ETreeType) => {
    return list.map((childProps, index) => (
      <TreeNode
        key={index}
        {...{
          ...childProps,
          type: treeType,
        }}
      />
    ));
  };

  const subProps: ITreeNodeRendererProps = {
    data,
    onLeftClick: handleLeftClick,
    onRightClick: () => {},
    children: renderTreeNode(childList, ETreeType.CHILD),
    brothers: renderTreeNode(brotherList, ETreeType.BROTHER),
  };

  return render(subProps);
};

const WritableTreeNodeAddon: FC<ITreeNodeAddonProps> = (props) => {
  /** 加点模式 */
  const { catalog, treeName } = useContext(treeContext);
  const { curRef, render, childList = [], brotherList = [], data, onchange } = props;

  const skillName = data?.content || '';
  const isEmptyNode = !skillName;

  const recoilSkillLevelSelector = useMemo(
    () => getSkillLevelSelector(catalog, treeName, skillName),
    [],
  );

  const [skillLevel, setSkillLevel] = useRecoilState(recoilSkillLevelSelector);
  const [level, setLevel] = useState(skillLevel);

  /** 保存子节点引用，方便调用 reset 方法 */
  const childRefs = useRef<ISkillNodeRef[]>([]);

  const addChildRef = (r: ISkillNodeRef) => {
    if (r !== null) {
      childRefs.current.push(r);
    }
  };

  useEffect(() => {
    console.log('gdx: TreeNode', skillName, level);

    return () => {
      console.log('gdx: TreeNode destroy', skillName, level);
    };
  }, []);

  const updateLevelValue = (level: number) => {
    /** 排除空白节点 */
    if (isEmptyNode) {
      return;
    }

    setLevel(level);
    setSkillLevel(level);
  };

  /** 让父组件可以调用子组件的方法 */
  const reset = useCallback(() => {
    updateLevelValue(0);
    resetChildrenLevel();
  }, []);

  useImperativeHandle(
    curRef,
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
    if (isEmptyNode) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    const newLevel = Math.min(MAX_SKILL_LEVEL, level + 1);

    updateLevelValue(newLevel);
    onchange?.(newLevel, 'increase');
  };

  /** 鼠标右键 */
  const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isEmptyNode) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    if (level - 1 < MIN_PRE_SKILL_LEVEL) {
      resetChildrenLevel();
    }

    const newLevel = Math.max(0, level - 1);

    updateLevelValue(newLevel);
    onchange?.(newLevel, 'decrease');
  };

  /**
   * 处理子节点更新 level
   * @param level
   * @param type
   */
  const handleChange: ITreeNodeProps['onchange'] = useCallback(
    (_, type) => {
      /** 空节点往上透传 */
      if (isEmptyNode) {
        /** 传递给父组件 */
        return onchange?.(_, type);
      }

      /** 子节点减少加点等级不处理；当前节点等级大于等于最小前置等级不处理 */
      if (type === 'decrease' || level >= MIN_PRE_SKILL_LEVEL) {
        return;
      }

      updateLevelValue(MIN_PRE_SKILL_LEVEL);
      /** 传递给父组件 */
      onchange?.(MIN_PRE_SKILL_LEVEL, type);
    },
    [level, onchange, updateLevelValue],
  );

  const renderTreeNode = useCallback(
    (list: ITreeOption[], treeType: ETreeType) => {
      return list.map((childProps, index) => (
        <TreeNode
          ref={(r) => addChildRef(r)}
          key={index}
          onchange={handleChange}
          {...{
            ...childProps,
            type: treeType,
          }}
        />
      ));
    },
    [handleChange, level],
  );

  /** react 每次更新会触发子节点重新渲染，导致 ref 改变，存起来就行 */
  const { children, brothers } = useMemo(() => {
    childRefs.current = [];

    return {
      children: renderTreeNode(childList, ETreeType.CHILD),
      brothers: renderTreeNode(brotherList, ETreeType.BROTHER),
    };
    /** onchange 被内层函数使用，需要写到依赖里 */
  }, [level, onchange]);

  const subProps: ITreeNodeRendererProps = {
    data,
    level,
    onLeftClick: handleLeftClick,
    onRightClick: handleRightClick,
    children,
    brothers,
  };

  return render(subProps);
};

const TreeNode = forwardRef<ISkillNodeRef, ITreeNodeProps>((props, ref) => {
  const { childList = [], brotherList = [], type = ETreeType.ROOT } = props;

  const { mode } = useContext(treeContext);
  const isSkillPointsEditMode = mode === 'writable';

  const renderTreeNode = ({
    data,
    level,
    onLeftClick,
    onRightClick,
    children,
    brothers,
  }: ITreeNodeRendererProps) => {
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
            <div className="tree-node__content" onClick={onLeftClick} onContextMenu={onRightClick}>
              {Boolean(data) && (
                <SkillNode content={data.content} icon={data.icon} level={level}></SkillNode>
              )}
            </div>
            {hasChildren && <div className="tree-node__children">{children}</div>}
          </div>
        </div>
        {hasBrother && brothers}
      </>
    );
  };

  return isSkillPointsEditMode ? (
    <WritableTreeNodeAddon curRef={ref} render={renderTreeNode} {...props}></WritableTreeNodeAddon>
  ) : (
    <ReadableTreeNodeAddon curRef={ref} render={renderTreeNode} {...props}></ReadableTreeNodeAddon>
  );
});

export default TreeNode;
