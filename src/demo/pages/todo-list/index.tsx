import React, { FC } from 'react';
import { Tabs } from 'antd';

import TodoDone from './TodoDone';
import TodoUnfinished from './TodoUnfinished';
import AddTodo from './AddTodo';
import './index.less';

const TodoList: FC = () => {
  // 用于保存输入的对象属性
  const { TabPane } = Tabs;

  return (
    <section className="todo-list">
      <div className="todo-lis__menu">
        <Tabs defaultActiveKey="1" className="todo-lis__menu-tabs">
          <TabPane tab="未完成" key="1" className="todo-lis__menu-unfinished">
            <TodoUnfinished />
          </TabPane>
          <TabPane tab="已完成" key="2" className="todo-lis__menu-done">
            <TodoDone />
          </TabPane>
        </Tabs>
      </div>
      <AddTodo />
    </section>
  );
};

export default TodoList;
