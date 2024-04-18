import ErrorPage from '@/ErrorPage';


import { clientRoutes } from '@/modules/clients/Routes';
import { Home } from '@/modules/core/components';
import { cropRoutes } from '@/modules/crops/Routes';
import { employeeRoutes } from '@/modules/employees/Routes';
import { harvestProcessedRoutes } from '@/modules/harvest-processed/Routes';
import { harvestRoutes } from '@/modules/harvests/Routes';
import { supplierRoutes } from '@/modules/suppliers/Routes';
import { supplyRoutes } from '@/modules/supplies/routes/Routes';
import { userRoutes } from '@/modules/users/routes/Routes';


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
