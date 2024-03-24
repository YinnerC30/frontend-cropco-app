import ErrorPage from '@/ErrorPage';
import { Home } from '@/components/Home';

import UsersModule from '@/features/users/UsersModule';
import { ViewUser } from '@/features/users/form/ViewUser';
import { CreateUser } from '@/features/users/form/CreateUser';
import { ModifyUser } from '@/features/users/form/ModifyUser';
import { createBrowserRouter } from 'react-router-dom';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
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
      },
    ],
  },
]);
