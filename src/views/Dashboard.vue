<template>
  <div class="container text-center">
    <div class="row">
      <div class="mb-3">
        <img src="/vue.svg" height="80" alt="Vue logo"/>
      </div>
      <h1>Vue + Typescript</h1>
      <div class="alert alert-info">
        Ejemplos de como usar Vue con Typescript, asi de como implementar la API de Opciones y de Composición.
        Algunos componentes hacen una mezcla de ambas API's con la intención de mostrar que se pueden usar ambas
        en el mismo componente.
      </div>
      <p style="font-size:100px">&#128150; &#128540; &#128640; &#129412; &#128027;</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
});
</script>
