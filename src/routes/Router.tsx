import { AuthenticationLayout } from '@/auth';
import { authenticationRoutes } from '@/auth/routes/authenticationRoutes';
import { LandingPage } from '@/components/common/LandingPage';
import { clientRoutes } from '@/modules/clients/routes/clientRoutes';
import { cropRoutes } from '@/modules/crops/routes/Routes';
import { dashboardRoutes } from '@/modules/dashboard/routes/Routes';
import { employeeRoutes } from '@/modules/employees/routes/employeeRoutes';
import { harvestRoutes } from '@/modules/harvests/routes/harvestRoutes';
import { saleRoutes } from '@/modules/sales/routes/salesRoutes';
import { supplierRoutes } from '@/modules/suppliers/routes/supplierRoutes';
import { supplyRoutes } from '@/modules/supplies/routes/suppliesRoutes';
import { userRoutes } from '@/modules/users/routes/userRoutes';
import { workRoutes } from '@/modules/work/routes/workRoutes';
import ErrorPage from '@/routes/components/ErrorPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomeLayout } from '../components/home/HomeLayout';
import { RoutesController } from './components';
import { shoppingRoutes } from '@/modules/shopping/routes/shoppingRoutes';
import { consumptionRoutes } from '@/modules/consumption/routes/consumptionRoutes';
import { paymentsRoutes } from '@/modules/payments/routes/paymentsRoutes';

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
          employeeRoutes,
          clientRoutes,
          cropRoutes,
          supplierRoutes,
          supplyRoutes,
          harvestRoutes,
          workRoutes,
          saleRoutes,
          shoppingRoutes,
          consumptionRoutes,
          paymentsRoutes,
        ],
      },
    ],
  },
]);
