import React, { FC, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  SkinOutlined,
  BookOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';

import './index.less';
import RoleAbility from './pages/RoleAbility';
import RoleData from './pages/roleData';
import RoleEquip from './pages/RoleEquip';
import RoleSkill from './pages/RoleSkill';
import RoleFood from './pages/RoleFood';
const { Header, Content } = Layout;

interface IProps {
  id: string;
}

const EditRole: FC<IProps> = (props) => {
  const { id } = props;
  const [showPage, setShowPage] = useState('能力');
  const headerTitle = [
    { name: '能力', logo: <UserOutlined style={{ fontSize: '18px' }} key={name + 'logo'} /> },
    { name: '面板', logo: <SolutionOutlined style={{ fontSize: '18px' }} key={name + 'logo'} /> },
    { name: '装备', logo: <SkinOutlined style={{ fontSize: '18px' }} key={name + 'logo'} /> },
    { name: '技能', logo: <BookOutlined style={{ fontSize: '18px' }} key={name + 'logo'} /> },
    { name: '料理', logo: <CoffeeOutlined style={{ fontSize: '18px' }} key={name + 'logo'} /> },
  ];

  const showPages = () => {
    switch (showPage) {
      case '能力':
        return <RoleAbility id={id} />;
      case '面板':
        return <RoleData id={id} />;
      case '装备':
        return <RoleEquip id={id} />;
      case '技能':
        return <RoleSkill id={id} />;
      case '料理':
        return <RoleFood id={id} />;
    }
  };

  const changeShowPages = (item) => {
    setShowPage(item.key);
  };

  return (
    <Layout className="edit-role__layout">
      <Header className="edit-role__header">
        <Menu
          className="edit-role__menu"
          mode="horizontal"
          defaultOpenKeys={['属性']}
          onSelect={changeShowPages}
        >
          {headerTitle.map((item) => (
            <Menu.Item className="edit-role__menu-item" key={item.name}>
              {item.logo}&nbsp;
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content className="edit-role__pages" style={{ padding: '0 50px' }}>
        {showPages()}
      </Content>
    </Layout>
  );
};

export default EditRole;
