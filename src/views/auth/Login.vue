<template>
  <div class="row">
    <div class="col-sm-4 offset-sm-4">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleLogin">
            <div class="mb-3 text-center">
              <img src="/vue.svg" height="80" alt="Vue logo"/>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                v-model.trim="credentials.email"
                type="email"
                class="form-control"
                name="email"
                autocomplete="username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                v-model.trim="credentials.password"
                type="password"
                class="form-control"
                name="password"
                autocomplete="current-password"
                required
              />
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-outline-dark" type="submit" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span v-else>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserAuthenticated from '@/models/UserAuthenticated';
import { handleSetUserAuthenticated } from '@/store/actions/auth';
import type { TUserAuthenticated, TUserCredentials } from '@/types';
import mockLoginRequest from '@/mocks/auth.mock';
import { ErrorAlert } from '@/services/swal.service';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      isLoading: false,
      credentials: {
        email: '',
        password: '',
      } as TUserCredentials,
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.isLoading = true;
        const user: TUserAuthenticated = await mockLoginRequest(this.credentials);
        handleSetUserAuthenticated(new UserAuthenticated(user));
        this.$router.push({ name: 'dashboard' });
      } catch (e) {
        ErrorAlert.fire({});
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
