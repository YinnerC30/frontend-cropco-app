import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';

import ErrorPage from './ErrorPage';

import { Counter } from './features/counter/Counter';
import Pokemons from './components/Pokemons';

import DemoPage from './payments/page';
import Root from './routes/root';
import UsersModule from './features/users/UsersModule';
import { UserForm } from './features/users/UserForm';
import { ViewUser } from './features/users/ViewUser';
import { ModifyUser } from './features/users/ModifyUser';

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
            element: <UserForm />,
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
