<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/vue.svg" height="24" alt="Vue"/>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li v-for="route in routes" :key="route.label" class="nav-item">
            <router-link :to="{name: route.to}" class="nav-link">{{ route.label }}</router-link>
          </li>
        </ul>
        <div class="d-flex me-5">
          <ul class="navbar-nav me-4">
            <li class="nav-item dropdown">
              <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                {{ auth.nickname }}
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
/**
 * @overview Componente usando la API de Opciones y Composición.
 */
import { defineComponent, onMounted } from 'vue';
import { auth } from '@/store/state/auth';
import { handleLogout } from '@/store/actions/auth';
import type { TRouteLink } from '@/types';
import { Dropdown } from 'bootstrap';
import { RouteNames } from '@/router';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const routes: TRouteLink[] = [
      {
        label: 'Home',
        to: RouteNames.DASHBOARD,
      },
      {
        label: 'Pokemon',
        to: RouteNames.POKEMON_INDEX,
      },
      {
        label: 'Users',
        to: RouteNames.USERS_INDEX,
      },
    ];
    onMounted(() => new Dropdown('#navbarDropdown'));
    /**
     * Para poder usar variables y funciones que fueron definidas usando la API de Composición se deben de exponer
     * usando la función 'setup', aunque no es necesario; también se pueden exponer desde la función 'data'
     * pero por cuestiones de organización o como una buena práctica lo debemos hacer desde la función 'setup', ya que
     * se está haciendo una mezcla de ambas apis.
     *
     * En este ejemplo 'auth' se está exponiendo por medio de 'data' mientras que 'routes' y 'handleLogout' desde el setup.
     */
    return {
      routes,
      handleLogout,
    };
  },
  data() {
    return {
      auth,
    };
  },
});
</script>
