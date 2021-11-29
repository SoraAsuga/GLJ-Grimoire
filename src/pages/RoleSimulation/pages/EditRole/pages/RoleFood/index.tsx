import React, { FC } from 'react';

import './index.less';

interface IProps {
  id: string;
}

const RoleFood: FC<IProps> = (props) => {
  return <section className="role-simulation__page">料理</section>;
};

export default RoleFood;
