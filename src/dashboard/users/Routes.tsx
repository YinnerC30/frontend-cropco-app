import { CreateUser } from './CreateUser';
import { ModifyUser } from './ModifyUser';
import UsersModule from './UsersModule';
import { ViewUser } from './ViewUser';

const routes = {
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

export default routes;
