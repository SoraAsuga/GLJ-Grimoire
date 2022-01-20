import { currentSkillState } from '@/store/current-data';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';

import './index.less';

interface ISkillNodeProps {
  content: string;
  icon?: any;
}

const SkillNode: FC<ISkillNodeProps> = (props) => {
  const { content, icon } = props;
  const [skillState, setSkillState] = useRecoilState(currentSkillState);

  return (
    <section className="skill-node" title={content} onClick={() => setSkillState(content)}>
      {icon || '?'}
    </section>
  );
};

export default SkillNode;
