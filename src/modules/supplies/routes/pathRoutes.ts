import { PATH_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_HOME_APP}/supplies`;

type SupplyRoutes = 'ViewAll' | 'Create' | 'Update' | 'ViewOne';

export const MODULE_SUPPLIES_PATHS: Record<SupplyRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  Update: `${PATH_BASE}/update/one/`,
  ViewOne: `${PATH_BASE}/view/one/`,
};
