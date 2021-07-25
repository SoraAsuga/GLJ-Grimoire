import React, { memo } from 'react';

import './index.less';

/**
 * 实现一个列表
 * 列表项，单独抽出来用 map 渲染：
 *  列表项显示的内容包括：名称、展开收起(^) 或者 右箭头（>），图标用 iconfont
 *
 * 列表包含子列表，当列表项有子列表时，展示 展开收起（^）图标，当没有子列表时，展示 右箭头（>）
 */

const List = memo(() => {
  return <section className="list">Hello</section>;
});

export default List;
