import React from 'react';
import { WEBSITE_NAME } from '@/common/constance';

import IMG_LOGO from '@/common/img/logo.png';
import IMG_SETTING from '@/common/img/setting.png';
import './index.less';

export default () => {
  return (
    <>
      <header className="main-header">
        <div className="main-header__logo-container">
          <img src={IMG_LOGO} className="main-header__logo" />
          <span className="main-header__title">{WEBSITE_NAME}</span>
        </div>
        <button className="main-header__settings">
          <img src={IMG_SETTING} className="main-header__settings-img" />
        </button>
      </header>
      <section className="settings-main" id="settings-main">
        <div className="settings-main__menu">
          <div className="settings-menu__closed">
            <button className="settings-menu__closed-button">X</button>
          </div>
          <header className="settings-menu__top">
            <img src={IMG_SETTING} className="settings-menu__top-logo" />
            <div className="settings-menu__top-title">设置</div>
            <div className="settings-menu__top-text">BetaTest</div>
          </header>
          <section className="settings-menu__content">
            <div className="settings-menu__content-func">
              <span className="settings-menu__content-title">
                <div>夜间模式</div>
              </span>
            </div>
            <div className="settings-menu__content-func">
              <span className="settings-menu__content-title">
                <div>调整页面大小</div>
              </span>
            </div>
            <div className="settings-menu__content-func">
              <span className="settings-menu__content-title">
                <div>语言设定</div>
              </span>
            </div>
            <div className="settings-menu__content-func">
              <span className="settings-menu__content-title">
                <div>清除资料库</div>
              </span>
            </div>
            <div className="settings-menu__content-func">
              <span className="settings-menu__content-title">
                <div>存档备份</div>
              </span>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
