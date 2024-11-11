import { Loading } from '@/modules/core/components';
import { ProtectedRoute } from '@/routes/components';

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
      element: <Navigate to="view/all" />,
    },
    {
      path: 'view/all',
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
      path: 'create/one',
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
      path: 'view/one/:id',
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
      path: 'update/one/:id',
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
