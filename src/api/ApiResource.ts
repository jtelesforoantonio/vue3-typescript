import type { AxiosInstance, AxiosResponse } from 'axios';
import type { IApiResource } from '@/interfaces';

export default abstract class ApiResource implements IApiResource {
  protected abstract readonly baseUrl: string;
  protected abstract readonly api: AxiosInstance;

  abstract paginate(query: any): Promise<AxiosResponse>;

  abstract get(id: string | number): Promise<AxiosResponse>;

  abstract delete(id: string | number): Promise<AxiosResponse>;

  abstract store(data: any): Promise<AxiosResponse>;

  abstract update(id: string | number, data: any): Promise<AxiosResponse>;
}
