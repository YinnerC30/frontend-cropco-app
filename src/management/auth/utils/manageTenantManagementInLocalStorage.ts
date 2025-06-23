import { Administrator } from '../interfaces/Administrator';
import { createLocalStorageManager } from '../../../lib/localStorageManager';

const defaultValues: Administrator = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  password: '',
  role: '',
  is_active: false,
  token: '',
  is_login: false,
};

// Crear instancia del manager para tenant management
const tenantManagementStorage = createLocalStorageManager(
  'current-tenant-management',
  defaultValues
);

// Exportar funciones usando la nueva utilidad
export const getTenantManagementToLocalStorage = (): Administrator => {
  return tenantManagementStorage.get();
};

export const getTenantManagementTokenToLocalStorage = (): string => {
  return tenantManagementStorage.getProperty('token');
};

export const removeTenantManagementInLocalStorage = (): void => {
  tenantManagementStorage.remove();
};

export const saveTenantManagementInLocalStorage = (
  tenant: Administrator
): void => {
  tenantManagementStorage.save(tenant);
};

// Función adicional para renovar solo el token
export const renewTenantManagementTokenInLocalStorage = (
  token: string
): void => {
  tenantManagementStorage.updatePartial({ token });
};
