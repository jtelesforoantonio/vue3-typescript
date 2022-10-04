import router from '@/router';
import UserAuthenticated from '@/models/UserAuthenticated';
import { auth } from '@/store/state/auth';

export function handleSetUserAuthenticated(user: UserAuthenticated) {
  localStorage.setItem('user', JSON.stringify(user));
  auth.value = user;
}

export function handleLogout() {
  localStorage.clear();
  auth.value = new UserAuthenticated();
  router.push({ name: 'auth.login' });
}
