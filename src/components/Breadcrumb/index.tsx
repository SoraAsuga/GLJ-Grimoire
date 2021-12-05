import path from 'path-browserify';
import { IRoute } from '@/route';
import cls from 'classnames';
import React, { FC, Fragment, memo, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './index.less';

interface IBreadcrumbProps {
  routes: IRoute[];
  separator?: string;
  className?: string;
}

/** BreadcrumbItem 的 props */
interface IBreadcrumbItemProps {
  route: IRoute /** 单个路由的配置项 */;
  canJump?: boolean /** 是否允许跳转 */;
}

/** Breadcrumb 分隔符的 props */
interface IBreadcrumbSeparatorProps {
  separator?: string /** 分隔符 */;
}

/** 默认分隔符 */
const DEFAULT_SEPARATOR = '/';

const BreadcrumbItem: FC<IBreadcrumbItemProps> = memo((props) => {
  const { route, canJump = true } = props;
  const { path, name } = route;

  return (
    <div className="breadcrumb__item">
      {/* 不可跳转时直接用 span */}
      {canJump ? <Link to={path}>{name}</Link> : <span>{name}</span>}
    </div>
  );
});

const BreadcrumbSeparator = memo((props: IBreadcrumbSeparatorProps) => {
  const { separator = DEFAULT_SEPARATOR } = props;

  return <span className="breadcrumb__separator">{separator}</span>;
});

/**
 * 匹配路由
 * @param pathname 当前路由地址
 * @param routes 路由配置
 * @param basename 路由前缀地址
 */
function getMatchedRoute(pathname: string, routes: IRoute[], basename = '/') {
  return routes.reduce((matched: IRoute[], route) => {
    /** 把路径里面的变量去掉 */
    const routePath = path.join(basename, route.path).replace(/\/:[\w\d-]+/g, '');

    if (pathname.startsWith(routePath)) {
      matched.push(route);
    }

    if (route.children?.length) {
      /** 将当前路由地址传递给子路由作为前缀地址 */
      matched.push(...getMatchedRoute(pathname, route.children, routePath));
    }

    return matched;
  }, []);
}

const Breadcrumb = (props: IBreadcrumbProps) => {
  const { routes, separator, className } = props;
  /** 从 React-Router 提供的 useHistory 获取当前路由位置 location */
  const { location } = useHistory();

  /** 渲染 Breadcrumb 项 */
  const renderBreadcrumbItems = useCallback(() => {
    /** 当前路由位置放在 location.pathname 内，对应你的路由配置里面的 path */
    /**
     * Array.filter 是数组的过滤方法，看红宝书去；String.startsWith(str) 判断字符串是否是以 str 开头，返回布尔值
     * 这里组合使用，筛选的是能够匹配上当前路由的路由配置项
     * 然后对它进行排序，因为子路由的 path 一定比父路由长，所以使用 Array.sort 方法（具体看红宝书）对路由配置项的 path 的文本长度从小到大排序
     *
     * e.g.
     * const routes = [{ path: '/' }, { path: '/Skill' }, { path: 'UserCenter' }]; // 路由配置
     * const { location } = useHistory(); // location = { pathname: '/Skill' }; // 获取 history 里面的当前路由位置
     *
     * console.log(location.pathname.startsWith('/')) // true
     * console.log(location.pathname.startsWith('/Skill')) // true
     * console.log(location.pathname.startsWith('/UserCenter')) // false
     *
     * const matchedRoutes = routes.filter((route) => location.pathname.startsWith(route.path));
     * console.log(matchedRoutes); // [{ path: '/' }, { path: '/Skill' }] 过滤后剩下的路由项
     *
     * console.log(matchedRoutes[0].path.length); // 1
     * console.log(matchedRoutes[1].path.length); // 6
     *
     * const orderedRoutes = matchedRoutes.sort((pre, next) => pre.path.length - next.path.length);
     * console.log(orderedRoutes); // [{ path: '/' }, { path: '/Skill' }]; path 文本长度短的在前面，这样就按照 父路由 在 子路由 前面的顺序排列好了
     */

    const matchedRoutes = getMatchedRoute(location.pathname, routes);

    return matchedRoutes.map((route, index) => {
      /** 是否是最后一项 */
      const isLastItem = index === matchedRoutes.length - 1;

      return (
        <Fragment key={route.path}>
          {/* 最后一项是当前路由所在的位置，你已经处于这个位置了，就不需要可点击跳转 */}
          <BreadcrumbItem route={route} canJump={!isLastItem}></BreadcrumbItem>
          {!isLastItem && <BreadcrumbSeparator separator={separator}></BreadcrumbSeparator>}
        </Fragment>
      );
    });
  }, [routes, separator, location]);

  return <nav className={cls('breadcrumb', className)}>{renderBreadcrumbItems()}</nav>;
};

export default Breadcrumb;
