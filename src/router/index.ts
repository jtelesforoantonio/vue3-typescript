import { createRouter, createWebHistory } from 'vue-router';
import mixedRoutes from '@/router/routes/mixed.routes';
import authRoutes from '@/router/routes/auth.routes';
import pokemonRoutes from '@/router/routes/pokemon.routes';
import breakingBadRoutes from '@/router/routes/breaking.routes';
import userRoutes from '@/router/routes/user.routes';
import { isUserAuthenticated } from '@/store/computed/auth';
import type { TRouteNames } from '@/types';

const routes = [
  ...mixedRoutes,
  ...authRoutes,
  ...pokemonRoutes,
  ...breakingBadRoutes,
  ...userRoutes,
];

const RouteNames = {} as TRouteNames;
routes.forEach(route => {
  const name = route.name.replace('.', '_').toUpperCase();
  RouteNames[name] = route.name;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

let next: any = null;
router.beforeEach(to => {
  if (to.meta.auth && !isUserAuthenticated.value) {
    next = to.name;
    return { name: RouteNames.AUTH_LOGIN };
  } else if (to.name === RouteNames.AUTH_LOGIN && isUserAuthenticated.value) {
    return { name: RouteNames.DASHBOARD };
  } else if (isUserAuthenticated.value && next) {
    const goTo = { name: next };
    next = null;
    return goTo;
  }
});

export { RouteNames };
export default router;
