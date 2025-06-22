import { Navigate } from 'react-router-dom';
import { CreateTenant, ModifyTenant, ViewTenant } from '../components';
import TenantsModule from '../components/module/TenantsModule';
import { AdminUsers } from '../components/administration-users/AdminUsers';

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
    {
      path: 'update/one/:id',
      element: <ModifyTenant />,
    },
    {
      path: 'administration-users/one/:id',
      element: <AdminUsers />,
    },
  ],
};

export { tenantRoutes };
