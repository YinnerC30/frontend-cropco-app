import { Navigate } from 'react-router-dom';
import { Loading } from '@/modules/core/components';
import { lazy, Suspense } from 'react';
import TenantsModule from '../components/module/TenantsModule';

const CreateTenant = lazy(() => import('../components/CreateTenant'));
const ModifyTenant = lazy(() => import('../components/ModifyTenant'));
const ViewTenant = lazy(() => import('../components/ViewTenant'));
const AdminUsers = lazy(
  () => import('../components/administration-users/AdminUsers')
);

const tenantRoutes = {
  path: 'tenants',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    {
      path: 'view/all',
      element: (
        <Suspense fallback={<Loading />}>
          <TenantsModule />
        </Suspense>
      ),
    },
    {
      path: 'create/one',
      element: (
        <Suspense fallback={<Loading />}>
          <CreateTenant />
        </Suspense>
      ),
    },
    {
      path: 'view/one/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <ViewTenant />
        </Suspense>
      ),
    },
    {
      path: 'update/one/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <ModifyTenant />
        </Suspense>
      ),
    },
    {
      path: 'administration-users/one/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <AdminUsers />
        </Suspense>
      ),
    },
  ],
};

export { tenantRoutes };
