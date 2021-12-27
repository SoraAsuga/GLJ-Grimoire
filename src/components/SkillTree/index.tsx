import SkillNode from '@/pages/SkillQuery/components/SkillNode';
import React, { FC } from 'react';
import Tree from '../Tree';
import { ITreeOption } from '../Tree/types';

import './index.less';

/** 剑术技能 */
const swordSkill: ITreeOption[] = [
  {
    content: <SkillNode content="威力攻击"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="迅捷攻击"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="横扫千军"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="爆气斩"></SkillNode>,
              },
            ],
            brotherList: [
              {
                childList: [
                  {
                    childList: [
                      {
                        content: <SkillNode content="流星坠击"></SkillNode>,
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
        content: <SkillNode content="音速斩切"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="真空刃"></SkillNode>,
            childList: [{ content: <SkillNode content="风暴气流"></SkillNode> }],
            brotherList: [
              {
                childList: [
                  {
                    childList: [
                      {
                        content: <SkillNode content="破坏之刃"></SkillNode>,
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
    content: <SkillNode content="剑术要领"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="剑速提升"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="大师级剑术"></SkillNode>,
          },
        ],
        brotherList: [
          {
            childList: [
              {
                childList: [
                  {
                    content: <SkillNode content="战吼"></SkillNode>,
                    childList: [{ content: <SkillNode content="狂战士之怒"></SkillNode> }],
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

export const SwordSkill = () => {
  return (
    <div className="skill-tree__background">
      {swordSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
      <div className="skill-tree__unique">
        <SkillNode content="快速蹴击"></SkillNode>
      </div>
    </div>
  );
};

/** 射击技能 */
const shortSkill: ITreeOption[] = [
  {
    content: <SkillNode content="威力射击"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="涡轮射击"></SkillNode>,
        childList: [
          {
            childList: [{ content: <SkillNode content="弱点狙击"></SkillNode> }],
          },
          {
            content: <SkillNode content="剑雨"></SkillNode>,
            childList: [{ childList: [{ content: <SkillNode content="交叉火线"></SkillNode> }] }],
          },
        ],
      },
      {
        content: <SkillNode content="粘液射击"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="麻痹射击"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="烟雾弹"></SkillNode>,
                childList: [{ content: <SkillNode content="断腕击"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="弓术要领"></SkillNode>,
    childList: [
      { content: <SkillNode content="匿踪"></SkillNode> },
      {
        childList: [
          {
            content: <SkillNode content="远程狙击"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="回气"></SkillNode>,
                childList: [{ content: <SkillNode content="分身射手"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const ShortSkill = () => {
  return (
    <div className="skill-tree__background">
      {shortSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
      <div className="skill-tree__unique">
        <SkillNode content="破灭射击"></SkillNode>
      </div>
    </div>
  );
};

/** 魔法技能 */
const magicSkill: ITreeOption[] = [
  {
    content: <SkillNode content="法术/飞箭"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="法术/长枪"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="法术/魔法枪"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="法术/冲击波"></SkillNode>,
                childList: [{ content: <SkillNode content="法术/终结"></SkillNode> }],
              },
            ],
          },
        ],
      },
      {
        content: <SkillNode content="法术/壁障"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="法术/引爆"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="法术/暴风"></SkillNode>,
                childList: [{ content: <SkillNode content="法术/爆能"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="魔法要领"></SkillNode>,
  },
  {
    content: <SkillNode content="魔力充填"></SkillNode>,
    childList: [
      {
        childList: [
          {
            content: <SkillNode content="缩时咏唱"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="强射"></SkillNode>,
                childList: [{ content: <SkillNode content="魔力灌充"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const MagicSkill = () => {
  return (
    <div className="skill-tree__background">
      {magicSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
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
    content: <SkillNode content="重击"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="痛击"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="穿甲"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="猛爆拳"></SkillNode>,
                childList: [{ content: <SkillNode content="战车猛击"></SkillNode> }],
              },
            ],
          },
        ],
      },
      {
        content: <SkillNode content="音速波动"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="震地强袭"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="三段击"></SkillNode>,
                childList: [{ content: <SkillNode content="疾袭"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="格斗要领"></SkillNode>,
    childList: [
      {
        childList: [
          {
            childList: [
              {
                content: <SkillNode content="体术锻炼"></SkillNode>,
                childList: [{ content: <SkillNode content="经络脉轮"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="乘胜追击"></SkillNode>,
    childList: [{ childList: [{ content: <SkillNode content="猛力追击"></SkillNode> }] }],
  },
];

export const CombatSkill = () => {
  return (
    <div className="skill-tree__background">
      {combatSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
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
    content: <SkillNode content="双剑要领"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="双弧斩"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="破空刃"></SkillNode>,
            childList: [{ content: <SkillNode content="幻影剑"></SkillNode> }],
          },
        ],
      },
      {
        content: <SkillNode content="御空破阵"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="猛爆斩"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="剑影"></SkillNode>,
                childList: [{ content: <SkillNode content="闪光交叉"></SkillNode> }],
              },
            ],
          },
        ],
      },
      {
        content: <SkillNode content="步步为营"></SkillNode>,
        childList: [
          {
            childList: [
              {
                content: <SkillNode content="剑闪"></SkillNode>,
                childList: [{ content: <SkillNode content="疾风收割"></SkillNode> }],
              },
            ],
          },
        ],
      },
      {
        content: <SkillNode content="双剑锻炼"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="神速轨迹"></SkillNode>,
            childList: [{ childList: [{ content: <SkillNode content="剑舞灵光"></SkillNode> }] }],
          },
        ],
      },
    ],
  },
];

export const DualSwordSkill = () => {
  return (
    <div className="skill-tree__background">
      {dualSwordSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 斧枪技能 */
const halberdSkill: ITreeOption[] = [
  {
    content: <SkillNode content="迅捷突刺"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="鸿鹄一掷"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="龙尾"></SkillNode>,
            childList: [{ content: <SkillNode content="潜龙撼地"></SkillNode> }],
            brotherList: [
              {
                childList: [{ childList: [{ content: <SkillNode content="龙牙击"></SkillNode> }] }],
              },
            ],
          },
        ],
      },
      {
        content: <SkillNode content="死亡斧枪"></SkillNode>,
        childList: [
          {
            childList: [
              {
                content: <SkillNode content="穿刺击"></SkillNode>,
                childList: [{ content: <SkillNode content="时空驱动"></SkillNode> }],
              },
            ],
          },
          { content: <SkillNode content="惩戒之枪"></SkillNode> },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="斧枪要领"></SkillNode>,
    childList: [
      { childList: [{ childList: [{ content: <SkillNode content="凝聚心神"></SkillNode> }] }] },
    ],
  },
  {
    content: <SkillNode content="破风之势"></SkillNode>,
    childList: [
      {
        childList: [
          {
            content: <SkillNode content="逆境怒吼"></SkillNode>,
            childList: [{ childList: [{ content: <SkillNode content="神速掌握"></SkillNode> }] }],
          },
        ],
      },
    ],
  },
];

export const HalberdSkill = () => {
  return (
    <div className="skill-tree__background">
      {halberdSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
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
    content: <SkillNode content="一闪"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="波动刃"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="三段突刺"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="八相发破"></SkillNode>,
                childList: [
                  { content: <SkillNode content="天乱流星"></SkillNode> },
                  { content: <SkillNode content="画龙点睛"></SkillNode> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="刀柄打击"></SkillNode>,
    childList: [
      {
        childList: [
          {
            content: <SkillNode content="断祸"></SkillNode>,
            childList: [{ content: <SkillNode content="斩钉截铁"></SkillNode> }],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="武士道"></SkillNode>,
    childList: [
      { childList: [{ childList: [{ content: <SkillNode content="缩地"></SkillNode> }] }] },
      {
        content: <SkillNode content="双手合持"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="明镜止水"></SkillNode>,
            childList: [{ childList: [{ content: <SkillNode content="怪力乱神"></SkillNode> }] }],
          },
        ],
      },
    ],
  },
];

export const SamuraiSkill = () => {
  return (
    <div className="skill-tree__background">
      {samuraiSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
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
    content: <SkillNode content="正拳突击"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="巨人烈破"></SkillNode>,
        childList: [{ content: <SkillNode content="神之手"></SkillNode> }],
      },
    ],
  },
  {
    content: <SkillNode content="呼吸法"></SkillNode>,
    childList: [
      { content: <SkillNode content="飞踢"></SkillNode> },
      {
        content: <SkillNode content="组合拳"></SkillNode>,
        childList: [{ content: <SkillNode content="破坏者"></SkillNode> }],
      },
    ],
  },
];

export const SmasherSkill = () => {
  return (
    <div className="skill-tree__background">
      {smasherSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 防卫技能 */
const defenceSkill: ITreeOption[] = [
  {
    content: <SkillNode content="重防具要领"></SkillNode>,
    childList: [
      { content: <SkillNode content="进阶阻挡"></SkillNode> },
      { childList: [{ content: <SkillNode content="物理防御"></SkillNode> }] },
    ],
  },
  {
    content: <SkillNode content="轻防具要领"></SkillNode>,
    childList: [
      { content: <SkillNode content="进阶闪躲"></SkillNode> },
      { childList: [{ content: <SkillNode content="幻象迷踪"></SkillNode> }] },
    ],
  },
];

export const DefenceSkill = () => {
  return (
    <div className="skill-tree__background">
      {defenceSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 防护技能 */
const protectSkill: ITreeOption[] = [
  {
    content: <SkillNode content="盾牌要领"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="重盾击"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="飞盾"></SkillNode>,
            childList: [{ content: <SkillNode content="伤害反弹"></SkillNode> }],
          },
        ],
      },
      {
        content: <SkillNode content="防护盾甲"></SkillNode>,
        childList: [{ content: <SkillNode content="防魔盾甲"></SkillNode> }],
      },
    ],
  },
  {
    content: <SkillNode content="防御界限"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="魔法庇护"></SkillNode>,
        childList: [{ childList: [{ content: <SkillNode content="移花接木"></SkillNode> }] }],
      },
    ],
  },
];

export const ProtectSkill = () => {
  return (
    <div className="skill-tree__background">
      {protectSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 刀术技能 */
const knifeSkill: ITreeOption[] = [
  {
    content: <SkillNode content="飞刃"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="定影针"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="加特林机枪"></SkillNode>,
            childList: [{ content: <SkillNode content="神乎其技"></SkillNode> }],
          },
        ],
      },
      {
        content: <SkillNode content="毒飞刃"></SkillNode>,
        childList: [{ content: <SkillNode content="连环刃"></SkillNode> }],
      },
    ],
  },
  {
    content: <SkillNode content="无影刃"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="威力增强"></SkillNode>,
        childList: [{ childList: [{ content: <SkillNode content="装甲破坏"></SkillNode> }] }],
      },
    ],
  },
];

export const KnifeSkill = () => {
  return (
    <div className="skill-tree__background">
      {knifeSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 骑士技能 */
const knightSkill: ITreeOption[] = [
  {
    content: <SkillNode content="突击"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="卸力"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="完善守备"></SkillNode>,
            childList: [{ content: <SkillNode content="重骑觉醒"></SkillNode> }],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="挑衅"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="愤怒的一击"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="系影强袭"></SkillNode>,
            childList: [{ content: <SkillNode content="骑士决意"></SkillNode> }],
          },
        ],
        brotherList: [
          {
            content: <SkillNode content="音速挤压"></SkillNode>,
            childList: [{ content: <SkillNode content="归来"></SkillNode> }],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="骑士勇姿"></SkillNode>,
    childList: [
      { childList: [{ childList: [{ content: <SkillNode content="骑士治愈"></SkillNode> }] }] },
    ],
  },
];

export const KnightSkill = () => {
  return (
    <div className="skill-tree__background">
      {knightSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 狩猎技能 */
const huntingSkill: ITreeOption[] = [
  {
    content: <SkillNode content="腿踢"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="旭日之箭"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="力量之箭"></SkillNode>,
            childList: [{ content: <SkillNode content="星坠"></SkillNode> }],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="沉睡陷阱"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="绊脚陷阱"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="猛爆地雷"></SkillNode>,
            childList: [{ content: <SkillNode content="乏力陷阱"></SkillNode> }],
          },
        ],
      },
    ],
  },
];

export const HuntingSkill = () => {
  return (
    <div className="skill-tree__background">
      {huntingSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 祭司技能 */
const priestsSkill: ITreeOption[] = [
  {
    content: <SkillNode content="祝福"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="荣耀颂歌"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="强化祝福"></SkillNode>,
            childList: [{ content: <SkillNode content="高贵治愈"></SkillNode> }],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="神圣之拳"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="神圣光辉"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="空灵壁障"></SkillNode>,
            childList: [{ content: <SkillNode content="祈祷"></SkillNode> }],
          },
        ],
      },
    ],
  },
];

export const PriestsSkill = () => {
  return (
    <div className="skill-tree__background">
      {priestsSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 巫师技能 */
const wizardSkill: ITreeOption[] = [
  {
    content: <SkillNode content="使魔"></SkillNode>,
    childList: [
      { childList: [{ content: <SkillNode content="闪电术"></SkillNode> }] },
      {
        childList: [
          {
            content: <SkillNode content="暴风雪"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="流星轰炸"></SkillNode>,
                childList: [{ content: <SkillNode content="帝王之光"></SkillNode> }],
              },
            ],
          },
        ],
      },
      {
        content: <SkillNode content="魔力水晶"></SkillNode>,
        childList: [
          {
            childList: [
              {
                content: <SkillNode content="石肤术"></SkillNode>,
                childList: [{ content: <SkillNode content="高阶使魔"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const WizardSkill = () => {
  return (
    <div className="skill-tree__background">
      {wizardSkill.map((data, index) => (
        <Tree key={index} data={data}></Tree>
      ))}
    </div>
  );
};

/** 辅助技能 */
const auxiliarySkill: ITreeOption[] = [
  {
    content: <SkillNode content="治愈术"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="异常抗体"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="圣域"></SkillNode>,
            childList: [{ content: <SkillNode content="愈合"></SkillNode> }],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="生命能源"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="勇气源泉"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="高速咏域"></SkillNode>,
            childList: [{ content: <SkillNode content="高速行动"></SkillNode> }],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="魔力源泉"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="魔法防护"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="异常防护"></SkillNode>,
            childList: [{ content: <SkillNode content="神速反应"></SkillNode> }],
          },
        ],
      },
    ],
  },
];

export const AuxiliarySkill = () => {
  return (
    <div className="skill-tree__background-unique">
      <div className="skill-tree__unique-first">
        <SkillNode content="急救"></SkillNode>
      </div>
      <div>
        {' '}
        {auxiliarySkill.map((data, index) => (
          <Tree key={index} data={data}></Tree>
        ))}
      </div>
    </div>
  );
};

/** 好战分子 */
const militantsSkill: ITreeOption[] = [
  {
    content: <SkillNode content="提升魔力"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="专注"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="顽强抵抗"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="魔力增强"></SkillNode>,
                childList: [{ content: <SkillNode content="分段爆裂"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="提升攻击力"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="强打"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="提升暴击率"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="威吓之力"></SkillNode>,
                childList: [{ content: <SkillNode content="追击之真髓"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    content: <SkillNode content="提升防御力"></SkillNode>,
    childList: [
      {
        content: <SkillNode content="提升回避率"></SkillNode>,
        childList: [
          {
            content: <SkillNode content="提升命中率"></SkillNode>,
            childList: [
              {
                content: <SkillNode content="守护要诀"></SkillNode>,
                childList: [{ content: <SkillNode content="超凡掌握"></SkillNode> }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const MilitantsSkill = () => {
  return (
    <div className="skill-tree__background">
      <div>
        {militantsSkill.map((data, index) => (
          <Tree key={index} data={data}></Tree>
        ))}
      </div>
    </div>
  );
};

/** 生存本能 */
const existenceSkill: ITreeOption[] = [
  {
    content: <SkillNode content="安心休息"></SkillNode>,
    childList: [
      { content: <SkillNode content="HP突破"></SkillNode> },
      { content: <SkillNode content="游刃有余"></SkillNode> },
    ],
  },
  {
    content: <SkillNode content="喘一口气"></SkillNode>,
    childList: [
      { content: <SkillNode content="MP突破"></SkillNode> },
      { content: <SkillNode content="沉着以对"></SkillNode> },
    ],
  },
];

export const ExistenceSkill = () => {
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
          <Tree key={index} data={data}></Tree>
        ))}
      </div>
    </div>
  );
};
