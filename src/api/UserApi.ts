import ApiResource from '@/api/ApiResource';
import type { AxiosInstance } from 'axios';
import createAxios from '@/services/axios.service';
import type { TModelDeleted, TPaginationQuery, TUser, TUserPaginationResponse } from '@/types';
import mockUsers from '@/mocks/users.mock';

class UserApi extends ApiResource {
  protected readonly baseUrl: string = 'http://fake-users.api';
  protected readonly api: AxiosInstance;

  constructor() {
    super();
    this.api = createAxios(this.baseUrl);
  }

  paginate(query: TPaginationQuery): Promise<TUserPaginationResponse> {
    return mockUsers.getUsers(query);
  }

  get(id: number): Promise<TUser> {
    return mockUsers.getUser(id);
  }

  store(data: TUser): Promise<TUser> {
    return mockUsers.storeUser(data);
  }

  update(id: number, data: TUser): Promise<TUser> {
    return mockUsers.updateUser(id, data);
  }

  delete(id: number): Promise<TModelDeleted> {
    return mockUsers.deleteUser(id);
  }
}

export default new UserApi();
