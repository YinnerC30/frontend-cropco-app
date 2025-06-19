import { RouteConfig } from '@/routes/interfaces/RouteConfig';

import { Navigate } from 'react-router-dom';
import TenantsModule from '../components/module/TenantsModule';
import { CreateTenant } from '../components';

// const TenantsModule = lazy(() => import('../components/module/TenantsModule'));
// const CreateTenant = lazy(() => import('../components/CreateTenant'));
// const ViewTenant = lazy(() => import('../components/ViewTenant'));
// const ModifyTenant = lazy(() => import('../components/ModifyTenant'));

// Configuración genérica de las rutas
const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_tenants',
    element: <TenantsModule />,
    viewComponent: true,
  },
  // {
  //   path: 'create/one',
  //   action: 'create_tenant',
  //   element: <CreateTenant />,
  // },
  // {
  //   path: 'view/one/:id',
  //   action: 'find_one_tenant',
  //   element: <ViewTenant />,
  // },
  // {
  //   path: 'update/one/:id',
  //   action: 'update_one_tenant',
  //   element: <ModifyTenant />,
  // },
];

const tenantRoutes = {
  path: 'tenants',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    {
      path: 'view/all',
      element: <TenantsModule />,
    },
    {
      path: 'create/one',
      element: <CreateTenant />,
    },
  ],
};

export { tenantRoutes };
