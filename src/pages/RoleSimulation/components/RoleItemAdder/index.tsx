import { roleSimulationState } from '@/store/role-simulation';
import { UserAddOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { nanoid } from 'nanoid';

const RoleItemAdder: FC = () => {
  const history = useHistory();
  const setList = useSetRecoilState(roleSimulationState);
  const date = new Date();
  let id = '';

  const addRole = () => {
    const createDate =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      (date.getHours() + 1) +
      ':' +
      (date.getMinutes() + 1);

    setList((oldList) => [
      ...oldList,
      {
        id,
        level: 1,
        name: '新建角色',
        str: 1,
        dex: 1,
        int: 1,
        vit: 1,
        agi: 1,
        createDate,
      },
    ]);
  };

  const handleClickEdit = () => {
    id = nanoid();
    addRole();
    history.push('/RoleSimulation/EditRole', id);
  };

  return (
    <Card className="role-item" onClick={handleClickEdit}>
      <UserAddOutlined id={id} />
    </Card>
  );
};

export default RoleItemAdder;
