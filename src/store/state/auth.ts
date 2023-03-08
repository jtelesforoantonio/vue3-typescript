import { ref } from 'vue';
import UserAuthenticated from '@/models/UserAuthenticated';

const user = localStorage.getItem('user');
export const auth = ref<UserAuthenticated>(new UserAuthenticated(JSON.parse(user || '{}')));
