import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import '@/scss/styles.scss';
import { handleLogout } from '@/store/actions/auth';

window.addEventListener('storage', () => handleLogout());

createApp(App).use(router).mount('#app');
