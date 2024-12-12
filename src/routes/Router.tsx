import { LandingPage } from '@/components/common/LandingPage';
import { AuthenticationLayout } from '@/auth';
import { authenticationRoutes } from '@/auth/routes/Routes';
import { clientRoutes } from '@/modules/clients/routes/clientRoutes';
import { cropRoutes } from '@/modules/crops/routes/Routes';
import { dashboardRoutes } from '@/modules/dashboard/routes/Routes';
import { employeeRoutes } from '@/modules/employees/routes/employeeRoutes';
import { supplierRoutes } from '@/modules/suppliers/routes/supplierRoutes';
import { supplyRoutes } from '@/modules/supplies/routes/suppliesRoutes';
import { userRoutes } from '@/modules/users/routes/userRoutes';
import ErrorPage from '@/routes/components/ErrorPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomeLayout } from '../components/home/HomeLayout';
import { RoutesController } from './components';
import { harvestRoutes } from '@/modules/harvests/routes/Routes';
import { FormChangeProvider } from '@/modules/core/components';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/app',
    element: (
      <FormChangeProvider>
        <RoutesController />
      </FormChangeProvider>
    ),
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
