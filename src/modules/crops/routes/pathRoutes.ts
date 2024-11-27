import { PATH_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_HOME_APP}/crops`;

type CropRoutes = 'ViewAll' | 'Create' | 'Update' | 'ViewOne';

export const MODULE_CROPS_PATHS: Record<CropRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  Update: `${PATH_BASE}/update/one/`,
  ViewOne: `${PATH_BASE}/view/one/`,
};
