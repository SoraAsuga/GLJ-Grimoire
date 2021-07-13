import React, { FC, useState } from 'react';
import Count from './Count';
import Dialog from './Dialog';

import './index.less';

const DemoPage: FC = () => {
  /**
   * useState 使用状态
   * 只能在函数组件内使用，且不能在 if、else、switch 等不确定的块内使用
   *
   * const [state, setState] = useState(initState);
   * @param initState - 状态的初始值
   * @returns state - 状态名称
   * @returns setState - 更改状态的方法
   */
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);

  /** 设置 showDialog 的状态为 false，从而关闭 Dialog 1 */
  const handleClose = () => {
    setShowDialog(false);
  };

  /** 设置 showDialog2 的状态为 false，从而关闭 Dialog 2 */
  const handleClose2 = () => {
    setShowDialog2(false);
  };

  /** 显示 Dialog 的第二种方法：用函数封装，函数返回 React 节点 */
  const renderDialog = (shouldShow: boolean) => {
    /** 值为 false 时返回 null，不渲染任何节点 */
    if (!shouldShow) {
      return null;
    }
    /** 渲染 Dialog 组件 */
    return <Dialog title="Dialog 2" onClose={handleClose2}></Dialog>;
  };

  /** 绑定点击事件的第二种方法：先在组件内定义好点击事件处理函数 */
  const handleShowDialog = () => {
    /** 设置 showDialog2 的状态为 true，显示 Dialog 2 */
    setShowDialog2(true);
  };

  return (
    <section className="demo">
      <h1>Demo Page</h1>
      <p>
        {/* 绑定点击事件的第一种方法：直接在 onClick 内写函数 */}
        {/* 设置 showDialog 的状态为 true，显示 Dialog 1 */}
        <button onClick={() => setShowDialog(true)}>显示 Dialog 1</button>
        {/* 绑定点击事件的第二种方法：直接给 onClick 设置写好的函数名 */}
        <a onClick={handleShowDialog}>显示 Dialog 2</a>
      </p>
      {/* 显示 Dialog 的第一种方法：showDialog 为真时，显示 Dialog */}
      {showDialog && <Dialog title="Dialog 1" onClose={handleClose}></Dialog>}
      {/* 显示 Dialog 的第二种方法：利用函数封装 */}
      {renderDialog(showDialog2)}

      <Count></Count>
    </section>
  );
};

export default DemoPage;
