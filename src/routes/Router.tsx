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
import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../Home';
import { RoutesController } from './RoutesController';
import Chart from '@/modules/dashboard/Chart';
import { Login } from '@/modules/authentication/components/Login';

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
      { index: true, element: <Login /> },
      {
        path: 'authentication',
        children: [
          { index: true, element: <Login /> },
          ...authenticationRoutes,
        ],
      },
      {
        path: 'home',
        element: <Home />,
        children: [
          { index: true, element: <Chart /> },
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
