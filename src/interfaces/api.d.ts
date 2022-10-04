import type { AxiosResponse } from 'axios';

export declare interface IApiResource {
  paginate(query: any): Promise<AxiosResponse>;
  get(id: string | number): Promise<AxiosResponse>;
  store(data: any): Promise<AxiosResponse>;
  update(id: string | number, data: any): Promise<AxiosResponse>;
  delete(id: string | number): Promise<AxiosResponse>;
}
