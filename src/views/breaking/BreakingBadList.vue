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
          <tr v-for="character in characterCollection.results" :key="character.name">
            <td>{{ character.name }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-success btn-sm"
                :disabled="false"
                @click="getCharacter(character.char_id)"
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
    <img :src="character.imageUrl" :alt="character.name" class="img-fluid mx-auto d-block"/>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import breakingBadApi from '@/api/BreakingBadApi';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'BreakingBadList',
  components: { Loader, Modal },
  data() {
    return {
      loadingData: false,
      showModal: false,
      characterCollection: {
        results: [],
      },
      character: {
        id: 0,
        name: '',
        imageUrl: '',
      },
    };
  },
  created() {
    this.paginate();
  },
  methods: {
    async paginate() {
      try {
        this.loadingData = true;
        const { data } = await breakingBadApi.paginate({});
        this.characterCollection = {
          results: data,
        };
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingData = false;
      }
    },
    async getCharacter(id: number) {
      try {
        const { data } = await breakingBadApi.get(id);
        this.character = {
          id: data[0].char_id,
          name: `${data[0].name} (${data[0].nickname})`,
          imageUrl: data[0].img,
        };
        this.showModal = true;
        console.info(data);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>
