import { finishedList } from '@/demo/store/todo-list';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import Item from '../Item';

import './index.less';

const TodoDone: FC = () => {
  const list = useRecoilValue(finishedList);

  const renderItems = () => {
    return list.map((item) => <Item key={item.id} value={item}></Item>);
  };

  return <section className="todo-done__container">{renderItems()}</section>;
};

export default TodoDone;
