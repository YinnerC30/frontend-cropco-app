import ErrorPage from '@/ErrorPage';
import { Home } from '@/components/Home';

import { clientRoutes } from '@/dashboard/clients/Routes';
import { cropRoutes } from '@/dashboard/crops/Routes';
import { employeeRoutes } from '@/dashboard/employees/Routes';
import { harvestProcessedRoutes } from '@/dashboard/harvest-processed/Routes';
import { harvestRoutes } from '@/dashboard/harvests/Routes';
import { supplierRoutes } from '@/dashboard/suppliers/Routes';
import { supplyRoutes } from '@/dashboard/supplies/Routes';
import { userRoutes } from '@/dashboard/users/Routes';

import { createBrowserRouter } from 'react-router-dom';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      userRoutes,
      employeeRoutes,
      cropRoutes,
      clientRoutes,
      supplierRoutes,
      supplyRoutes,
      harvestRoutes,
      harvestProcessedRoutes,
    ],
  },
]);
