import React, { FC } from 'react';

import './index.less';

interface IProps {
  icon: any;
  title: string;
}

const SplitLine: FC<IProps> = (props) => {
  const { icon, title } = props;

  return (
    <section className="split-line">
      {icon}
      <div className="split-line__title">{title}</div>
    </section>
  );
};

export default SplitLine;
