import { BASE_PATH_API_CROPCO } from '@/config';
import { getTokenToLocalStorage } from '@/auth/utils/manageUserInLocalStorage';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    skipInterceptor?: boolean; // Agrega esta propiedad opcional
  }
}

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
  baseURL: BASE_PATH_API_CROPCO,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Añadir el interceptor de solicitud para agregar el token de autorización
cropcoAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.skipInterceptor) {
      return config; // Ignora el interceptor y devuelve la configuración
    }
    const token = getTokenToLocalStorage();
    if (!!token) {
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
  harvests: '/harvests',
  harvestsProcessed: '/harvests/processed',
  harvestsStock: '/harvest/stock',
  sales: '/sales',
  works: '/works',
  payments: '/payments',
  authentication: '/auth',
  purchase: 'supplies/purchase',
  consumption: 'supplies/consumption',
};
