import { UserAddOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

const RoleItemAdder: FC = () => {
  const history = useHistory();

  const handleClickEdit = () => {
    history.push('/RoleSimulation/EditRole');
  };

  return (
    <Card className="role-item" onClick={handleClickEdit}>
      <UserAddOutlined />
    </Card>
  );
};

export default RoleItemAdder;
