import { Loading } from '@/modules/core/components';
import CustomLazyLoadComponent from '@/routes/components/CustomLazyLoadComponent';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const CreateAdministrator = lazy(
  () => import('../components/CreateAdministrator')
);
const ModifyAdministrator = lazy(
  () => import('../components/ModifyAdministrator')
);
const AdministratorsModule = lazy(
  () => import('../components/module/AdministratorsModule')
);
const ViewAdministrator = lazy(() => import('../components/ViewAdministrator'));

const administratorRoutes = {
  path: 'administrators',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    {
      path: 'view/all',
      element: (
        <CustomLazyLoadComponent titlePage="Administradores">
          <Suspense fallback={<Loading />}>
            <AdministratorsModule />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
    {
      path: 'create/one',
      element: (
        <CustomLazyLoadComponent titlePage="Crear administrador">
          <Suspense fallback={<Loading />}>
            <CreateAdministrator />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
    {
      path: 'view/one/:id',
      element: (
        <CustomLazyLoadComponent titlePage="Ver administrador">
          <Suspense fallback={<Loading />}>
            <ViewAdministrator />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
    {
      path: 'update/one/:id',
      element: (
        <CustomLazyLoadComponent titlePage="Actualizar administrador">
          <Suspense fallback={<Loading />}>
            <ModifyAdministrator />
          </Suspense>
        </CustomLazyLoadComponent>
      ),
    },
  ],
};

export { administratorRoutes };
