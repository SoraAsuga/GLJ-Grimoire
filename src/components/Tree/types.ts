export enum ETreeType {
  ROOT,
  CHILD,
  BROTHER,
}

export interface ITreeOption {
  content?: React.ReactNode;
  childList?: ITreeOption[];
  brotherList?: ITreeOption[];
  type?: ETreeType;
}
