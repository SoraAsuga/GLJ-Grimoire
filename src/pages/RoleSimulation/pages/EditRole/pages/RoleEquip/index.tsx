import React, { FC } from 'react';

import './index.less';

interface IProps {
  id: string;
}

const RoleEquip: FC<IProps> = (props) => {
  return <section className="role-simulation__page">装备</section>;
};

export default RoleEquip;
