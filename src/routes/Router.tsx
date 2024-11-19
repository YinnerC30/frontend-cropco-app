import { LandingPage } from '@/components/common/LandingPage';
import ErrorPage from '@/ErrorPage';
import AuthenticationLayout from '@/modules/authentication/components/AuthenticationLayout';
import { authenticationRoutes } from '@/modules/authentication/routes/Routes';
import { dashboardRoutes } from '@/modules/dashboard/routes/Routes';
import { userRoutes } from '@/modules/users/routes/userRoutes';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomeLayout } from '../HomeLayout';
import { RoutesController } from './components/RoutesController';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/app',
    element: <RoutesController />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={'authentication/login'} /> },
      {
        path: 'authentication',
        element: <AuthenticationLayout />,
        children: [
          { index: true, element: <Navigate to={'login'} /> },
          ...authenticationRoutes,
        ],
      },
      {
        path: 'home',
        element: <HomeLayout />,
        children: [
          { index: true, element: <Navigate to={'dashboard'} /> },
          dashboardRoutes,
          userRoutes,
          // cropRoutes,
          // clientRoutes,
          // harvestRoutes,
          // employeeRoutes,
          // supplierRoutes,
          // supplyRoutes,
          // saleRoutes,
          // workRoutes,
          // paymentsRoutes,
          // shoppingRoutes,
          // consumptionRoutes,
        ],
      },
    ],
  },
]);
