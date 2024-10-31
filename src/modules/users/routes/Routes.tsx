import { Loading } from '@/modules/core/components';
import ProtectedRoute from '@/routes/components/ProtectedRoute';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// Lazy load de los componentes
const CreateUser = lazy(() => import('./../components/CreateUser'));
const ModifyUser = lazy(() => import('./../components/ModifyUser'));
const UsersModule = lazy(() => import('./../components/UsersModule'));
const ViewUser = lazy(() => import('./../components/ViewUser'));

const userRoutes = {
  path: 'users',
  children: [
    {
      index: true,
      element: <Navigate to="all" />,
    },
    {
      path: 'all',
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute
            module="users"
            action="find_all_users"
            element={<UsersModule />}
            viewComponent={true}
          />
        </Suspense>
      ),
    },
    {
      path: 'create',
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute
            module="users"
            action="create_user"
            element={<CreateUser />}
          />
        </Suspense>
      ),
    },
    {
      path: 'view/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute
            module="users"
            action="find_one_user"
            element={<ViewUser />}
          />
        </Suspense>
      ),
    },
    {
      path: 'modify/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute
            module="users"
            action="update_one_user"
            element={<ModifyUser />}
          />
        </Suspense>
      ),
    },
  ],
};

export { userRoutes };

