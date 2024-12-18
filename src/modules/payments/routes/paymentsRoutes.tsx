import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CreatePayment = lazy(() => import('../components/CreatePayment'));

const ViewPayment = lazy(() => import('../components/ViewPayment'));
const PaymentModule = lazy(() => import('../components/module/PaymentModule'));

const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_payments',
    element: <PaymentModule />,
    viewComponent: true,
  },
  {
    path: 'create/one',
    action: 'create_payment',
    element: <CreatePayment />,
  },
  {
    path: 'view/one/:id',
    action: 'find_one_payment',
    element: <ViewPayment />,
  },
];

const paymentsRoutes = {
  path: 'payments',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('payments', routeConfig),
  ],
};

export { paymentsRoutes };
