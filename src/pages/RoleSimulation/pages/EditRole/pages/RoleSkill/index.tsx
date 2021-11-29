import React, { FC } from 'react';

import './index.less';

interface IProps {
  id: string;
}

const RoleSkill: FC<IProps> = (props) => {
  return <section className="role-simulation__page">技能</section>;
};

export default RoleSkill;
