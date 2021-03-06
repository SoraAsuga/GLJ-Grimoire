import React, { FC } from 'react';

import IMG_SETTING from '@/common/img/setting.png';
import './index.less';
import Dialog from '@/components/Dialog';
import { SettingOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

interface IProps {
  show: boolean;
  onClose: () => void /* 关闭 */;
}

const Settings: FC<IProps> = (props) => {
  const { show, onClose } = props;

  return (
    <Modal
      title={
        <header className="settings-menu__header">
          <SettingOutlined />
          {/* <span className="header__icon iconfont icon-setting"></span> */}
          <div className="header__title">设置</div>
        </header>
      }
      visible={show}
      maskClosable
      onCancel={onClose}
      footer={null}
      getContainer={false}
      className="settings-menu"
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
    </Modal>
    // <Dialog
    //   className="settings-menu"
    //   title={
    //     <header className="settings-menu__header">
    //       <SettingOutlined />
    //       {/* <span className="header__icon iconfont icon-setting"></span> */}
    //       <div className="header__title">设置</div>
    //     </header>
    //   }
    //   show={show}
    //   onClose={onClose}
    // >

    // </Dialog>
  );
};

export default Settings;
