import { Tenant } from '../interfaces/Tenant';
import { createLocalStorageManager } from '../../lib/localStorageManager';

const defaultValues: Tenant = {
  id: '',
};

// Crear instancia del manager para tenant
const tenantStorage = createLocalStorageManager('current-tenant', defaultValues);

// Exportar funciones usando la nueva utilidad
export const getTenantToLocalStorage = (): Tenant => {
  return tenantStorage.get();
};

export const getTenantIdToLocalStorage = (): string => {
  return tenantStorage.getProperty('id');
};

export const removeTenantInLocalStorage = (): void => {
  tenantStorage.remove();
};

export const saveTenantInLocalStorage = (tenant: Tenant): void => {
  tenantStorage.save(tenant);
};
