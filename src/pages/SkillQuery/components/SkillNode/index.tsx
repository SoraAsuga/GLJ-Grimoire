import React, { FC } from 'react';

import './index.less';

interface ISkillNodeProps {
  content: string;
  icon?: any;
}

const SkillNode: FC<ISkillNodeProps> = (props) => {
  const { content, icon } = props;

  return (
    <section className="skill-node" title={content}>
      {icon || '?'}
    </section>
  );
};

export default SkillNode;
