import type { TUserAuthenticated } from '@/types';

export default class UserAuthenticated {
  readonly preferredNickname: string = 'name';
  readonly id: number;
  name: string;
  email: string;

  constructor(data: Partial<TUserAuthenticated> = {}) {
    this.id = data?.id || 0;
    this.name = data?.name || '';
    this.email = data?.email || '';
  }

  get nickname(): string {
    return this[this.preferredNickname];
  }
}
