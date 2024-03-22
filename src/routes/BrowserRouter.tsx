import ErrorPage from '@/ErrorPage';
import { Home } from '@/components/Home';

import UsersModule from '@/features/users/UsersModule';
import { ViewUser } from '@/features/users/ViewUser';
import { CreateUser } from '@/features/users/form/CreateUser';
import { ModifyUser } from '@/features/users/form/ModifyUser';
import { UserTable } from '@/features/users/table/UserTable';
import { createBrowserRouter } from 'react-router-dom';
import Root from './root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users',
        element: <UsersModule />,
        children: [
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
