import { getRoleSelector } from '@/store/role-simulation';
import {
  UserOutlined,
  SkinOutlined,
  BookOutlined,
  CoffeeOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import { Card, Descriptions, Layout, Menu } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import React, { FC, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IEditRoleRouteParam } from '../../types';

import './index.less';
import RoleAbility from './pages/RoleAbility';
import RoleData from './pages/RoleData';
import RoleEquip from './pages/RoleEquip';
import RoleFood from './pages/RoleFood';
import RoleSkill from './pages/RoleSkill';

const EditRole: FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const params = useParams<IEditRoleRouteParam>();
  const roleSelector = useMemo(() => getRoleSelector(params.id), [params.id]);
  const [role, setRole] = useRecoilState(roleSelector);
  // const roleData = useRecoilState();

  console.log(params.id);

  const menus = [
    {
      name: '能力',
      icon: <RadarChartOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleAbility id={params.id} />,
    },
    {
      name: '数值',
      icon: <UserOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleData id={params.id} />,
    },
    {
      name: '装备',
      icon: <SkinOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleEquip id={params.id} />,
    },
    {
      name: '技能',
      icon: <BookOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleSkill id={params.id} />,
    },
    {
      name: '料理',
      icon: <CoffeeOutlined style={{ marginRight: '3px', fontSize: '16px' }} />,
      page: <RoleFood id={params.id} />,
    },
  ];

  const renderTabContents = () => {
    return menus.map((menu, i) => {
      const visible = currentPageIndex === i;

      return (
        <div
          className="site-layout-content"
          key={menu.name}
          style={{ display: visible ? 'block' : 'none' }}
        >
          {menu.page}
        </div>
      );
    });
  };

  return (
    <section className="edit-role">
      <header className="edit-role__header">
        <Card className="edit-role__card">
          <Descriptions title={role.name}>
            <Descriptions.Item label="等级">{role.level}</Descriptions.Item>
            <Descriptions.Item label="武器">双剑</Descriptions.Item>
          </Descriptions>
        </Card>
      </header>
      <section className="edit-role__details">
        <Layout className="edit-role__details-content">
          <Header className="edit-role__details-header">
            <Menu theme="light" mode="horizontal" className="edit-role__details-menu">
              {menus.map((item, index) => (
                <Menu.Item
                  className="edit-role__menu-item"
                  key={item.name}
                  style={{ fontSize: '18px' }}
                  onClick={() => setCurrentPageIndex(index)}
                >
                  {item.icon}
                  {item.name}
                </Menu.Item>
              ))}
            </Menu>
          </Header>
          <Content style={{ padding: '20px 20px 60px' }}>{renderTabContents()}</Content>
        </Layout>
      </section>
    </section>
  );
};

export default EditRole;
