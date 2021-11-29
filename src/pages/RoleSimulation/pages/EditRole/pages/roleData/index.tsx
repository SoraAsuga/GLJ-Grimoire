import React, { FC } from 'react';

import './index.less';

interface IProps {
  id: string;
}

const RoleData: FC<IProps> = (props) => {
  return <section className="role-simulation__page">面板</section>;
};

export default RoleData;
