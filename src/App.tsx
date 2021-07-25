import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoPage from './demo';
import routes, { IRoute } from './route';

const App: FC = () => {
  const renderRoute = (routes: IRoute[]) => {
    /** 箭头函数无大括号写法，会返回括号内的所有值 */
    return routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        component={route.component}
        exact={!Boolean(route.children?.length) /** 当没有子路由时，exact 设置为 true */}
      ></Route>
    ));
  };

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
              <Switch>{renderRoute(routes)}</Switch>
            </section>
            <Footer></Footer>
          </>
        )}
      ></Route>
    </Switch>
  );
};

export default hot(App);
