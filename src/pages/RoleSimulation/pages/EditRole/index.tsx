import {
  UserOutlined,
  SkinOutlined,
  BookOutlined,
  CoffeeOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import { Card, Descriptions, Layout, Menu } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import React, { FC, useState } from 'react';

import './index.less';
import RoleAbility from './pages/RoleAbility';
import RoleData from './pages/RoleData';
import RoleEquip from './pages/RoleEquip';
import RoleFood from './pages/RoleFood';
import RoleSkill from './pages/RoleSkill';

const EditRole: FC = () => {
  const [showPages, setShowPages] = useState(<RoleAbility />);

  const menus = [
    {
      name: '能力',
      icon: <RadarChartOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleAbility />,
    },
    {
      name: '数值',
      icon: <UserOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleData />,
    },
    {
      name: '装备',
      icon: <SkinOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleEquip />,
    },
    {
      name: '技能',
      icon: <BookOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleSkill />,
    },
    {
      name: '料理',
      icon: <CoffeeOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleFood />,
    },
  ];

  return (
    <section className="edit-role">
      <header className="edit-role__header">
        <Card className="edit-role__card">
          <Descriptions title="角色名">
            <Descriptions.Item label="等级">233</Descriptions.Item>
            <Descriptions.Item label="武器">双剑</Descriptions.Item>
          </Descriptions>
        </Card>
      </header>
      <section className="edit-role__details">
        <Layout className="edit-role__details-content">
          <Header className="edit-role__details-header">
            <Menu theme="light" mode="horizontal" className="edit-role__details-menu">
              {menus.map((item) => (
                <Menu.Item
                  className="edit-role__menu-item"
                  key={item.name}
                  style={{ fontSize: '18px' }}
                  onClick={() => setShowPages(item.page)}
                >
                  {item.icon}
                  {item.name}
                </Menu.Item>
              ))}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: '20px' }}>
            <div className="site-layout-content">{showPages}</div>
          </Content>
        </Layout>
      </section>
    </section>
  );
};

export default EditRole;
