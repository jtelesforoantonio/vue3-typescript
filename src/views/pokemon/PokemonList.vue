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
          <tr v-for="item in pokemonCollection.results" :key="item.name">
            <td>{{ item.name }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-success btn-sm"
                :disabled="loadingDetails && detailsFor === item.name"
                @click="handleShowDetails(item.name)"
              >
                <span
                  v-show="loadingDetails && detailsFor === item.name"
                  class="spinner-border spinner-border-sm"
                ></span>
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav>
        <ul class="pagination justify-content-end">
          <li class="page-item" :class="{ disabled: pagination.currentPage === 0 }">
            <a class="page-link" href="#" @click.prevent="paginatePokemon(--pagination.currentPage)">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" @click.prevent="paginatePokemon(++pagination.currentPage)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <Modal v-model="showModal" :title="pokemon.name">
    <img :src="pokemon.imageUrl" :alt="pokemon.name" class="img-fluid mx-auto d-block"/>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pokemonApi from '@/api/PokemonApi';
import type { IPokemon, IPokemonCollection, IPokemonPagination } from '@/interfaces';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'PokemonList',
  components: { Modal, Loader },
  data() {
    return {
      showModal: false,
      loadingData: false,
      loadingDetails: false,
      pagination: {
        currentPage: 1,
        limit: 15,
        offset: 0,
      } as IPokemonPagination,
      pokemonCollection: {
        count: 0,
        next: '',
        previous: '',
        results: [],
      } as IPokemonCollection,
      detailsFor: '',
      pokemon: {
        id: 0,
        name: '',
        imageUrl: '',
      } as IPokemon,
      pokemonCache: [] as IPokemon[],
    };
  },
  created() {
    this.paginatePokemon();
  },
  methods: {
    async paginatePokemon(page: number = 0) {
      try {
        this.loadingData = true;
        this.pagination.currentPage = page;
        this.pagination.offset = page * this.pagination.limit;
        const { data } = await pokemonApi.paginate(this.pagination);
        this.pokemonCollection = data;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingData = false;
      }
    },
    async handleShowDetails(name: string) {
      try {
        this.detailsFor = name;
        this.loadingDetails = true;
        if (this.pokemon.name !== name) {
          let pokemonDetails = this.pokemonCache.find(p => p.name === name);
          if (!pokemonDetails) {
            const { data } = await pokemonApi.get(name);
            pokemonDetails = {
              id: data.id,
              name: name,
              imageUrl: data.sprites.other['official-artwork'].front_default,
            };
            this.pokemonCache.push(pokemonDetails);
          }
          this.pokemon = pokemonDetails;
        }
        this.showModal = true;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingDetails = false;
      }
    },
  },
});
</script>
