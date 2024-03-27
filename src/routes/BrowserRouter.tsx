import ErrorPage from '@/ErrorPage';
import { Home } from '@/components/Home';

import CropsModule from '@/features/crops/CropsModule';
import { CreateCrop } from '@/features/crops/form/CreateCrop';
import { ModifyCrop } from '@/features/crops/form/ModifyCrop';
import { ViewCrop } from '@/features/crops/form/ViewCrop';
import UsersModule from '@/features/users/UsersModule';
import { CreateUser } from '@/features/users/form/CreateUser';
import { ModifyUser } from '@/features/users/form/ModifyUser';
import { ViewUser } from '@/features/users/form/ViewUser';
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
            path: 'view?search=:parameter',
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
      {
        path: 'crops',
        children: [
          {
            path: 'view',
            element: <CropsModule />,
          },
          {
            path: 'view?search=:parameter',
            element: <CropsModule />,
          },
          {
            path: 'create',
            element: <CreateCrop />,
          },
          {
            path: 'modify/:id',
            element: <ModifyCrop />,
          },
          {
            path: 'view/:id',
            element: <ViewCrop />,
          },
        ],
      },
      {
        path: 'clients',
        children: [
          {
            path: 'view',
          },
        ],
      },
    ],
  },
]);
