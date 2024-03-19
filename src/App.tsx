import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';

import ErrorPage from './ErrorPage';

import { Counter } from './features/counter/Counter';
import Pokemons from './components/Pokemons';

import DemoPage from './payments/page';
import Root from './routes/Root';
import UsersModule from './features/users/UsersModule';

import { ViewUser } from './features/users/ViewUser';
import { ModifyUser } from './features/users/form/ModifyUser';
import { CreateUser } from './features/users/form/CreateUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/demo-table',
    element: <DemoPage />,
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

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
