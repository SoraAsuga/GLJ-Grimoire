import React, { FC } from 'react';
import { ISkillNodeProps } from '../types';

import './index.less';

const SkillNode: FC<ISkillNodeProps> = (props) => {
  const { content, icon, level } = props;

  const hasSetIcon = icon !== undefined;
  const iconEl =
    hasSetIcon && typeof icon === 'string' ? (
      <img className="skill-node__icon" src={icon}></img>
    ) : (
      icon
    );

  return (
    <section className="skill-node" title={content}>
      {Boolean(level) && <span className="skill-node__level">{level}</span>}
      {iconEl || '?'}
    </section>
  );
};

export default SkillNode;
