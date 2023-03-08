import type { AxiosInstance } from 'axios';

export default abstract class ApiResource {
  protected abstract readonly baseUrl: string;
  protected abstract readonly api: AxiosInstance;

  abstract paginate(query: any): Promise<any>;

  abstract get(id: string | number): Promise<any>;

  abstract delete(id: string | number): Promise<any>;

  abstract store(data: any): Promise<any>;

  abstract update(id: string | number, data: any): Promise<any>;
}
