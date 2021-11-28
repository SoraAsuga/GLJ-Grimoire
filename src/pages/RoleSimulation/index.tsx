import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid';
import { useRecoilValue } from 'recoil';
import { roleSimulationState } from '@/store/role-simulation';

import './index.less';
import RoleItem from './components/RoleItem';
import RoleItemAdder from './components/RoleItemAdder';

const RoleSimulation: FC = () => {
  const list = useRecoilValue(roleSimulationState);

  const renderRoleList = () => {
    return list.map((role) => <RoleItem key={role.id} role={role}></RoleItem>);
  };

  return (
    <div className="role-simulation">
      {renderRoleList()}
      <RoleItemAdder></RoleItemAdder>
    </div>
  );
};

export default RoleSimulation;
