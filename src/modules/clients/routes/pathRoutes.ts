import { PATH_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_HOME_APP}/clients`;

type ClientRoutes = 'ViewAll' | 'Create' | 'Update' | 'ViewOne';

export const MODULE_CLIENTS_PATHS: Record<ClientRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  Update: `${PATH_BASE}/update/one/`,
  ViewOne: `${PATH_BASE}/view/one/`,
};
