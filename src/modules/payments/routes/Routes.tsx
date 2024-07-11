import { CreatePayment } from "../components/CreatePayment";
import { PaymentsModule } from "../components/PaymentsModule";


const paymentsRoutes = {
  path: "payments",
  children: [
    {
      path: "view",
      element: <PaymentsModule />,
    },
    {
      path: "create",
      element: <CreatePayment />,
    },
    // TODO: Pendiente por implementar funcionalidad
    // {
    //   path: "view/:id",
    //   element: <ViewPayment />,
    // },
    
  ],
};

export { paymentsRoutes };

