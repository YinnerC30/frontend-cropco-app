import PaymentsModule from '../components/module/PaymentModule';

const paymentsRoutes = {
  path: 'payments',
  children: [
    {
      index: true,
      element: <PaymentsModule />,
    },
    {
      path: 'view/all',
      element: <PaymentsModule />,
    },
    // {
    //   path: 'create/one',
    //   element: <CreatePayment />,
    // },
    // {
    //   path: 'view/one/:id',
    //   element: <ViewPayment />,
    // },
  ],
};

export { paymentsRoutes };
