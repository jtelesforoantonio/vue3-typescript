<template>
  <div class="container">
    <div class="table-responsive">
      <Loader :show="loadingData"/>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="character in characterCollection.characters" :key="character.id">
            <td>{{ character.name }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-success btn-sm"
                :disabled="false"
                @click="getCharacter(character.id)"
              >
                <span v-show="false" class="spinner-border spinner-border-sm"></span>
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav>
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: false }">
            <a class="page-link" href="#" @click.prevent="">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" @click.prevent="">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <Modal v-model="showModal" :title="character.name">
    <img :src="character.image_url" :alt="character.name" class="img-fluid mx-auto d-block"/>
  </Modal>
</template>

<script lang="ts">
/**
 * @overview Componente usando la API de Opciones.
 */
import { defineComponent } from 'vue';
import breakingBadApi from '@/api/BreakingBadApi';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';
import type { TBreakingBadCharacter, TBreakingBadPaginationResponse } from '@/types';
import { ErrorAlert } from '@/services/swal.service';

export default defineComponent({
  name: 'BreakingBadList',
  components: { Loader, Modal },
  data() {
    return {
      loadingData: false,
      showModal: false,
      characterCollection: {
        total: 0,
        characters: [],
      } as TBreakingBadPaginationResponse,
      character: {
        id: 0,
        name: '',
        image_url: '',
      } as TBreakingBadCharacter,
    };
  },
  created() {
    this.paginate();
  },
  methods: {
    async paginate() {
      try {
        this.loadingData = true;
        const { data } = await breakingBadApi.paginate();
        this.characterCollection = data;
      } catch (e) {
        ErrorAlert.fire({});
      } finally {
        this.loadingData = false;
      }
    },
    async getCharacter(id: number) {
      try {
        const { data } = await breakingBadApi.get(id);
        this.character = data;
        this.showModal = true;
      } catch (e) {
        ErrorAlert.fire({});
      }
    },
  },
});
</script>
