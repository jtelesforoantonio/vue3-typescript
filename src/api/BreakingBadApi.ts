import ApiResource from '@/api/ApiResource';
import type { AxiosInstance, AxiosResponse } from 'axios';
import createAxios from '@/services/axios.service';
import type { TBreakingBadCharacter, TBreakingBadPaginationResponse } from '@/types';

/**
 * The API was removed.
 *
 * @deprecated
 */
class BreakingBadApi extends ApiResource {
  protected readonly baseUrl = `${import.meta.env.VITE_BREAKINGBAD_API_URL}/characters`;
  protected readonly api: AxiosInstance;

  constructor() {
    super();
    this.api = createAxios(this.baseUrl);
  }

  paginate(query: Record<string, string | number> = {}): Promise<AxiosResponse<TBreakingBadPaginationResponse>> {
    return this.api.get('/', { params: query });
  }

  get(id: number): Promise<AxiosResponse<TBreakingBadCharacter>> {
    return this.api.get(`/${id}`);
  }

  store(data: any): Promise<AxiosResponse> {
    return this.api.post('/', data);
  }

  update(id: number, data: any): Promise<AxiosResponse> {
    return this.api.put(`/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse> {
    return this.api.delete(`/${id}`);
  }
}

export default new BreakingBadApi();
