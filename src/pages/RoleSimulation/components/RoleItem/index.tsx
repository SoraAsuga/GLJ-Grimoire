import React, { FC } from 'react';
import { Card } from 'antd';
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { RoleSimulationItem } from '@/store/types';
import { useHistory } from 'react-router-dom';

interface RoleItemProps {
  role: RoleSimulationItem;
}

const RoleItem: FC<RoleItemProps> = (props) => {
  const { role } = props;

  const history = useHistory();

  const handleClickEdit = () => {
    history.push('/RoleSimulation/EditRole');
  };

  return (
    <Card
      className="role-item"
      actions={[
        <CopyOutlined />,
        <EditOutlined key="edit" onClick={handleClickEdit} />,
        <DeleteOutlined />,
      ]}
    >
      {role.name}
    </Card>
  );
};

export default RoleItem;
