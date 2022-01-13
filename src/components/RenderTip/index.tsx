import React from 'react';
import { IDescribeTipProps } from '../SkillDescribe/types';

import './index.less';

const RenderTip = (props: IDescribeTipProps[]) => {
  /** 动态生成提示 */
  const renderTips = () => {
    return props.map((item) => {
      return (
        <div className="render-tips__item">
          <div className="render-tips__item-icon">{item.icon}</div>
          <div className="render-tips__item-content">{item.content}</div>
        </div>
      );
    });
  };

  return <section className="render-tips">{renderTips()}</section>;
};

export default RenderTip;
