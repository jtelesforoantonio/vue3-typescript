import { faker } from '@faker-js/faker';
import type { TPaginationQuery } from '@/types';

const status = ['A', 'I', 'P'];
const dates = [faker.date.past().toJSON(), null];
const defaultTimeout = 100;

const mockUsers = {
  getUsers(query: TPaginationQuery): Promise<any> {
    return new Promise(resolve => {
      const data: any = [];
      for (let i = 0; i < query.items; i++) {
        data.push({
          id: (i + 1),
          name: faker.name.fullName(),
          email: faker.internet.email(),
          status: status[faker.datatype.number({ min: 0, max: 2 })],
          created_at: faker.date.past().toJSON(),
          updated_at: faker.date.past().toJSON(),
          deleted_at: dates[faker.datatype.number({ min: 0, max: 1 })],
        });
      }
      setTimeout(() => resolve({ data, total: query.items }), defaultTimeout);
    });
  },
  getUser(id: number): Promise<any> {
    return new Promise(resolve => {
      const user = {
        id: id,
        name: faker.name.fullName(),
        email: faker.internet.email(),
        status: status[faker.datatype.number({ min: 0, max: 2 })],
        created_at: faker.date.past().toJSON(),
        updated_at: faker.date.past().toJSON(),
        deleted_at: dates[faker.datatype.number({ min: 0, max: 1 })],
      };
      setTimeout(() => resolve(user), defaultTimeout);
    });
  },
  storeUser(data: Record<string, any>): Promise<any> {
    return new Promise(resolve => {
      const user = {
        id: faker.datatype.number({ min: 100, max: 1000 }),
        name: data.name,
        email: data.email,
        status: data.status,
        created_at: faker.date.recent().toJSON(),
        updated_at: null,
        deleted_at: null,
      };
      setTimeout(() => resolve(user), defaultTimeout);
    });
  },
  updateUser(id: number, data: Record<string, any>): Promise<any> {
    return new Promise(resolve => {
      const user = {
        id: id,
        name: data.name,
        email: data.email,
        status: data.status,
        created_at: data.created_at,
        updated_at: faker.date.recent().toJSON(),
        deleted_at: null,
      };
      setTimeout(() => resolve(user), defaultTimeout);
    });
  },
  deleteUser(id: number): Promise<any> {
    return new Promise(resolve => {
      const user = {
        id,
        deleted_at: faker.date.recent().toJSON(),
      };
      setTimeout(() => resolve(user), defaultTimeout);
    });
  },
};

export default mockUsers;
