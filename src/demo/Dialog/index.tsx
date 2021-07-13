import React, { FC } from 'react';

import './index.less';

/** 类型定义的作用
 * 1. 代码提示功能：vscode 会识别类型，在你编码的时候给出适当的提示信息，并检查错误
 * 2. 告诉自己这个模块需要的参数和参数的类型：让代码更清晰、让结构更清晰、减少写 BUG 的几率
 */

/** 类型定义的方法
 * 1. interface
 *  interface 类型名称 {
 *     属性名 1: 属性类型 1;
 *     ...
 *     属性名 n: 属性类型 n;
 *  }
 *
 *  使用的时候，在变量后面加一个冒号，把类型名放冒号后面：const glj: 类型名称 = {};
 *
 *  可使用的属性类型：
 *   1) js 的基础类型和引用类型
 *      show: boolean;
 *      onClick: () => void;  => 后面的表示函数的返回值类型
 *      setTime: (time: number) => void; 括号内是函数的入参，入参也可以定义类型
 *        非法 setTime() 缺少参数 time
 *        非法 setTime(true) 参数 time 类型错误
 *        合法 setTime(12)
 *   2) 联合类型：如： sex: 'male' | 'female';  表示 sex 属性的合法值为 'male' 或 'female'
 *   3) 复合类型：如： menu: Array<{ name: string; path: string; }>;  表示 menu 的合法值是一个对象数组
 *       合法 menu = [{ name: '首页', path: '/home' }, { name: 'about', path: '/about' }, ...]
 *       非法 menu = [{ name: '首页' }] 缺少 path 属性，和类型定义不一致
 *   4) 复杂类型 暂不介绍
 *
 * 2. type 暂不介绍
 */

/** 定义 Dialog 的 props */
interface IProps {
  title: string /** 标题 */;
  onClose: () => void /** "?" 表示可选参数 */;
  onSubmit?: (result: string) => void /** 没有 "?" 表示必填参数 */;
}

const Dialog: FC<IProps> = (props) => {
  /** 从 props 里 “解构赋值”（可查百度） 出 title, onClose，onSubmit，并赋予 onSubmit 初始值：() => {} */
  const { title, onClose, onSubmit = () => {} } = props;

  /** 阻止冒泡，不阻止的话会触发 onClose */
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    // onClose 调用的是 props 传递进来的函数，这是一种子组件调用父组件的方式，还可用于传递数据
    <main className="dialog" onClick={onClose}>
      <div className="dialog__inner" onClick={handleStopPropagation}>
        <header className="dialog__header">
          <span>{title}</span>
          <button className="dialog__close-btn" onClick={onClose}>
            ×
          </button>
        </header>
        <section className="dialog__content"></section>
        <footer className="dialog__footer">
          {/* 调用父组件传递进来的函数，给父组件传值 */}
          <button className="dialog__btn" onClick={() => onSubmit('成功！')}>
            确定
          </button>
        </footer>
      </div>
    </main>
  );
};

export default Dialog;
