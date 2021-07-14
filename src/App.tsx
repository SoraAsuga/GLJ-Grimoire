import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoPage from './demo';

const App: FC = () => {
  /** 简单的路由嵌套 */
  return (
    <Switch>
      <Route path="/demo" component={DemoPage} exact strict></Route>
      <Route
        path="/"
        render={() => (
          <>
            <Header></Header>
            <section className="main-content">
              {/* 二级路由 */}
              <Switch>
                <Route path="/" component={HomePage} exact strict></Route>
              </Switch>
            </section>
            <Footer></Footer>
          </>
        )}
      ></Route>
    </Switch>
  );
};

export default hot(App);
