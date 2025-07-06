import { Navigate } from 'react-router-dom';
import { Loading } from '@/modules/core/components';
import { lazy, Suspense } from 'react';
import TenantsModule from '../components/module/TenantsModule';
import CustomLazyLoadComponent from '@/routes/components/CustomLazyLoadComponent';

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
        <CustomLazyLoadComponent titlePage="Inquilinos">
          <Suspense fallback={<Loading />}>
            <TenantsModule />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
    {
      path: 'create/one',
      element: (
        <CustomLazyLoadComponent titlePage="Crear inquilino">
          <Suspense fallback={<Loading />}>
            <CreateTenant />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
    {
      path: 'view/one/:id',
      element: (
        <CustomLazyLoadComponent titlePage="Ver inquilino">
          <Suspense fallback={<Loading />}>
            <ViewTenant />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
    {
      path: 'update/one/:id',
      element: (
        <CustomLazyLoadComponent titlePage="Actualizar inquilino">
          <Suspense fallback={<Loading />}>
            <ModifyTenant />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
    {
      path: 'administration-users/one/:id',
      element: (
        <CustomLazyLoadComponent titlePage="Administrar usuarios de inquilino">
          <Suspense fallback={<Loading />}>
            <AdminUsers />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
  ],
};

export { tenantRoutes };
