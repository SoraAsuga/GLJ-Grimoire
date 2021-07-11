import React from 'react';

import './index.less';

export default () => {
  const renderFunctionsItem = (option: any) => {
    return (
      <a className="main-content__button" href={option.href}>
        <div>{option.name}</div>
      </a>
    );
  };

  return (
    <article className="main-content__container">
      <h1 className="main-content__title">GLJ's Grimoire</h1>
      <section className="main-content__functions">
        <a className="main-content__button" href="/src/pages/pages1/pages.html">
          <div>技能查询</div>
        </a>
        <a className="main-content__button" href="/src/pages/pages2/pages.html">
          <div>角色模拟</div>
        </a>
        <a className="main-content__button" href="/src/pages/pages3/pages.html">
          <div>技能模拟</div>
        </a>
        <a className="main-content__button" href="/src/pages/pages4/pages.html">
          <div>附魔模拟</div>
        </a>
        <a className="main-content__button" href="/src/pages/pages5/pages.html">
          <div>附魔布偶</div>
        </a>
        <a className="main-content__button" href="/src/pages/pages6/pages.html">
          <div>道具查询</div>
        </a>
        <a className="main-content__button" href="/src/pages/pages7/pages.html">
          <div>锻晶查询</div>
        </a>
        <a className="main-content__button" href="/src/pages/pages8/pages.html">
          <div>伤害计算</div>
        </a>
      </section>
    </article>
  );
};
