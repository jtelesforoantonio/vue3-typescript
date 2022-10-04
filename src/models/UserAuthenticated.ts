import type { IUserAuthenticated } from '@/interfaces';

export default class UserAuthenticated {
  readonly id: number;
  name: string;
  email: string;
  nickname: string;

  constructor(data?: IUserAuthenticated) {
    this.id = data?.id || 0;
    this.name = data?.name || '';
    this.email = data?.email || '';
    this.nickname = this.name || this.email;
  }

  refreshNickname() {
    this.nickname = this.name || this.email;
  }
}
