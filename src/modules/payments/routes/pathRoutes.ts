import { PATH_HOME_APP } from '@/config';

const PATH_BASE = `${PATH_HOME_APP}/payments`;

type PaymentsRoutes = 'ViewAll' | 'Create' | 'ViewOne';

export const MODULE_PAYMENTS_PATHS: Record<PaymentsRoutes, string> = {
  ViewAll: `${PATH_BASE}/view/all`,
  Create: `${PATH_BASE}/create/one`,
  ViewOne: `${PATH_BASE}/view/one/`,
};
