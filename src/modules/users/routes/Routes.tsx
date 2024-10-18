import { CreateUser, ModifyUser, UsersModule, ViewUser } from '../components';

const userRoutes = {
  path: 'users',
  children: [
    {
      index: true,
      loader: () => 'find_all_users',
      element: <UsersModule />,
    },
    {
      path: 'all',
      loader: () => 'find_all_users',
      element: <UsersModule />,
    },
    {
      path: 'create',
      loader: () => 'create_user',
      element: <CreateUser />,
    },
    {
      path: 'view/:id',
      loader: () => 'find_one_user',
      element: <ViewUser />,
    },
    {
      path: 'modify/:id',
      loader: () => 'update_one_user',
      element: <ModifyUser />,
    },
  ],
};

export { userRoutes };
