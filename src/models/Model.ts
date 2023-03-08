import type { TModel } from '@/types';
import moment from 'moment';

export default abstract class Model {
  readonly id: number;
  readonly created_at: moment.Moment | null;
  readonly deleted_at: moment.Moment | null;
  readonly updated_at: moment.Moment | null;

  protected constructor(model: Partial<TModel> = {}) {
    this.id = model.id ?? 0;
    this.created_at = model.created_at ? moment(model.created_at) : null;
    this.updated_at = model.updated_at ? moment(model.updated_at) : null;
    this.deleted_at = model.deleted_at ? moment(model.deleted_at) : null;
  }

  toJson<T>(): T {
    return JSON.parse(JSON.stringify(this));
  }

  isDeleted(): boolean {
    return this.deleted_at !== null;
  }
}
