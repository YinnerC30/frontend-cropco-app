import axios from 'axios';

export const cropcoAPI = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_API_CROPCO}`,
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
  sales: '/sales',
};
