import type { IUserCredentials } from '@/interfaces';
import { faker } from '@faker-js/faker';

export default function mockLoginRequest(credentials: IUserCredentials) {
  return new Promise(resolve => {
    setTimeout(() => {
      const user = {
        id: 1,
        name: faker.name.fullName(),
        email: credentials.email,
      };
      resolve(user);
    }, 100);
  });
}
