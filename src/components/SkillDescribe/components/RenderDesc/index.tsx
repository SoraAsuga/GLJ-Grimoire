import React, { Fragment } from 'react';
import { IDescribeDescProps } from '../../../../constants/types';

import './index.less';

const RenderDesc = (props: IDescribeDescProps) => {
  const { items } = props;
  const renderItem = () =>
    items.map((item, index) => (
      <Fragment key={index}>
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
