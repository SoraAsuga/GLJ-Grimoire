export enum ETreeType {
  ROOT,
  CHILD,
  BROTHER,
}

export interface ISkillNodeProps {
  content: string;
  icon?: React.ReactNode;
  level?: number;
}

export interface ITreeOption {
  type?: ETreeType;
  /** 树节点需要的数据 */
  data?: ISkillNodeProps;
  childList?: ITreeOption[];
  brotherList?: ITreeOption[];
}
