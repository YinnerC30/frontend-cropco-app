import ProtectedRoute from '@/modules/authentication/components/ProtectedRoute';
import { CreateUser, ModifyUser, UsersModule, ViewUser } from '../components';
import { Navigate } from 'react-router-dom';

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
        <ProtectedRoute
          module="users"
          action="find_all_users"
          element={<UsersModule />}
        />
      ),
    },
    {
      path: 'create',

      element: (
        <ProtectedRoute
          module="users"
          action="create_user"
          element={<CreateUser />}
        />
      ),
    },
    {
      path: 'view/:id',
      element: (
        <ProtectedRoute
          module="users"
          action="find_one_user"
          element={<ViewUser />}
        />
      ),
    },
    {
      path: 'modify/:id',
      element: (
        <ProtectedRoute
          module="users"
          action="update_one_user"
          element={<ModifyUser />}
        />
      ),
    },
  ],
};

export { userRoutes };
