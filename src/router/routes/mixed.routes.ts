import type { RouteRecordRaw } from 'vue-router';

const mixedRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    redirect: { name: 'dashboard' },
  },
];

export default mixedRoutes;
