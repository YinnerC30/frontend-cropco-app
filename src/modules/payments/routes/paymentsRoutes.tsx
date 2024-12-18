import { Navigate } from 'react-router-dom';
import { CreatePayment } from '../components/CreatePayment';
import PaymentsModule from '../components/module/PaymentModule';
import ViewPayment from '../components/ViewPayment';

const paymentsRoutes = {
  path: 'payments',
  children: [
    {
      index: true,
      element: <Navigate to={'view/all'} />,
    },
    {
      path: 'view/all',
      element: <PaymentsModule />,
    },
    {
      path: 'create/one',
      element: <CreatePayment />,
    },
    {
      path: 'view/one/:id',
      element: <ViewPayment />,
    },
  ],
};

export { paymentsRoutes };
