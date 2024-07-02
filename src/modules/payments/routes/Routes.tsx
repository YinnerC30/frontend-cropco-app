import { CreatePayment } from "../components/CreatePayment";
import { PaymentsModule } from "../components/PaymentsModule";

import { ViewClient } from "../components/View";

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
    // {
    //   path: "view/:id",
    //   element: <ViewClient />,
    // },
    
  ],
};

export { paymentsRoutes };

