import type { RouteRecordRaw } from 'vue-router';

export const breakingBadRoutes: RouteRecordRaw[] = [
  {
    path: '/breaking-bad',
    name: 'breaking.index',
    component: () => import('@/views/breaking/BreakingBadList.vue'),
  },
];

export default breakingBadRoutes;
