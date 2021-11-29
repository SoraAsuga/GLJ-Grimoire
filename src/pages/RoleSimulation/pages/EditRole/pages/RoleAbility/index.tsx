import { roleSimulationState } from '@/store/role-simulation';
import { StarOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import SplitLine from '../../components/SplitLine';
import './index.less';

interface IProps {
  id: string;
}

const RoleAbility: FC<IProps> = (props) => {
  const { id } = props;
  const roleList = useRecoilValue(roleSimulationState);

  return (
    <section className="role-simulation__page">
      <SplitLine icon={<StarOutlined />} title="角色名称" />
      <section>
        <UserOutlined />
        <div></div>
      </section>
    </section>
  );
};

export default RoleAbility;
