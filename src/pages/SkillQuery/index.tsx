import React from 'react';
import IMG_LOGO from '@/common/img/logo.png';

import './index.less';

export default () => {
  return (
    <section className="skill-query">
      <button className="skill-query__selection-button">
        <img src={IMG_LOGO} className="selection-button__logo" />
        <span className="selection-button__content">点击此处按钮选择技能</span>
      </button>
      <section className="skill-query__choosing-skills">
        <div className="choosing-skills__container">
          <button className="choosing-skills__btn">武器技能</button>
          <button className="choosing-skills__btn">强化技能</button>
          <button className="choosing-skills__btn">辅助技能</button>
          <button className="choosing-skills__btn">生产技能</button>
          <button className="choosing-skills__btn">技能书</button>
          <button className="choosing-skills__btn">其他技能</button>
        </div>
      </section>
      <section className="skill-query__skill-demonstration">
        <div className="skill-demonstration__list">
          <button className="skill-demonstration__btn">武器技能</button>
          <ul className="btn__list weapon">
            <li>剑术技能</li>
            <li>射击技能</li>
            <li>魔法技能</li>
            <li>格斗技能</li>
            <li>双剑技能</li>
            <li>斧枪技能</li>
            <li>武士技能</li>
            <li>粉碎者技能</li>
          </ul>
          <button className="skill-demonstration__btn">强化技能</button>
          <ul className="btn__list buff">
            <li>防卫技能</li>
            <li>防护技能</li>
            <li>刀术技能</li>
            <li>骑士技能</li>
            <li>狩猎技能</li>
            <li>祭司技能</li>
            <li>暗杀技能</li>
            <li>巫师技能</li>
          </ul>
          <button className="skill-demonstration__btn">辅助技能</button>
          <ul className="btn__list support">
            <li>辅助技能</li>
            <li>好战份子</li>
            <li>生存本能</li>
          </ul>
          <button className="skill-demonstration__btn">生产技能</button>
          <ul className="btn__list production">
            <li>锻冶大师</li>
            <li>炼金术士</li>
            <li>驯兽天分</li>
          </ul>
          <button className="skill-demonstration__btn">技能书</button>
          <ul className="btn__list skill-book">
            <li>暗黑之力</li>
            <li>魔剑技能</li>
            <li>舞者技能</li>
            <li>吟游诗人</li>
            <li>徒手战斗</li>
            <li>忍者技能</li>
          </ul>
          <button className="skill-demonstration__btn">其他技能</button>
          <ul className="btn__list others">
            <li>活动技能</li>
            <li>宠物技能</li>
            <li>忍术表</li>
          </ul>
        </div>
        <div className="skill-demonstration__show">
          <div className="skill-demonstration__show-content">
            <header className="show-content__header">
              <div className="skill-logo"></div>
              <div className="skill-name">威力打击</div>
            </header>
            <div className="show-content__attribute">
              <div className="mp"></div>
              <div className="range"></div>
              <div className="type"></div>
              <div className="combo"></div>
              <div className="action-time"></div>
              <div className="chant-time"></div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
