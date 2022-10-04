import { createRouter, createWebHistory } from 'vue-router';
import mixedRoutes from '@/router/routes/mixed.routes';
import authRoutes from '@/router/routes/auth.routes';
import pokemonRoutes from '@/router/routes/pokemon.routes';
import breakingBadRoutes from '@/router/routes/breaking.routes';
import { isUserAuthenticated } from '@/store/computed/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...mixedRoutes,
    ...authRoutes,
    ...pokemonRoutes,
    ...breakingBadRoutes,
  ],
});

router.beforeEach(to => {
  if (to.meta.auth && !isUserAuthenticated.value) {
    return { name: 'auth.login' };
  } else if (to.name === 'auth.login' && isUserAuthenticated.value) {
    return { name: 'dashboard' };
  }
});

export default router;
