import React, { Fragment } from 'react';
import { IDescribeDescProps } from '../SkillDescribe/types';

import './index.less';

const RenderDesc = (props: IDescribeDescProps) => {
  const { items } = props;
  const renderItem = () =>
    items.map((item) => (
      <Fragment key={item.name}>
        <div className="render-desc__inertia-title">{item.name}</div>
        <div className="render-desc__inertia-value">{item.value}</div>
      </Fragment>
    ));

  return (
    <div className="render-desc">
      <div className="render-desc__inertia">{renderItem()}</div>
    </div>
  );
};

export default RenderDesc;
