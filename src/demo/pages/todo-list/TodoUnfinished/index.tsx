import { unfinishedList } from '@/demo/store/todo-list';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import Item from '../Item';

import './index.less';

const TodoUnfinished: FC = () => {
  const list = useRecoilValue(unfinishedList);

  const renderItems = () => {
    return list.map((item) => <Item key={item.id} value={item}></Item>);
  };

  return <section className="todo-unfinished__container">{renderItems()}</section>;
};

export default TodoUnfinished;
