import { UserLocalStorageManager } from '@/auth';
import { TenantLocalStorageManager } from '@/auth/utils/TenantLocalStorageManager';
import { BASE_PATH_API_CROPCO } from '@/config';
import { TenantManagementLocalStorageManager } from '@/management/auth/utils/TenantManagementLocalStorageManager';
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
  shopping: string;
  consumption: string;
  dashboard: string;
  tenants: string;
  administrators: string;
}

// Crear una instancia de Axios con la URL base y encabezados configurados
export const cropcoAPI: AxiosInstance = axios.create({
  baseURL: BASE_PATH_API_CROPCO,
  headers: {
    'Content-Type': 'application/json',
  },
  // Habilitar el envío automático de cookies
  withCredentials: true,
});

// Añadir el interceptor de solicitud para agregar headers adicionales (ya no el token JWT)
cropcoAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.skipInterceptor) {
      return config; // Ignora el interceptor y devuelve la configuración
    }

    // const token = UserLocalStorageManager.getToken();
    // if (!!token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    // Ya no enviamos el token JWT manualmente - se envía automáticamente via cookies
    // Solo mantenemos los headers adicionales que necesites
    const tenantId = TenantLocalStorageManager.getTenantIdToLocalStorage();
    if (!!tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }

    const tenantToken = TenantManagementLocalStorageManager.getToken();
    if (!!tenantToken) {
      config.headers['x-administration-token'] = tenantToken;
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
  harvestsStock: '/harvests/stock',
  sales: '/sales',
  works: '/works',
  payments: '/payments',
  authentication: '/auth',
  shopping: 'shopping',
  consumption: 'consumptions',
  dashboard: 'dashboard',
  tenants: 'tenants',
  administrators: 'administrators',
};
