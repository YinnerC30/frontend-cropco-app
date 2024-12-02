import { PATH_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_HOME_APP}/harvests`;

type HarvestRoutes = 'ViewAll' | 'Create' | 'Update' | 'ViewOne' | 'Processed';

export const MODULE_HARVESTS_PATHS: Record<HarvestRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  Update: `${PATH_BASE}/update/one/`,
  ViewOne: `${PATH_BASE}/view/one/`,
  Processed: `${PATH_BASE}/processed/view/one/`,
};
