import { ref, watch } from 'vue';
import UserAuthenticated from '@/models/UserAuthenticated';
import { handleSetUserAuthenticated } from '@/store/actions/auth';

const user = localStorage.getItem('user');
export const auth = ref<UserAuthenticated>(new UserAuthenticated(JSON.parse(user || '{}')));
watch(
  () => auth.value.name,
  () => {
    auth.value.refreshNickname();
    handleSetUserAuthenticated(auth.value);
  }
);
