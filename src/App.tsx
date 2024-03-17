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
    path: '/users',
    element: <UsersModule />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'create',
        element: <UserForm />,
      },
    ],
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
