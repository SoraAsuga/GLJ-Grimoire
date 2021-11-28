import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import TodoList from './pages/todo-list';

import './index.less';

const DemoPage: FC = () => {
  return (
    <RecoilRoot>
      <section className="demo">
        <Switch>
          <Route path="/demo/todo-list" component={TodoList}></Route>
          <Redirect to="/demo/todo-list"></Redirect>
        </Switch>
      </section>
    </RecoilRoot>
  );
};

export default DemoPage;
