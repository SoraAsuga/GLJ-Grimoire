import { atom, selector } from 'recoil';
import { SkillListItem } from './types';

export const todoListState = atom<SkillListItem[]>({
  key: 'skill-list/list',
  default: [],
});
