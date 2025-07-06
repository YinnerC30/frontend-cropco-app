import { Loading } from '@/modules/core/components';
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
        <Suspense fallback={<Loading />}>
          <AdministratorsModule />
        </Suspense>
      ),
    },
    {
      path: 'create/one',
      element: (
        <Suspense fallback={<Loading />}>
          <CreateAdministrator />
        </Suspense>
      ),
    },
    {
      path: 'view/one/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <ViewAdministrator />
        </Suspense>
      ),
    },
    {
      path: 'update/one/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <ModifyAdministrator />
        </Suspense>
      ),
    },
  ],
};

export { administratorRoutes };
