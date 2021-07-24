import HomePage from './pages/HomePage';
import SkillQuery from './pages/SkillQuery';

export interface IRoute {
  path: string /** 路由地址 */;
  name: string /** 路由显示名称 */;
  component: React.ComponentType /** 页面组件 */;
  children?: IRoute[] /** 子路由 */;
  hide?: boolean /** 首页功能列表是否隐藏该项目 */;
}

const routes: IRoute[] = [
  {
    name: '首页',
    path: '/',
    component: HomePage,
    hide: true,
  },
  {
    name: '技能查询',
    path: '/SkillQuery',
    component: SkillQuery,
  },
  {
    name: '角色模拟',
    path: '/RoleSimulation',
    component: null,
  },
  {
    name: '技能模拟',
    path: '/SkillSimulation',
    component: null,
  },
  {
    name: '附魔模拟',
    path: '/RoleSimulation',
    component: null,
  },
  {
    name: '附魔布偶',
    path: '/EnchantPuppet',
    component: null,
  },
  {
    name: '道具查询',
    path: '/PropsQuery',
    component: null,
  },
  {
    name: '锻晶查询',
    path: '/ForgingCrystalQuery',
    component: null,
  },
  {
    name: '伤害计算',
    path: '/DamageCalculation',
    component: null,
  },
];

export default routes;
