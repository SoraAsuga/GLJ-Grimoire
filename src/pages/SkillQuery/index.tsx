import React, { FC, useState } from 'react';
import { ApartmentOutlined, FireOutlined } from '@ant-design/icons';

import './index.less';
import { Layout, Menu } from 'antd';
import { ITreeOption } from '@/components/Tree/types';
import Tree from '@/components/Tree';
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
import SkillNode from './components/SkillNode';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const SkillQuery: FC = () => {
  /** 技能菜单 */
  const skillMenu = [
    {
      name: '武器技能',
      skillTree: [
        { name: '剑术技能' },
        { name: '射击技能' },
        { name: '魔法技能' },
        { name: '格斗技能' },
        { name: '双剑技能' },
        { name: '斧枪技能' },
        { name: '武士技能' },
        { name: '破坏者技能' },
      ],
    },
    {
      name: '强化技能',
      skillTree: [
        { name: '防卫技能' },
        { name: '防护技能' },
        { name: '刀术技能' },
        { name: '骑士技能' },
        { name: '狩猎技能' },
        { name: '祭司技能' },
        { name: '暗杀技能' },
        { name: '巫师技能' },
      ],
    },
    {
      name: '辅助技能',
      skillTree: [{ name: '辅助技能' }, { name: '生存本能' }, { name: '好战分子' }],
    },
    {
      name: '技能书',
      skillTree: [
        { name: '暗黑之力' },
        { name: '魔剑技能' },
        { name: '舞者技能' },
        { name: '吟游诗人' },
        { name: '徒手战斗' },
        { name: '忍者技能' },
      ],
    },
    {
      name: '生活技能',
      skillTree: [{ name: '锻冶大师' }, { name: '炼金术师' }, { name: '驯兽天分' }],
    },
  ];

  // const treeData: ITreeOption[] = [
  //   {
  //     content: <SkillNode content="威力攻击"></SkillNode>,
  //     childList: [
  //       {
  //         content: <SkillNode content="迅捷攻击"></SkillNode>,
  //         childList: [
  //           {
  //             content: <SkillNode content="横扫千军"></SkillNode>,
  //             childList: [
  //               {
  //                 content: <SkillNode content="爆气斩"></SkillNode>,
  //               },
  //             ],
  //             brotherList: [
  //               {
  //                 childList: [
  //                   {
  //                     childList: [
  //                       {
  //                         content: <SkillNode content="流星坠击"></SkillNode>,
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         content: <SkillNode content="音速斩切"></SkillNode>,
  //         childList: [
  //           {
  //             content: <SkillNode content="真空刃"></SkillNode>,
  //             childList: [{ content: <SkillNode content="风暴气流"></SkillNode> }],
  //             brotherList: [
  //               {
  //                 childList: [
  //                   {
  //                     childList: [
  //                       {
  //                         content: <SkillNode content="破坏之刃"></SkillNode>,
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     content: <SkillNode content="剑术要领"></SkillNode>,
  //     childList: [
  //       {
  //         content: <SkillNode content="剑速提升"></SkillNode>,
  //         childList: [
  //           {
  //             content: <SkillNode content="大师级剑术"></SkillNode>,
  //           },
  //         ],
  //         brotherList: [
  //           {
  //             childList: [
  //               {
  //                 childList: [
  //                   {
  //                     content: <SkillNode content="战吼"></SkillNode>,
  //                     childList: [{ content: <SkillNode content="狂战士之怒"></SkillNode> }],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     childList: [
  //       {
  //         childList: [
  //           {
  //             childList: [
  //               {
  //                 content: <SkillNode content="快速蹴击"></SkillNode>,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  // const SkillsQuery = () => {
  //   return treeData.map((data, index) => <Tree key={index} data={data}></Tree>);
  // };

  const menuItem = () =>
    skillMenu.map((item) => (
      <SubMenu key={item.name} icon={<FireOutlined />} title={item.name}>
        {item.skillTree.map((skills) => (
          <Menu.Item key={skills.name + 'skill'} icon={<ApartmentOutlined />}>
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
            <SwordSkill />
            <ShortSkill></ShortSkill>
            <MagicSkill></MagicSkill>
            <CombatSkill></CombatSkill>
            <DualSwordSkill></DualSwordSkill>
            <HalberdSkill></HalberdSkill>
            <SamuraiSkill></SamuraiSkill>
            <SmasherSkill></SmasherSkill>
            <DefenceSkill></DefenceSkill>
            <ProtectSkill></ProtectSkill>
            <KnifeSkill></KnifeSkill>
            <KnightSkill></KnightSkill>
            <HuntingSkill></HuntingSkill>
            <PriestsSkill></PriestsSkill>
            <WizardSkill></WizardSkill>
            <AuxiliarySkill></AuxiliarySkill>
            <MilitantsSkill></MilitantsSkill>
            <ExistenceSkill></ExistenceSkill>
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
