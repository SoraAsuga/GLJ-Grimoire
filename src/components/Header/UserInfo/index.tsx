import React from 'react';

import IMG_AVATAR from '@/common/img/avatar.png';
import './index.less';
import { UserOutlined } from '@ant-design/icons';

interface IProps {
  avatar?: string /* 用户头像，未定义则使用默认头像 */;
  username?: string /* 用户名 */;
}

export default (props: IProps) => {
  /* 此处从const内取出｛｝内的值并赋值给同名变量 */
  const { username = '游客', avatar } = props;

  /** 封装的头像渲染函数 */
  const renderAvatar = (avatarUrl: string) => {
    return avatarUrl ? (
      <img src={avatarUrl} className="user-info__avatar" />
    ) : (
      <UserOutlined />
      // <span className="iconfont icon-user user-info__avatar--default"></span>
    );
  };

  return (
    <div className="user-info">
      {renderAvatar(avatar)}
      <span className="user-info__username">{username}</span>
    </div>
  );
};
