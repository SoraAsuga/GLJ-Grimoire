import { Sword, Shoot } from '@/common/img/skill-icons';
import SkillNode from '@/components/Tree/SkillNode';
import React, { FC } from 'react';
import Tree, { ITreeProps } from '../Tree';
import { ITreeOption } from '../Tree/types';

import './index.less';

export type ISkillTree = Pick<ITreeProps, 'mode' | 'catalog' | 'treeName'>;

/** 剑术技能 */
const swordSkill: ITreeOption[] = [
  {
    data: {
      content: '威力攻击',
      icon: Sword[0],
    },
    childList: [
      {
        data: {
          content: '迅捷攻击',
          icon: Sword[1],
        },
        childList: [
          {
            data: { content: '横扫千军', icon: Sword[2] },
            childList: [
              {
                data: { content: '爆气斩', icon: Sword[3] },
              },
            ],
            brotherList: [
              {
                childList: [
                  {
                    childList: [
                      {
                        data: { content: '流星坠击', icon: Sword[4] },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        data: { content: '音速斩切', icon: Sword[5] },
        childList: [
          {
            data: { content: '真空刃', icon: Sword[6] },
            childList: [{ data: { content: '风暴气流', icon: Sword[7] } }],
            brotherList: [
              {
                childList: [
                  {
                    childList: [
                      {
                        data: { content: '破坏之刃', icon: Sword[8] },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    data: { content: '剑术要领', icon: Sword[9] },
    childList: [
      {
        data: { content: '剑速提升', icon: Sword[10] },
        childList: [
          {
            data: { content: '大师级剑术', icon: Sword[11] },
          },
        ],
        brotherList: [
          {
            childList: [
              {
                childList: [
                  {
                    data: { content: '战吼', icon: Sword[12] },
                    childList: [{ data: { content: '狂战士之怒', icon: Sword[13] } }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const SwordSkill: FC<ISkillTree> = (props) => {
  return (
    <div className="skill-tree__background">
      {swordSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
      <div className="skill-tree__unique">
        <Tree
          {...props}
          data={{
            data: {
              content: '快速蹴击',
              icon: Sword[14],
            },
          }}
        ></Tree>
      </div>
    </div>
  );
};

/** 射击技能 */
const shortSkill: ITreeOption[] = [
  {
    data: { content: '威力射击', icon: Shoot[0] },
    childList: [
      {
        data: { content: '涡轮射击', icon: Shoot[1] },
        childList: [
          {
            childList: [{ data: { content: '弱点狙击', icon: Shoot[2] } }],
          },
          {
            data: { content: '箭雨', icon: Shoot[3] },
            childList: [{ childList: [{ data: { content: '交叉火线', icon: Shoot[4] } }] }],
          },
        ],
      },
      {
        data: { content: '粘液射击', icon: Shoot[5] },
        childList: [
          {
            data: { content: '麻痹射击', icon: Shoot[6] },
            childList: [
              {
                data: { content: '烟雾弹', icon: Shoot[7] },
                childList: [{ data: { content: '断腕击', icon: Shoot[8] } }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    data: { content: '弓术要领', icon: Shoot[9] },
    childList: [
      { data: { content: '匿踪', icon: Shoot[10] } },
      {
        childList: [
          {
            data: { content: '远程狙击', icon: Shoot[11] },
            childList: [
              {
                data: { content: '回气', icon: Shoot[12] },
                childList: [{ data: { content: '分身射手', icon: Shoot[13] } }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const ShortSkill: FC<ISkillTree> = (props) => {
  return (
    <div className="skill-tree__background">
      {shortSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
      <div className="skill-tree__unique">
        <Tree
          {...props}
          data={{
            data: {
              content: '破灭射击',
              icon: Shoot[14],
            },
          }}
        ></Tree>
      </div>
    </div>
  );
};

/** 魔法技能 */
const magicSkill: ITreeOption[] = [
  {
    data: { content: '法术/飞箭' },
    childList: [
      {
        data: { content: '法术/长枪' },
        childList: [
          {
            data: { content: '法术/魔法枪' },
            childList: [
              {
                data: { content: '法术/冲击波' },
                childList: [{ data: { content: '法术/终结' } }],
              },
            ],
          },
        ],
      },
      {
        data: { content: '法术/壁障' },
        childList: [
          {
            data: { content: '法术/引爆' },
            childList: [
              {
                data: { content: '法术/暴风' },
                childList: [{ data: { content: '法术/爆能' } }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    data: { content: '魔法要领' },
  },
  {
    data: { content: '魔力充填' },
    childList: [
      {
        childList: [
          {
            data: { content: '缩时咏唱' },
            childList: [
              {
                data: { content: '强射' },
                childList: [{ data: { content: '魔力灌充' } }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const MagicSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {magicSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
      <div className="skill-tree__unique">
        <SkillNode content="法术/光护"></SkillNode>
      </div>
    </div>
  );
};

/** 格斗技能 */
const combatSkill: ITreeOption[] = [
  {
    data: { content: '重击' },
    childList: [
      {
        data: { content: '痛击' },
        childList: [
          {
            data: { content: '穿甲' },
            childList: [
              {
                data: { content: '猛爆拳' },
                childList: [{ data: { content: '战车猛击' } }],
              },
            ],
          },
        ],
      },
      {
        data: { content: '音速波动' },
        childList: [
          {
            data: { content: '震地强袭' },
            childList: [
              {
                data: { content: '三段击' },
                childList: [{ data: { content: '疾袭' } }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    data: { content: '格斗要领' },
    childList: [
      {
        childList: [
          {
            childList: [
              {
                data: { content: '体术锻炼' },
                childList: [{ data: { content: '经络脉轮' } }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    data: { content: '乘胜追击' },
    childList: [{ childList: [{ data: { content: '猛力追击' } }] }],
  },
];

export const CombatSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {combatSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
      <div className="skill-tree__unique">
        <SkillNode content="滑行"></SkillNode>
      </div>
    </div>
  );
};

/** 双剑技能 */
const dualSwordSkill: ITreeOption[] = [
  {
    data: { content: '双剑要领' },
    childList: [
      {
        data: { content: '双弧斩' },
        childList: [
          {
            data: { content: '破空刃' },
            childList: [{ data: { content: '幻影剑' } }],
          },
        ],
      },
      {
        data: { content: '御空破阵' },
        childList: [
          {
            data: { content: '猛爆斩' },
            childList: [
              {
                data: { content: '剑影' },
                childList: [{ data: { content: '闪光交叉' } }],
              },
            ],
          },
        ],
      },
      {
        data: { content: '步步为营' },
        childList: [
          {
            childList: [
              {
                data: { content: '剑闪' },
                childList: [{ data: { content: '疾风收割' } }],
              },
            ],
          },
        ],
      },
      {
        data: { content: '双剑锻炼' },
        childList: [
          {
            data: { content: '神速轨迹' },
            childList: [{ childList: [{ data: { content: '剑舞灵光' } }] }],
          },
        ],
      },
    ],
  },
];

export const DualSwordSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {dualSwordSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 斧枪技能 */
const halberdSkill: ITreeOption[] = [
  {
    data: { content: '迅捷突刺' },
    childList: [
      {
        data: { content: '鸿鹄一掷' },
        childList: [
          {
            data: { content: '龙尾' },
            childList: [{ data: { content: '潜龙撼地' } }],
            brotherList: [
              {
                childList: [{ childList: [{ data: { content: '龙牙击' } }] }],
              },
            ],
          },
        ],
      },
      {
        data: { content: '死亡斧枪' },
        childList: [
          {
            childList: [
              {
                data: { content: '穿刺击' },
                childList: [{ data: { content: '时空驱动' } }],
              },
            ],
          },
          { data: { content: '惩戒之枪' } },
        ],
      },
    ],
  },
  {
    data: { content: '斧枪要领' },
    childList: [{ childList: [{ childList: [{ data: { content: '凝聚心神' } }] }] }],
  },
  {
    data: { content: '破风之势' },
    childList: [
      {
        childList: [
          {
            data: { content: '逆境怒吼' },
            childList: [{ childList: [{ data: { content: '神速掌握' } }] }],
          },
        ],
      },
    ],
  },
];

export const HalberdSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {halberdSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
      <div className="skill-tree__unique">
        <SkillNode content="破坏矛"></SkillNode>
      </div>
    </div>
  );
};

/** 武士技能 */
const samuraiSkill: ITreeOption[] = [
  {
    data: { content: '一闪' },
    childList: [
      {
        data: { content: '波动刃' },
        childList: [
          {
            data: { content: '三段突刺' },
            childList: [
              {
                data: { content: '八相发破' },
                childList: [{ data: { content: '天乱流星' } }, { data: { content: '画龙点睛' } }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    data: { content: '刀柄打击' },
    childList: [
      {
        childList: [
          {
            data: { content: '断祸' },
            childList: [{ data: { content: '斩钉截铁' } }],
          },
        ],
      },
    ],
  },
  {
    data: { content: '武士道' },
    childList: [
      { childList: [{ childList: [{ data: { content: '缩地' } }] }] },
      {
        data: { content: '双手合持' },
        childList: [
          {
            data: { content: '明镜止水' },
            childList: [{ childList: [{ data: { content: '怪力乱神' } }] }],
          },
        ],
      },
    ],
  },
];

export const SamuraiSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {samuraiSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
      <div className="skill-tree__unique">
        <SkillNode content="弹刀"></SkillNode>
      </div>
    </div>
  );
};

/** 粉碎者技能 */
const smasherSkill: ITreeOption[] = [
  {
    data: { content: '正拳突击' },
    childList: [
      {
        data: { content: '巨人烈破' },
        childList: [{ data: { content: '神之手' } }],
      },
    ],
  },
  {
    data: { content: '呼吸法' },
    childList: [
      { data: { content: '飞踢' } },
      {
        data: { content: '组合拳' },
        childList: [{ data: { content: '破坏者' } }],
      },
    ],
  },
];

export const SmasherSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {smasherSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 防卫技能 */
const defenceSkill: ITreeOption[] = [
  {
    data: { content: '重防具要领' },
    childList: [
      { data: { content: '进阶阻挡' } },
      { childList: [{ data: { content: '物理防御' } }] },
    ],
  },
  {
    data: { content: '轻防具要领' },
    childList: [
      { data: { content: '进阶闪躲' } },
      { childList: [{ data: { content: '幻象迷踪' } }] },
    ],
  },
];

export const DefenceSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {defenceSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 防护技能 */
const protectSkill: ITreeOption[] = [
  {
    data: { content: '盾牌要领' },
    childList: [
      {
        data: { content: '重盾击' },
        childList: [
          {
            data: { content: '飞盾' },
            childList: [{ data: { content: '伤害反弹' } }],
          },
        ],
      },
      {
        data: { content: '防护盾甲' },
        childList: [{ data: { content: '防魔盾甲' } }],
      },
    ],
  },
  {
    data: { content: '防御界限' },
    childList: [
      {
        data: { content: '魔法庇护' },
        childList: [{ childList: [{ data: { content: '移花接木' } }] }],
      },
    ],
  },
];

export const ProtectSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {protectSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 刀术技能 */
const knifeSkill: ITreeOption[] = [
  {
    data: { content: '飞刃' },
    childList: [
      {
        data: { content: '定影针' },
        childList: [
          {
            data: { content: '加特林机枪' },
            childList: [{ data: { content: '神乎其技' } }],
          },
        ],
      },
      {
        data: { content: '毒飞刃' },
        childList: [{ data: { content: '连环刃' } }],
      },
    ],
  },
  {
    data: { content: '无影刃' },
    childList: [
      {
        data: { content: '威力增强' },
        childList: [{ childList: [{ data: { content: '装甲破坏' } }] }],
      },
    ],
  },
];

export const KnifeSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {knifeSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 骑士技能 */
const knightSkill: ITreeOption[] = [
  {
    data: { content: '突击' },
    childList: [
      {
        data: { content: '卸力' },
        childList: [
          {
            data: { content: '完善守备' },
            childList: [{ data: { content: '重骑觉醒' } }],
          },
        ],
      },
    ],
  },
  {
    data: { content: '挑衅' },
    childList: [
      {
        data: { content: '愤怒的一击' },
        childList: [
          {
            data: { content: '系影强袭' },
            childList: [{ data: { content: '骑士决意' } }],
          },
        ],
        brotherList: [
          {
            data: { content: '音速挤压' },
            childList: [{ data: { content: '归来' } }],
          },
        ],
      },
    ],
  },
  {
    data: { content: '骑士勇姿' },
    childList: [{ childList: [{ childList: [{ data: { content: '骑士治愈' } }] }] }],
  },
];

export const KnightSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {knightSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 狩猎技能 */
const huntingSkill: ITreeOption[] = [
  {
    data: { content: '腿踢' },
    childList: [
      {
        data: { content: '旭日之箭' },
        childList: [
          {
            data: { content: '力量之箭' },
            childList: [{ data: { content: '星坠' } }],
          },
        ],
      },
    ],
  },
  {
    data: { content: '沉睡陷阱' },
    childList: [
      {
        data: { content: '绊脚陷阱' },
        childList: [
          {
            data: { content: '猛爆地雷' },
            childList: [{ data: { content: '乏力陷阱' } }],
          },
        ],
      },
    ],
  },
];

export const HuntingSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {huntingSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 祭司技能 */
const priestsSkill: ITreeOption[] = [
  {
    data: { content: '祝福' },
    childList: [
      {
        data: { content: '荣耀颂歌' },
        childList: [
          {
            data: { content: '强化祝福' },
            childList: [{ data: { content: '高贵治愈' } }],
          },
        ],
      },
    ],
  },
  {
    data: { content: '神圣之拳' },
    childList: [
      {
        data: { content: '神圣光辉' },
        childList: [
          {
            data: { content: '空灵壁障' },
            childList: [{ data: { content: '祈祷' } }],
          },
        ],
      },
    ],
  },
];

export const PriestsSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {priestsSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 巫师技能 */
const wizardSkill: ITreeOption[] = [
  {
    data: { content: '使魔' },
    childList: [
      { childList: [{ data: { content: '闪电术' } }] },
      {
        childList: [
          {
            data: { content: '暴风雪' },
            childList: [
              {
                data: { content: '流星轰炸' },
                childList: [{ data: { content: '帝王之光' } }],
              },
            ],
          },
        ],
      },
      {
        data: { content: '魔力水晶' },
        childList: [
          {
            childList: [
              {
                data: { content: '石肤术' },
                childList: [{ data: { content: '高阶使魔' } }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const WizardSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      {wizardSkill.map((data, index) => (
        <Tree key={index} data={data} {...props}></Tree>
      ))}
    </div>
  );
};

/** 辅助技能 */
const auxiliarySkill: ITreeOption[] = [
  {
    data: { content: '治愈术' },
    childList: [
      {
        data: { content: '异常抗体' },
        childList: [
          {
            data: { content: '圣域' },
            childList: [{ data: { content: '愈合' } }],
          },
        ],
      },
    ],
  },
  {
    data: { content: '生命能源' },
    childList: [
      {
        data: { content: '勇气源泉' },
        childList: [
          {
            data: { content: '高速咏域' },
            childList: [{ data: { content: '高速行动' } }],
          },
        ],
      },
    ],
  },
  {
    data: { content: '魔力源泉' },
    childList: [
      {
        data: { content: '魔法防护' },
        childList: [
          {
            data: { content: '异常防护' },
            childList: [{ data: { content: '神速反应' } }],
          },
        ],
      },
    ],
  },
];

export const AuxiliarySkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background-unique">
      <div className="skill-tree__unique-first">
        <SkillNode content="急救"></SkillNode>
      </div>
      <div>
        {' '}
        {auxiliarySkill.map((data, index) => (
          <Tree key={index} data={data} {...props}></Tree>
        ))}
      </div>
    </div>
  );
};

/** 好战分子 */
const militantsSkill: ITreeOption[] = [
  {
    data: { content: '提升魔力' },
    childList: [
      {
        data: { content: '专注' },
        childList: [
          {
            data: { content: '顽强抵抗' },
            childList: [
              {
                data: { content: '魔力增强' },
                childList: [{ data: { content: '分段爆裂' } }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    data: { content: '提升攻击力' },
    childList: [
      {
        data: { content: '强打' },
        childList: [
          {
            data: { content: '提升暴击率' },
            childList: [
              {
                data: { content: '威吓之力' },
                childList: [{ data: { content: '追击之真髓' } }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    data: { content: '提升防御力' },
    childList: [
      {
        data: { content: '提升回避率' },
        childList: [
          {
            data: { content: '提升命中率' },
            childList: [
              {
                data: { content: '守护要诀' },
                childList: [{ data: { content: '超凡掌握' } }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const MilitantsSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background">
      <div>
        {militantsSkill.map((data, index) => (
          <Tree key={index} data={data} {...props}></Tree>
        ))}
      </div>
    </div>
  );
};

/** 生存本能 */
const existenceSkill: ITreeOption[] = [
  {
    data: { content: '安心休息' },
    childList: [{ data: { content: 'HP突破' } }, { data: { content: '游刃有余' } }],
  },
  {
    data: { content: '喘一口气' },
    childList: [{ data: { content: 'MP突破' } }, { data: { content: '沉着以对' } }],
  },
];

export const ExistenceSkill = (props: ISkillTree) => {
  return (
    <div className="skill-tree__background-unique">
      <div className="skill-tree__unique-first">
        <div className="skill-tree__unique-skill">
          <SkillNode content="装死"></SkillNode>
        </div>
        <div className="skill-tree__unique-skill">
          <SkillNode content="经验值提升"></SkillNode>
        </div>
        <div className="skill-tree__unique-skill">
          <SkillNode content="掉宝率提升"></SkillNode>
        </div>
      </div>
      <div>
        {existenceSkill.map((data, index) => (
          <Tree key={index} data={data} {...props}></Tree>
        ))}
      </div>
    </div>
  );
};
