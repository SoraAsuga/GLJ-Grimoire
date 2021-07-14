import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.less';

const functionsItemsConfig = [
  {
    name: '技能查询',
    href: '/SkillQuery',
  },
  {
    name: '角色模拟',
    href: '/RoleSimulation',
  },
  {
    name: '技能模拟',
    href: '/SkillSimulation',
  },
  {
    name: '附魔模拟',
    href: '/RoleSimulation',
  },
  {
    name: '附魔布偶',
    href: '/EnchantPuppet',
  },
  {
    name: '道具查询',
    href: '/PropsQuery',
  },
  {
    name: '锻晶查询',
    href: '/ForgingCrystalQuery',
  },
  {
    name: '伤害计算',
    href: '/DamageCalculation',
  },
];

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

  const renderFunctionsItem = (functionsItemsConfig: any[]) => {
    /** (数组项, 序号, 数组) */
    return functionsItemsConfig.map((functionsItem, index) => {
      return (
        <Link key={index} className="main-content__button" to={functionsItem.href}>
          <div>{functionsItem.name}</div>
        </Link>
      );
    });
  };

  return (
    <article className="main-content__container">
      <h1 className="main-content__title">GLJ's Grimoire</h1>
      <section className="main-content__functions">
        {renderFunctionsItem(functionsItemsConfig)}
      </section>
    </article>
  );
};
