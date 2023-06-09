import type { TUser } from '@/types';
import { Status, statusFromValue } from '@/enums/status';
import Model from '@/models/Model';

export default class User extends Model {
  name: string;
  email: string;
  readonly status: Status;

  static STATUS_LABELS_TYPES = {
    [Status.ACTIVE]: {
      label: 'Active',
      type: 'success',
    },
    [Status.INACTIVE]: {
      label: 'Inactive',
      type: 'warning',
    },
    [Status.PENDING]: {
      label: 'Pending',
      type: 'light',
    },
    [Status.UNKNOWN]: {
      label: 'Unknown',
      type: 'secondary',
    },
  };

  /**
   * Create a new user.
   */
  constructor(user: Partial<TUser> = {}) {
    super(user);
    this.name = user.name ?? '';
    this.email = user.email ?? '';
    this.status = statusFromValue(user.status ?? '');
  }

  static collection(users: TUser[]): User[] {
    return users.map(user => new User(user));
  }

  get statusLabel(): string {
    return User.STATUS_LABELS_TYPES[this.status].label;
  }

  get statusColor(): string {
    return User.STATUS_LABELS_TYPES[this.status].type;
  }

  isActive(): boolean {
    return this.status === Status.ACTIVE;
  }

  isInactive(): boolean {
    return this.status === Status.INACTIVE;
  }

  isPending(): boolean {
    return this.status === Status.PENDING;
  }
}
