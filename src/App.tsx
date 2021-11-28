import path from 'path-browserify';
import { hot } from 'react-hot-loader/root';
import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoPage from './demo';
import routes, { IRoute } from './route';
import DemoPage2 from './demo2';

const App: FC = () => {
  const renderRoute = (routes: IRoute[], base = '/') => {
    if (!routes?.length) {
      return;
    }

    /** 箭头函数无大括号写法，会返回括号内的所有值 */
    return routes.reduce((routeList, route) => {
      const { children } = route;
      const routePath = path.join(base, route.path);

      /** 将子路由递归添加 */
      if (children?.length) {
        routeList.push(...renderRoute(children, routePath));
      }

      routeList.push(
        <Route
          key={routePath}
          path={routePath}
          component={route.component}
          exact={!Boolean(route.children?.length) /** 当没有子路由时，exact 设置为 true */}
        ></Route>,
      );

      return routeList;
    }, []);
  };

  /** 简单的路由嵌套 */
  return (
    <Switch>
      <Route path="/demo" component={DemoPage}></Route>
      <Route path="/demo2" component={DemoPage2} exact strict></Route>
      <Route
        path="/"
        render={() => (
          <>
            <Header></Header>
            <section className="main-content">
              <Switch>
                {renderRoute(routes)}
                <Redirect to="/"></Redirect>
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
