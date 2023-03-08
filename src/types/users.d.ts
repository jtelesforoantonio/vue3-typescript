import { Status } from '@/enums/status';
import type { TModel } from '@/types/mixins';

export declare type TUserCredentials = {
  email: string;
  password: string;
}

export declare type TUserAuthenticated = {
  readonly id: number;
  name: string;
  email: string;
}

export declare type TUser = TModel & {
  name: string;
  email: string;
  readonly status: Status
}

export declare type TUserPaginationResponse = {
  data: TUser[];
  total: number;
}
