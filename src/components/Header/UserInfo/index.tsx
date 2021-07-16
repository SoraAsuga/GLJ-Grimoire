import React from 'react';

import IMG_AVATAR from '@/common/img/avatar.png';
import './index.less';

interface IProps {
  avatar?: string /* 用户头像，未定义则使用默认头像 */;
  username?: string /* 用户名 */;
}

export default (props: IProps) => {
  /* 此处从const内取出｛｝内的值并赋值给同名变量 */
  const { username = '游客', avatar = IMG_AVATAR } = props;

  return (
    <div className="user-info">
      <img src={avatar} className="user-info__avatar" />
      <span className="user-info__username">{username}</span>
    </div>
  );
};
