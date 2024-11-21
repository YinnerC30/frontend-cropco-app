import { PATH_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_HOME_APP}/users`;

type UserRoutes =
  | 'ViewAll'
  | 'Create'
  | 'Update'
  | 'ViewOne'
  | 'ChangePassword';

export const MODULE_USER_PATHS: Record<UserRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  Update: `${PATH_BASE}/update/one/`,
  ViewOne: `${PATH_BASE}/view/one/`,
  ChangePassword: `${PATH_BASE}/change-password/one`,
};
