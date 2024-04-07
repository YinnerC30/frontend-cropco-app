import ErrorPage from '@/ErrorPage';
import { Home } from '@/components/Home';
import { createBrowserRouter } from 'react-router-dom';
import cropRoutes from '../dashboard/crops/Routes';
import userRoutes from '../dashboard/users/Routes';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [userRoutes, cropRoutes],
  },
]);
