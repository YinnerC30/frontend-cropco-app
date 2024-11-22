import { PATH_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_HOME_APP}/employees`;

type EmployeeRoutes = 'ViewAll' | 'Create' | 'Update' | 'ViewOne';

export const MODULE_EMPLOYEE_PATHS: Record<EmployeeRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  Update: `${PATH_BASE}/update/one/`,
  ViewOne: `${PATH_BASE}/view/one/`,
};
