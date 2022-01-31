import { atom } from 'recoil';
import { ISkillTree, ShortSkill, SwordSkill } from '@/components/SkillTree';

export interface ISkillConfig {
  name: string;
  id: string;
  data: Record<string, ISkillPointData[]>;
}

export interface ISkillPointData {
  name: string;
  data: React.FC<ISkillTree>;
  chose: boolean;
  skillData: Record<string, number>;
}

export const skillConfigurationState = atom<ISkillConfig[]>({
  key: 'skill-configuration/configuration',
  default: [
    {
      name: '配置1',
      id: 'default',
      data: {
        武器技能: [
          {
            name: '剑术技能',
            data: SwordSkill,
            chose: false,
            skillData: {
              威力攻击: 5,
              迅捷攻击: 0,
              横扫千军: 0,
              爆气斩: 0,
              流星坠击: 0,
              音速斩切: 0,
              真空刃: 0,
              风暴气流: 0,
              破坏之刃: 0,
              剑术要领: 0,
              剑速提升: 0,
              大师级剑术: 0,
              战吼: 0,
              狂战士之怒: 0,
              快速蹴击: 0,
            },
          },
          {
            name: '射击技能',
            data: ShortSkill,
            chose: false,
            skillData: {
              威力射击: 0,
              涡轮射击: 0,
              弱点狙击: 0,
              箭雨: 0,
              交叉火线: 0,
              粘液射击: 0,
              麻痹射击: 0,
              烟雾弹: 0,
              断腕击: 0,
              弓术要领: 0,
              匿踪: 0,
              远程狙击: 0,
              回气: 0,
              分身射手: 0,
              破灭射击: 0,
            },
          },
        ],
      },
    },
  ],
});
