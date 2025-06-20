import { PATH_MANAGEMENT_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_MANAGEMENT_HOME_APP}/administrators`;

type AdministratorRoutes =
  | 'ViewAll'
  | 'Create'
  | 'Update'
  | 'ViewOne'
  | 'ChangePassword';

export const MODULE_ADMINISTRATORS_PATHS: Record<AdministratorRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  Update: `${PATH_BASE}/update/one/`,
  ViewOne: `${PATH_BASE}/view/one/`,
  ChangePassword: `${PATH_BASE}/change-password/one`,
};
