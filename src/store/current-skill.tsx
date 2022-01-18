import { atom } from 'recoil';

export const currentSkillState = atom<string>({
  key: 'current-skill/skill',
  default: '',
});