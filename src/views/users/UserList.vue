<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-2 col-lg-2">
        <div class="form-floating mb-3">
          <input
            id="amount"
            type="number"
            class="form-control"
            placeholder="Users per page"
            min="1"
            v-model="amount"
            @change="getUsers"
          >
          <label for="amount">Users per page</label>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <Loader :show="loadingData"/>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="`badge text-bg-${user.statusColor}`">{{ user.statusLabel }}</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm" @click="handleEdit(user)">Edit</button>&nbsp;
              <button class="btn btn-outline-danger btn-sm" @click="handleDeleteRequest(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav>
        <ul class="pagination justify-content-end">
          <li class="page-item">
            <a class="page-link" href="#" @click.prevent="getUsers">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <Modal title="Edit user" v-model="showModal" hide-top-close-button backdrop-static>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="form-floating mb-3">
          <input
            id="name"
            type="text"
            class="form-control"
            placeholder="Name"
            v-model.trim="editingUser.name"
          >
          <label for="name">Name</label>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="form-floating mb-3">
          <input
            id="email"
            type="email"
            class="form-control"
            placeholder="Email"
            v-model.trim="editingUser.email"
          >
          <label for="email">Email</label>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="form-floating">
          <select id="status" class="form-select" v-model="editingUser.status">
            <option selected disabled></option>
            <option
              v-for="(status, key) in User.STATUS_LABELS_TYPES"
              :key="key"
              :value="key"
            >
              {{ status.label }}
            </option>
          </select>
          <label for="status">Select a status</label>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-outline-secondary"
        data-bs-dismiss="modal"
        :disabled="updatingUser"
      >
        Cancel
      </button>
      <button type="button" class="btn btn-outline-success" @click="handleUpdate" :disabled="updatingUser">
        <span v-if="updatingUser" class="spinner-border spinner-border-sm"></span>
        <span v-else>Save</span>
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
/**
 * @overview Componente usando la API de Composición.
 */
import { onBeforeMount, ref } from 'vue';
import User from '@/models/User';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';
import UserApi from '@/api/UserApi';
import type { TPaginationQuery, TUser } from '@/types';
import { DeleteAlert, ErrorAlert, Toast } from '@/services/swal.service';

const loadingData = ref<boolean>(false);
const showModal = ref<boolean>(false);
const amount = ref<number>(5);
const users = ref<User[]>([]);
const editingUser = ref<User>(new User());
const updatingUser = ref<boolean>(false);

onBeforeMount(() => {
  getUsers();
});

async function getUsers() {
  try {
    loadingData.value = true;
    const pagination: TPaginationQuery = {
      page: 1,
      items: amount.value || 5,
    };
    const response = await UserApi.paginate(pagination);
    users.value = User.collection(response.data);
  } catch (e) {
    ErrorAlert.fire({});
  } finally {
    loadingData.value = false;
  }
}

function handleEdit(user: User) {
  editingUser.value = new User(user.toJson<TUser>());
  showModal.value = true;
}

async function handleUpdate() {
  try {
    updatingUser.value = true;
    const response = await UserApi.update(editingUser.value.id, editingUser.value.toJson<TUser>());
    const index = users.value.findIndex(user => user.id === editingUser.value.id);
    users.value[index] = new User(response);
    editingUser.value = new User();
    showModal.value = false;
    Toast.fire({ title: 'User updated' });
  } catch (e) {
    ErrorAlert.fire({});
  } finally {
    updatingUser.value = false;
  }
}

function handleDeleteRequest(user: User) {
  DeleteAlert.fire({
    title: 'Delete user?',
    preConfirm: async () => {
      try {
        await UserApi.delete(user.id);
        users.value = users.value.filter(item => item.id !== user.id);
        Toast.fire({ title: 'User deleted' });
      } catch (e) {
        DeleteAlert.showValidationMessage('Something went wrong, try again');
      }
    }
  });
}
</script>
