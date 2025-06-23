import { Tenant } from '../interfaces/Tenant';
import { createLocalStorageManager } from '../../lib/localStorageManager';

export class TenantLocalStorageManager {
  private static readonly defaultValues: Tenant = {
    id: '',
  };

  private static readonly tenantStorage = createLocalStorageManager(
    'current-tenant',
    TenantLocalStorageManager.defaultValues
  );

  static getTenantToLocalStorage(): Tenant {
    return TenantLocalStorageManager.tenantStorage.get();
  }

  static getTenantIdToLocalStorage(): string {
    return TenantLocalStorageManager.tenantStorage.getProperty('id');
  }

  static removeTenantInLocalStorage(): void {
    TenantLocalStorageManager.tenantStorage.remove();
  }

  static saveTenantInLocalStorage(tenant: Tenant): void {
    TenantLocalStorageManager.tenantStorage.save(tenant);
  }
}
