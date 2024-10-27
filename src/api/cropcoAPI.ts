import { getTokenToLocalStorage } from '@/modules/authentication/utils/manageUserInLocalStorage';
import axios from 'axios';

export const cropcoAPI = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_API_CROPCO}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

cropcoAPI.interceptors.request.use((config) => {
  const token = getTokenToLocalStorage();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const pathsCropco = {
  users: '/users',
  crops: '/crops',
  clients: '/clients',
  employees: '/employees',
  suppliers: '/suppliers',
  supplies: '/supplies',
  harvests: '/harvest',
  harvestsProcessed: '/harvest/processed',
  harvestsStock: '/harvest/stock',
  sales: '/sales',
  works: '/works',
  payments: '/payments',
  authentication: '/auth',
  purchase: 'supplies/purchase',
  consumption: 'supplies/consumption',
};
