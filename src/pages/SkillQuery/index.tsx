import React from 'react';
import IMG_LOGO from '@/common/img/logo.png';

import './index.less';

export default () => {
  return (
    <section className="skill-query">
      <button className="skill-query__selection-button">
        <img src={IMG_LOGO} className="selection-button__logo" />
        <span className="selection-button__content">点击此处按钮选择技能</span>
      </button>
    </section>
  );
};
