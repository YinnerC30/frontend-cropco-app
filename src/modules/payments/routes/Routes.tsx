import { CreatePayment } from "../components/CreatePayment";
import { PaymentsModule } from "../components/PaymentsModule";
import { ViewPayment } from "../components/ViewPayment";

const paymentsRoutes = {
  path: "payments",
  children: [
    {
      path: "all",
      element: <PaymentsModule />,
    },
    {
      path: "create",
      element: <CreatePayment />,
    },
    {
      path: "view/:id",
      element: <ViewPayment />,
    },
  ],
};

export { paymentsRoutes };
