import { Administrator } from '../interfaces/Administrator';
import { createLocalStorageManager } from '../../../lib/localStorageManager';

export class TenantManagementLocalStorageManager {
  private static readonly defaultValues: Administrator = {
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

  private static readonly tenantManagementStorage = createLocalStorageManager(
    'current-tenant-management',
    TenantManagementLocalStorageManager.defaultValues
  );

  static getTenantManagement(): Administrator {
    return TenantManagementLocalStorageManager.tenantManagementStorage.get();
  }

  static getToken(): string {
    return TenantManagementLocalStorageManager.tenantManagementStorage.getProperty(
      'token'
    );
  }

  static removeTenantManagement(): void {
    TenantManagementLocalStorageManager.tenantManagementStorage.remove();
  }

  static saveTenantManagement(tenant: Administrator): void {
    TenantManagementLocalStorageManager.tenantManagementStorage.save(tenant);
  }

  static renewToken(token: string): void {
    TenantManagementLocalStorageManager.tenantManagementStorage.updatePartial({
      token,
    });
  }
}
