import { Tenant } from '../interfaces/Tenant';

const KEY_TENANT_LOCAL_STORAGE = 'current-tenant';

export const getTenantToLocalStorage = (): Tenant => {
  const defaultValues: Tenant = {
    id: '',
  };
  const data = localStorage.getItem(KEY_TENANT_LOCAL_STORAGE);
  if (!data) {
    return defaultValues;
  }
  // return JSON.parse(data || '');
  return {
    ...JSON.parse(data),
  };
};

export const getTenantIdToLocalStorage = (): string => {
  const data = localStorage.getItem(KEY_TENANT_LOCAL_STORAGE);
  if (!data) {
    return '';
  }
  return JSON.parse(data).id;
};

export const removeTenantInLocalStorage = (): void => {
  localStorage.removeItem(KEY_TENANT_LOCAL_STORAGE);
};

export const saveTenantInLocalStorage = (tenant: Tenant): void => {
  localStorage.setItem(KEY_TENANT_LOCAL_STORAGE, JSON.stringify(tenant));
};
