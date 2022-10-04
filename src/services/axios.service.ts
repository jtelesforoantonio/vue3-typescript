import axios, { type AxiosInstance } from 'axios';

export default function createAxios(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
    },
  });
}
