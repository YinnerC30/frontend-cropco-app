
import { Navigate } from 'react-router-dom';
import { CreateTenant, ViewTenant } from '../components';
import TenantsModule from '../components/module/TenantsModule';

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
    {
      path: 'view/one/:id',
      element: <ViewTenant />,
    },
  ],
};

export { tenantRoutes };

