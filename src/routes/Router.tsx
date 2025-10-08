import { AuthenticationLayout } from '@/auth';
import { authenticationRoutes } from '@/auth/routes/authenticationRoutes';
import { clientRoutes } from '@/modules/clients/routes/clientRoutes';
import { consumptionRoutes } from '@/modules/consumption/routes/consumptionRoutes';
import { cropRoutes } from '@/modules/crops/routes/cropsRoutes';
import { dashboardRoutes } from '@/modules/dashboard/routes/Routes';
import { employeeRoutes } from '@/modules/employees/routes/employeeRoutes';
import { harvestRoutes } from '@/modules/harvests/routes/harvestRoutes';
import { paymentsRoutes } from '@/modules/payments/routes/paymentsRoutes';
import { saleRoutes } from '@/modules/sales/routes/salesRoutes';
import { shoppingRoutes } from '@/modules/shopping/routes/shoppingRoutes';
import { supplierRoutes } from '@/modules/suppliers/routes/supplierRoutes';
import { supplyRoutes } from '@/modules/supplies/routes/suppliesRoutes';
import { userRoutes } from '@/modules/users/routes/userRoutes';
import { workRoutes } from '@/modules/work/routes/workRoutes';
import ErrorPage from '@/routes/components/ErrorPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomeLayout } from '../components/home/HomeLayout';
import { RoutesController } from './components';
import { HomePage } from './HomePage';

import NewLandingPage from '@/components/landing/NewLandingPage';
import { administratorRoutes } from '@/management/administrators/routes/administratorRoutes';
import AuthenticationTenantLayout from '@/management/auth/components/AuthenticationTenantLayout';
import { HomeManagementLayout } from '@/management/auth/components/HomeManagementLayout';
import { HomeManagementPage } from '@/management/auth/components/HomeManagementPage';
import { authenticationTenantRoutes } from '@/management/auth/routes/authenticationTenantRoutes';
import { tenantRoutes } from '@/management/tenants/routes/tenantRoutes';
import { RoutesManagementController } from './components/RoutesManagementController';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <NewLandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/management',
    element: <RoutesManagementController />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={'authentication/login'} /> },
      {
        path: 'authentication',
        element: <AuthenticationTenantLayout />,
        children: [
          { index: true, element: <Navigate to={'login'} /> },
          ...authenticationTenantRoutes,
        ],
      },
      {
        path: 'home',
        element: <HomeManagementLayout />,
        children: [
          { index: true, element: <Navigate to={'page'} /> },
          {
            path: 'page',
            element: <HomeManagementPage />,
          },
          tenantRoutes,
          administratorRoutes,
        ],
      },
    ],
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
          { index: true, element: <Navigate to={'page'} /> },
          {
            path: 'page',
            element: <HomePage />,
          },
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
