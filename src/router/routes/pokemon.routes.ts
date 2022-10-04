import type { RouteRecordRaw } from 'vue-router';

const pokemonRoutes: RouteRecordRaw[] = [
  {
    path: '/pokemon',
    name: 'pokemon.index',
    component: () => import('@/views/pokemon/PokemonList.vue'),
    meta: {
      auth: true,
    },
  },
];

export default pokemonRoutes;
