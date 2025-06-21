import { TenantAdministrator } from '../interfaces/TenantAdministrator';

const KEY_TENANT_MANAGEMENT_LOCAL_STORAGE = 'current-tenant-management';

export const getTenantManagementToLocalStorage = (): TenantAdministrator => {
  const defaultValues: TenantAdministrator = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    cell_phone_number: '',
    password: '',
    role: '',
    is_active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    token: '',
    is_login: false,
  };
  const data = localStorage.getItem(KEY_TENANT_MANAGEMENT_LOCAL_STORAGE);
  if (!data) {
    return defaultValues;
  }
  return {
    ...JSON.parse(data),
  };
};

export const getTenantManagementTokenToLocalStorage = (): string => {
  const data = localStorage.getItem(KEY_TENANT_MANAGEMENT_LOCAL_STORAGE);
  if (!data) {
    return '';
  }
  return JSON.parse(data).token;
};

export const removeTenantManagementInLocalStorage = (): void => {
  localStorage.removeItem(KEY_TENANT_MANAGEMENT_LOCAL_STORAGE);
};

export const saveTenantManagementInLocalStorage = (
  tenant: TenantAdministrator
): void => {
  localStorage.setItem(
    KEY_TENANT_MANAGEMENT_LOCAL_STORAGE,
    JSON.stringify(tenant)
  );
};
