import type { RouteRecordRaw } from 'vue-router';

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users.index',
    component: () => import('@/views/users/UserList.vue'),
    meta: {
      auth: true,
    },
  },
];

export default userRoutes;
