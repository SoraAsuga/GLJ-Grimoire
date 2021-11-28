import React, { FC, memo, useCallback, useState } from 'react';

interface ITestUpdateProps {
  onClick: () => void;
}

const TestUpdate: FC<ITestUpdateProps> = memo((props) => {
  return (
    <p>
      TestUpdate: {Date.now()} <button onClick={props.onClick}>click</button>
    </p>
  );
});

const Count: FC = () => {
  const [count, setCount] = useState(0);

  const addCount = () => setCount(count + 1);

  const addCountNotWork = useCallback(() => setCount(count + 1), []);

  const updateTestComponent = () => console.log('clicked!');

  const updateTestComponent2 = useCallback(() => {
    console.log('clicked!');
  }, []);

  return (
    <section>
      <h1>------------------</h1>
      <h1>Count: {count}</h1>
      <section>
        <button onClick={addCount}>+ （预期）</button>
        <button onClick={addCountNotWork}>+ （不能达到预期）</button>
      </section>
      <h1>------------------</h1>
      <TestUpdate onClick={updateTestComponent}></TestUpdate>
      <TestUpdate onClick={updateTestComponent2}></TestUpdate>
    </section>
  );
};

export default Count;
