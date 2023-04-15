import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { TUICore } from '../TUIKit';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Login' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/home/chat',  // 项目 进行中
        name: 'test',
        component: () => import(/* webpackChunkName: "about" */ '../views/Chat.vue')    // 子路由
      },{
        path: '/home/formGenerator',  // 项目 进行中
        name: 'formGenerator',
        component: () => import(/* webpackChunkName: "about" */ '../views/FormGenerator.vue')    // 子路由
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !(TUICore as any).isLogin) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
