import { computed } from 'vue';
import { auth } from '@/store/state/auth';

export const isUserAuthenticated = computed<boolean>(() => auth.value.id !== 0);
