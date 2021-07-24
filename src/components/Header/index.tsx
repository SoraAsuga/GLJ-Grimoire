import React, { FC, useState } from 'react';
import IMG_LOGO from '@/common/img/logo.png';
import routes from '@/route';
import Breadcrumb from '../Breadcrumb';
import Settings from './Settings';
import UserInfo from './UserInfo';

import './index.less';

const MainPage: FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleClose = () => {
    setShowSettings(false);
  };

  return (
    <>
      <header className="main-header">
        <div className="main-header__logo-container">
          <img src={IMG_LOGO} className="main-header__logo" />
          <div className="main-header__title">
            <Breadcrumb routes={routes}></Breadcrumb>
          </div>
        </div>
        <div className="main-header__settings-container">
          <UserInfo></UserInfo>
          <button
            className="main-header__settings iconfont icon-setting"
            onClick={() => setShowSettings(true)}
          ></button>
        </div>
      </header>

      <Settings show={showSettings} onClose={handleClose}></Settings>
    </>
  );
};

export default MainPage;
