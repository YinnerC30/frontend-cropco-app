import { CreateUser } from '../components/Create';
import { ModifyUser } from '../components/Modify';
import UsersModule from '../components/Module';
import { ViewUser } from '../components/View';

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
