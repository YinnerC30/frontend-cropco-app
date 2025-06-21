import { PATH_MANAGEMENT_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_MANAGEMENT_HOME_APP}/tenants`;

type TenantRoutes = 'ViewAll' | 'Create' | 'Update' | 'ViewOne' | 'AdminUsers';

export const MODULE_TENANTS_PATHS: Record<TenantRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  Update: `${PATH_BASE}/update/one/`,
  ViewOne: `${PATH_BASE}/view/one/`,
  AdminUsers: `${PATH_BASE}/administration-users/`,
}; 