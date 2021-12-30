import React, { FC, useState } from 'react';
import { ApartmentOutlined, FireOutlined } from '@ant-design/icons';

import './index.less';
import { Layout, Menu } from 'antd';
import SkillDescribe from '@/components/SkillDescribe';
import {
  AuxiliarySkill,
  CombatSkill,
  DefenceSkill,
  DualSwordSkill,
  ExistenceSkill,
  HalberdSkill,
  HuntingSkill,
  KnifeSkill,
  KnightSkill,
  MagicSkill,
  MilitantsSkill,
  PriestsSkill,
  ProtectSkill,
  SamuraiSkill,
  ShortSkill,
  SmasherSkill,
  SwordSkill,
  WizardSkill,
} from '@/components/SkillTree';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const SkillQuery: FC = () => {
  /** 技能菜单 */
  const skillMenu = [
    {
      name: '武器技能',
      skillTree: [
        { name: '剑术技能', tree: <SwordSkill /> },
        { name: '射击技能', tree: <ShortSkill /> },
        { name: '魔法技能', tree: <MagicSkill></MagicSkill> },
        { name: '格斗技能', tree: <CombatSkill></CombatSkill> },
        { name: '双剑技能', tree: <DualSwordSkill></DualSwordSkill> },
        { name: '斧枪技能', tree: <HalberdSkill></HalberdSkill> },
        { name: '武士技能', tree: <SamuraiSkill></SamuraiSkill> },
        { name: '破坏者技能', tree: <SmasherSkill></SmasherSkill> },
      ],
    },
    {
      name: '强化技能',
      skillTree: [
        { name: '防卫技能', tree: <DefenceSkill></DefenceSkill> },
        { name: '防护技能', tree: <ProtectSkill></ProtectSkill> },
        { name: '刀术技能', tree: <KnifeSkill></KnifeSkill> },
        { name: '骑士技能', tree: <KnightSkill></KnightSkill> },
        { name: '狩猎技能', tree: <HuntingSkill></HuntingSkill> },
        { name: '祭司技能', tree: <PriestsSkill></PriestsSkill> },
        { name: '暗杀技能', tree: <WizardSkill></WizardSkill> },
        { name: '巫师技能', tree: <AuxiliarySkill></AuxiliarySkill> },
      ],
    },
    {
      name: '辅助技能',
      skillTree: [
        { name: '辅助技能', tree: <div></div> },
        { name: '生存本能', tree: <ExistenceSkill></ExistenceSkill> },
        { name: '好战分子', tree: <MilitantsSkill></MilitantsSkill> },
      ],
    },
    {
      name: '技能书',
      skillTree: [
        { name: '暗黑之力', tree: <div></div> },
        { name: '魔剑技能', tree: <div></div> },
        { name: '舞者技能', tree: <div></div> },
        { name: '吟游诗人', tree: <div></div> },
        { name: '徒手战斗', tree: <div></div> },
        { name: '忍者技能', tree: <div></div> },
      ],
    },
    {
      name: '生活技能',
      skillTree: [
        { name: '锻冶大师', tree: <div></div> },
        { name: '炼金术师', tree: <div></div> },
        { name: '驯兽天分', tree: <div></div> },
      ],
    },
  ];

  /** 当前技能树 */
  const [currentTree, setCurrentTree] = useState({ name: '剑术技能', tree: <SwordSkill /> });

  const menuItem = () =>
    skillMenu.map((item) => (
      <SubMenu key={item.name} icon={<FireOutlined />} title={item.name}>
        {item.skillTree.map((skills) => (
          <Menu.Item
            key={skills.name + 'skill'}
            icon={<ApartmentOutlined />}
            onClick={() => setCurrentTree(skills)}
          >
            {skills.name}
          </Menu.Item>
        ))}
      </SubMenu>
    ));

  return (
    <div className="skill-query">
      <Layout className="skill-query_container">
        <Sider theme="light" className="el-menu-vertical">
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {menuItem()}
          </Menu>
        </Sider>
        <Layout className="site-layout el-menu-vertical">
          <Content style={{ margin: '0 16px' }}>
            {currentTree.tree}
            <div className="site-layout-background skill-query_content">
              <SkillDescribe></SkillDescribe>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default SkillQuery;
