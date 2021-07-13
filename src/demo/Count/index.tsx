import React, { FC, memo, useCallback, useState } from 'react';

/**
 * React 的更新策略
 * 当组件内的状态：useState、props 发生更改时，会导致组件重新计算节点，然后更新到 dom 上
 */

interface ITestUpdateProps {
  onClick: () => void;
}

/** React.memo 会对组件进行性能优化，如果 props 没有变化，就不会更新组件
 * 这种情况会更新组件：oldProps = { a: 1 }, newProps = { a: 2 }
 * 这种情况会更新组件：oldProps = { a: new Object({ value: 0 }) }, newProps = { a: new Object({ value: 0 }) }  两个 Object 的指针不一致
 * 这种情况会更新组件：oldProps = { a: new Function() }, newProps = { a: new Function() }  两个 Function 的指针不一致
 */
const TestUpdate: FC<ITestUpdateProps> = memo((props) => {
  return (
    <p>
      TestUpdate: {Date.now()} <button onClick={props.onClick}>click</button>
    </p>
  );
});

const Count: FC = () => {
  const [count, setCount] = useState(0);

  /** 每次状态改变都会生成一个新的 addCount 函数，会导致使用了这个函数的节点被更新 */
  const addCount = () => {
    /** 不是闭包，每次拿到的都是最新的 count 值 */
    setCount(count + 1);
  };

  /** useCallback 是一种优化性能的手段，它通过判断第二个参数内的值是否改变来决定要不要返回新的闭包 */
  const addCountNotWork = useCallback(
    /** 这个函数是一个 闭包 */
    () => {
      /** 由于是闭包，这将会缓存 count 的值 */
      setCount(count + 1);
    },
    [] /** 这是第二个参数，如果里面的数据变了，才会返回新的函数 */,
  );

  /** 每次状态更新都会创建一个新的函数，虽然内容是一样的，但指针变了 */
  const updateTestComponent = () => {
    console.log('clicked!');
  };

  /** 每次状态更新会先判断第二个参数是否有变化，无变化会返回同样的函数指针，否则会返回新的函数 */
  const updateTestComponent2 = useCallback(() => {
    console.log('clicked2!');
  }, []);

  return (
    <section>
      <h1>------------------</h1>
      <h1>Count: {count}</h1>
      <p>
        <button onClick={addCount}>+ （预期）</button>
        <button onClick={addCountNotWork}>+ （不能达到预期）</button>
      </p>
      <h1>------------------</h1>
      {/* 点上面加号这个组件内容一直在变，说明 onClick 的值一直在变 */}
      <TestUpdate onClick={updateTestComponent}></TestUpdate>
      {/* 点上面加号这个组件内容不变，说明 onClick 的值没有变化 */}
      <TestUpdate onClick={updateTestComponent2}></TestUpdate>
    </section>
  );
};

export default Count;
