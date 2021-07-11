import React from 'react';
import { WEBSITE_NAME } from '@/common/constance';

import IMG_LOGO from '@/common/img/logo.png';
import IMG_SETTING from '@/common/img/setting.png';
import './index.less';

export default () => {
  return (
    <header className="main-header">
      <div className="main-header__logo-container">
        <img src={IMG_LOGO} className="main-header__logo" />
        <span className="main-header__title">{WEBSITE_NAME}</span>
      </div>
      <button className="main-header__settings">
        <img src={IMG_SETTING} className="main-header__settings-img" />
      </button>
    </header>
  );
};
