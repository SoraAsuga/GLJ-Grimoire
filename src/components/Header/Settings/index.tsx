import React, { FC } from 'react';

import IMG_SETTING from '@/common/img/setting.png';
import './index.less';
import Dialog from '@/components/Dialog';

interface IProps {
  show: boolean;
  onClose: () => void /* 关闭 */;
}

const Settings: FC<IProps> = (props) => {
  const { show, onClose } = props;

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  if (true) {
    return (
      <Dialog
        className="settings-menu"
        title={
          <header className="settings-menu__header">
            <img src={IMG_SETTING} className="header__logo" />
            <div className="header__title">设置</div>
          </header>
        }
        show={show}
        onClose={onClose}
      >
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
      </Dialog>
    );
  }

  return (
    <section className="settings-main" id="settings-main" onClick={onClose}>
      <div className="settings-main__menu" onClick={handleStopPropagation}>
        <div className="settings-menu__closed">
          <button className="settings-menu__closed-button" onClick={onClose}>
            X
          </button>
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
  );
};

export default Settings;
