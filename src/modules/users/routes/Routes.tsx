import { CreateUser, ModifyUser, UsersModule, ViewUser } from '../components';

const userRoutes = {
  path: 'users',
  children: [
    {
      path: 'all',
      element: <UsersModule />,
    },
    {
      path: 'create',
      element: <CreateUser />,
    },
    {
      path: 'view/:id',
      element: <ViewUser />,
    },
    {
      path: 'modify/:id',
      element: <ModifyUser />,
    },
  ],
};

export { userRoutes };
