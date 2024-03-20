import ErrorPage from '@/ErrorPage';
import { Home } from '@/components/Home';
import { Login } from '@/components/Login';
import Pokemons from '@/components/Pokemons';
import { Counter } from '@/features/counter/Counter';
import UsersModule from '@/features/users/UsersModule';
import { ViewUser } from '@/features/users/ViewUser';
import { CreateUser } from '@/features/users/form/CreateUser';
import { ModifyUser } from '@/features/users/form/ModifyUser';
import { UserTable } from '@/features/users/table/UserTable';
import DemoPage from '@/payments/page';
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },

  {
    path: '/demo-table',
    element: <UserTable />,
    errorElement: <ErrorPage />,
  },

  {
    path: '/counter',
    element: <Counter />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/pokemon',
    element: <Pokemons />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
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
