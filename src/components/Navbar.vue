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
            <router-link :to="route.to" class="nav-link">{{ route.label }}</router-link>
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
import { defineComponent } from 'vue';
import { auth } from '@/store/state/auth';
import { handleLogout } from '@/store/actions/auth';
import type { IRouteLink } from '@/interfaces';
import { Dropdown } from 'bootstrap';

export default defineComponent({
  name: 'Navbar',
  setup() {
    /**
     * Para poder usar variables y funciones que fueron definidas usando la API de Composición se deben de exponer
     * usando la función 'setup', aunque no es necesario; también se pueden exponer desde la función 'data'
     * pero por cuestiones de organización o como una buena práctica lo debemos hacer desde la función 'setup', ya que
     * se está haciendo una mezcla de ambas apis.
     */
    return {
      auth,
      handleLogout,
    };
  },
  data() {
    return {
      routes: [
        {
          label: 'Dashboard',
          to: {
            name: 'dashboard',
          },
        },
        {
          label: 'Pokemon',
          to: {
            name: 'pokemon.index',
          },
        },
        {
          label: 'Breaking Bad',
          to: {
            name: 'breaking.index',
          },
        },
      ] as IRouteLink[],
    };
  },
  mounted() {
    new Dropdown('#navbarDropdown');
  },
});
</script>
