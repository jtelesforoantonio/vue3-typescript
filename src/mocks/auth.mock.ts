import type { TUserCredentials } from '@/types';
import { faker } from '@faker-js/faker';

export default function mockLoginRequest(credentials: TUserCredentials): Promise<any> {
  return new Promise(resolve => {
    const user = {
      id: 1,
      name: faker.name.fullName(),
      email: credentials.email,
    };
    setTimeout(() => resolve(user), 100);
  });
}
