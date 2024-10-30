import ErrorPage from '@/ErrorPage';
import { authenticationRoutes } from '@/modules/authentication/routes/Routes';

import { clientRoutes } from '@/modules/clients/routes/Routes';
import { consumptionRoutes } from '@/modules/consumption/routes/Routes';

import { cropRoutes } from '@/modules/crops/routes/Routes';
import { employeeRoutes } from '@/modules/employees/routes/Routes';

import { dashboardRoutes } from '@/modules/dashboard/routes/Routes';
import { harvestRoutes } from '@/modules/harvests/routes/Routes';
import { paymentsRoutes } from '@/modules/payments/routes/Routes';
import { saleRoutes } from '@/modules/sales/routes/Routes';
import { shoppingRoutes } from '@/modules/shopping/routes/Routes';
import { supplierRoutes } from '@/modules/suppliers/routes/Routes';
import { supplyRoutes } from '@/modules/supplies/routes/Routes';
import { userRoutes } from '@/modules/users/routes/Routes';
import { workRoutes } from '@/modules/work/routes/Routes';

import { LandingPage } from '@/components/common/LandingPage';
import AuthenticationLayout from '@/modules/authentication/components/AuthenticationLayout';
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
          cropRoutes,
          clientRoutes,
          harvestRoutes,
          employeeRoutes,
          supplierRoutes,
          supplyRoutes,
          saleRoutes,
          workRoutes,
          paymentsRoutes,
          shoppingRoutes,
          consumptionRoutes,
        ],
      },
    ],
  },
]);
