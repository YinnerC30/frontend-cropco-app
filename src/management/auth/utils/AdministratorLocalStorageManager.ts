import { Administrator } from '../interfaces/Administrator';
import { createLocalStorageManager } from '../../../lib/localStorageManager';

export class AdministratorLocalStorageManager {
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
    AdministratorLocalStorageManager.defaultValues
  );

  static getAdministrator(): Administrator {
    return AdministratorLocalStorageManager.tenantManagementStorage.get();
  }

  static getToken(): string {
    return AdministratorLocalStorageManager.tenantManagementStorage.getProperty(
      'token'
    );
  }

  static removeAdministrator(): void {
    AdministratorLocalStorageManager.tenantManagementStorage.remove();
  }

  static saveAdministrator(tenant: Administrator): void {
    AdministratorLocalStorageManager.tenantManagementStorage.save(tenant);
  }

  static renewToken(token: string): void {
    AdministratorLocalStorageManager.tenantManagementStorage.updatePartial({
      token,
    });
  }
}
