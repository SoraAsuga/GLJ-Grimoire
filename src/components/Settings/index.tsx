import React from 'react';

import './index.less';
import IMG_SETTING from '@/common/img/setting.png';

export default () => {
  return (
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
              <div></div>
              <div>夜间模式</div>
            </span>
          </div>
          <div className="settings-menu__content-func">
            <span className="settings-menu__content-title">
              <div></div>
              <div>调整页面大小</div>
            </span>
          </div>
          <div className="settings-menu__content-func">
            <span className="settings-menu__content-title">
              <div></div>
              <div>语言设定</div>
            </span>
          </div>
          <div className="settings-menu__content-func">
            <span className="settings-menu__content-title">
              <div></div>
              <div>清除资料库</div>
            </span>
          </div>
          <div className="settings-menu__content-func">
            <span className="settings-menu__content-title">
              <div></div>
              <div>存档备份</div>
            </span>
          </div>
        </section>
      </div>
    </section>
  );
};
