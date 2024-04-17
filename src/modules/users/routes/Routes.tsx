import { CreateUser, ModifyUser, UsersModule, ViewUser } from '../components';

const userRoutes = {
  path: 'users',
  children: [
    {
      path: 'view',
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
