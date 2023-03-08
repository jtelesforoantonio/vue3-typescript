import ApiResource from '@/api/ApiResource';
import type { AxiosInstance, AxiosResponse } from 'axios';
import createAxios from '@/services/axios.service';
import type { TPokemon, TPokemonPaginationQuery, TPokemonPaginationResponse } from '@/types';

class PokemonApi extends ApiResource {
  protected readonly baseUrl = `${import.meta.env.VITE_POKEMON_API_URL}/pokemon`;
  protected readonly api: AxiosInstance;

  constructor() {
    super();
    this.api = createAxios(this.baseUrl);
  }

  paginate(query: TPokemonPaginationQuery): Promise<AxiosResponse<TPokemonPaginationResponse>> {
    return this.api.get('', { params: query });
  }

  get(name: string): Promise<AxiosResponse<TPokemon>> {
    return this.api.get(`/${name}`);
  }

  store(data: any): Promise<AxiosResponse> {
    return this.api.post('/', data);
  }

  update(name: string, data: any): Promise<AxiosResponse> {
    return this.api.put(`/${name}`, data);
  }

  delete(name: string): Promise<AxiosResponse> {
    return this.api.delete(`/${name}`);
  }
}

export default new PokemonApi();
