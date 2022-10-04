<template>
  <Navbar v-if="isUserAuthenticated"/>
  <div class="container-fluid mt-5">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { isUserAuthenticated } from '@/store/computed/auth';

export default defineComponent({
  components: { Navbar },
  setup() {
    return { isUserAuthenticated };
  },
});
</script>
