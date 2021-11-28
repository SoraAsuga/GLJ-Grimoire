import routes, { IRoute } from '@/route';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.less';

export default (props) => {
  /**
   * useState 创建一个状态
   * useState 的参数是这个状态的默认值
   * useState 返回一个数组，这个数组第一项是状态，第二项是设置这个状态的方法
   */
  // const [show, setShow] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(0);

  // const [handleClick, setHandleClick] = useState(() => {
  //   return function () {
  //     console.info('clicked!');
  //   };
  // });

  const renderFunctionsItem = (routes: IRoute[]) => {
    /** (数组项, 序号, 数组) */
    return routes.map((route, index) => {
      if (route.hide) {
        return null;
      }

      return (
        <Link key={index} className="main-content__button default-color" to={route.path}>
          <div>{route.name}</div>
        </Link>
      );
    });
  };

  return (
    <article className="main-content__container">
      <h1 className="main-content__title">GLJ's Grimoire</h1>
      <section className="main-content__functions">{renderFunctionsItem(routes)}</section>
    </article>
  );
};
