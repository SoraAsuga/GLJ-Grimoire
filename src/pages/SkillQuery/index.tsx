import React, { FC, useState } from 'react';
import IMG_LOGO from '@/common/img/logo.png';

import './index.less';
import { RollbackOutlined } from '@ant-design/icons';

const allSkill = [
  {
    name: '武器技能',
    skillTree: [
      '剑术技能',
      '射击技能',
      '魔法技能',
      '格斗技能',
      '双剑技能',
      '斧枪技能',
      '武士技能',
      '破坏者技能',
    ],
  },
  {
    name: '强化技能',
    skillTree: [
      '防卫技能',
      '防护技能',
      '刀术技能',
      '骑士技能',
      '狩猎技能',
      '祭司技能',
      '暗杀技能',
      '巫师技能',
    ],
  },
  {
    name: '辅助技能',
    skillTree: ['辅助技能', '生存本能', '好战分子'],
  },
  {
    name: '技能书',
    skillTree: ['暗黑之力', '魔剑技能', '舞者技能', '吟游诗人', '徒手战斗', '忍者技能'],
  },
  {
    name: '生活技能',
    skillTree: ['锻冶大师', '炼金术师', '驯兽天分'],
  },
];

interface IProps {
  skillTree: any[];
}

interface SkillQueryProps {
  name: string;
  changeShow: () => void;
}

const SkillTreeShow: FC<IProps> = (props) => {
  const { skillTree } = props;
  const showSkills = () => {
    return skillTree.map((item) => {
      return (
        <button key={item} className="show-skills">
          {item}
        </button>
      );
    });
  };

  return <div className="skill-query__show-skills">{showSkills()}</div>;
};

const SkillQueryShow: FC<SkillQueryProps> = (props) => {
  const { name, changeShow } = props;

  const skillTreeShow = () => {
    return allSkill
      .filter((item) => name === item.name)
      .map((item) => {
        return <SkillTreeShow key={item.name} skillTree={item.skillTree} />;
      });
  };

  return (
    <section className="skill-query__show">
      <div className="skill-query__show-content">
        <header className="skill-query__show-header">
          <button onClick={changeShow} className="skill-query__show-close">
            <RollbackOutlined />
          </button>
          <div className="skill-query__show-title">{name}</div>
        </header>
        {skillTreeShow()}
      </div>
    </section>
  );
};

const SkillQuery: FC = () => {
  const [showWeapon, setShowWeapon] = useState(false);
  const [showStrengthen, setShowStrengthen] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [showLife, setShowLife] = useState(false);

  const changeShow = (type: number) => () => {
    switch (type) {
      case 1:
        setShowWeapon(!showWeapon);
        break;
      case 2:
        setShowStrengthen(!showStrengthen);
        break;
      case 3:
        setShowBook(!showBook);
        break;
      case 4:
        setShowLife(!showLife);
        break;
      default:
    }
  };

  return (
    <section className="skill-query">
      {showWeapon && <SkillQueryShow name="武器技能" changeShow={changeShow(1)} />}
      {showStrengthen && <SkillQueryShow name="强化技能" changeShow={changeShow(2)} />}
      {showBook && <SkillQueryShow name="技能书" changeShow={changeShow(3)} />}
      {showLife && <SkillQueryShow name="生活技能" changeShow={changeShow(4)} />}
      <section className="skill-query__menu">
        <button className="skill-query__menu-btn" onClick={changeShow(1)}>
          武器技能
        </button>
        <button className="skill-query__menu-btn" onClick={changeShow(2)}>
          强化技能
        </button>
        <button className="skill-query__menu-btn" onClick={changeShow(3)}>
          技能书
        </button>
        <button className="skill-query__menu-btn" onClick={changeShow(4)}>
          生活技能
        </button>
      </section>
    </section>
  );
};

export default SkillQuery;
