<template>
  <div v-if="show" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @overview Componente usando la API de Composición.
 */
type TProps = {
  show: boolean;
}

defineProps<TProps>();
</script>
