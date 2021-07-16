import React, { FC, useEffect, useState } from 'react';
import cls from 'classnames';

import './index.less';
import ReactDOM from 'react-dom';

/** 定义 Dialog 的 props */
interface IProps {
  title: string | JSX.Element /** 标题：可以传入两种类型，一种是 string，一种是节点 */;
  onClose: () => void /** 没有 "?" 表示必填参数 */;
  onSubmit?: (result: string) => void /** "?" 表示可选参数 */;
  show?: boolean /** 是否展示 Dialog */;
  className?: string /** 样式覆盖 */;
  hasFooter?: boolean /** 是否显示脚部 */;
}

const Dialog: FC<IProps> = (props) => {
  /** 从 props 里 “解构赋值”（可查百度） 出 title, onClose，onSubmit，并赋予 onSubmit 初始值：() => {} */
  const { title, className, hasFooter, show, onClose, onSubmit = () => {}, children } = props;
  /** 用 dialog 状态来保存要显示的节点 */
  const [dialog, setDialog] = useState(null);
  /** 给个爸爸先，这样可以给每个 Dialog 自己的爸爸，而不是像之前那样共享爸爸（固定了 div#dialog 元素），因为一个爸爸只有一个孩子，后来的孩子会把先来的孩子鲨了 */
  const [element] = useState(() => {
    const div = document.createElement('div');
    /** 标记一下，表示这个 div 是给 dialog 用的，方便你知道 */
    div.setAttribute('name', 'dialog');
    /** 把爸爸挂到 body 上 */
    document.body.append(div);
    return div;
  });

  /** 阻止冒泡，不阻止的话会触发 onClose */
  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  /** 用 showDialog 来控制 Dialog 的 dialog--show 过渡类 */
  const renderDialog = (showDialog: boolean) => (
    // onClose 调用的是 props 传递进来的函数，这是一种子组件调用父组件的方式，还可用于传递数据
    // 此处 onclick 为点击蒙版退出
    <main className={cls('dialog', { 'dialog--show': showDialog }, className)} onClick={onClose}>
      <div className="dialog__inner" onClick={handleStopPropagation}>
        <header className="dialog__header">
          <div className="header__title">{title}</div>
          <button className="dialog__close-btn" onClick={onClose}>
            ×
          </button>
        </header>
        <section className={cls('dialog__content', { 'dialog__content--has-footer': hasFooter })}>
          {children}
        </section>
        {hasFooter && (
          <footer className="dialog__footer">
            {/* 调用父组件传递进来的函数，给父组件传值 */}
            <button className="dialog__btn" onClick={() => onSubmit('成功！')}>
              确定
            </button>
          </footer>
        )}
      </div>
    </main>
  );

  /** useEffect
   * 当状态或 props 改变时，且依赖数组内的变量变化时，会执行这个函数
   * 这个函数
   */
  useEffect(() => {
    console.log('updated', dialog);
    if (show) {
      /** 先渲染一个隐藏状态的 Dialog */
      setDialog(ReactDOM.createPortal(renderDialog(false), element));
      /** 延时让 React 不合并更新节点，从而使 Dialog 先有 dialog 类，再附加上 dialog--show，才能触发 css transition
       * （短时间内的多次节点更新会被优化，合并为一次更新，不使用延时的话 Dialog 的类名会直接变成 dialog dialog--show，不能触发过渡动画）
       **/
      setTimeout(() => {
        /** 再修改参数，让 React 给 Dialog 加上 dialog--show，触发 css transition */
        setDialog(ReactDOM.createPortal(renderDialog(true), element));
      }, 50);
    } else if (dialog) {
      /** dialog 有值的时候说明 Dialog 是显示的，这时修改参数让 Dialog 触发淡出过渡动画 */
      setDialog(ReactDOM.createPortal(renderDialog(false), element));
      /** 等待淡出过渡动画完成后删除 Dialog 节点 */
      setTimeout(() => {
        setDialog(null);
      }, 250);
    }

    /** 当依赖变化时，会调用 return 的方法 */
    return () => {
      console.info('destroy');
    };
  }, [show]); /** 当这个数组里的变量变化，会重新返回新的函数 */

  /** 把爸爸鲨了 */
  useEffect(() => {
    return () => {
      ReactDOM.unmountComponentAtNode(element);
      element.remove();
    };
  }, []); /** 没有依赖，意味着组件只有初次进入和被销毁时才会调用 */

  return dialog;
};

export default Dialog;
