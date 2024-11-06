import { getTokenToLocalStorage } from '@/modules/authentication/utils/manageUserInLocalStorage';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

interface PathsCropco {
  users: string;
  crops: string;
  clients: string;
  employees: string;
  suppliers: string;
  supplies: string;
  harvests: string;
  harvestsProcessed: string;
  harvestsStock: string;
  sales: string;
  works: string;
  payments: string;
  authentication: string;
  purchase: string;
  consumption: string;
}

// Crear una instancia de Axios con la URL base y encabezados configurados
export const cropcoAPI: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOST_API_CROPCO as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Añadir el interceptor de solicitud para agregar el token de autorización
cropcoAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getTokenToLocalStorage();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
);

// Definir las rutas como constantes tipadas
export const pathsCropco: PathsCropco = {
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
