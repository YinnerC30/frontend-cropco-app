import ErrorPage from "@/ErrorPage";

import { clientRoutes } from "@/modules/clients/Routes";
import { Home } from "@/modules/core/components";
import { cropRoutes } from "@/modules/crops/Routes";
import { harvestRoutes } from "@/modules/harvests/Routes";
import { userRoutes } from "@/modules/users/routes/Routes";

import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      userRoutes,
      cropRoutes,
      clientRoutes,
      harvestRoutes,
      // employeeRoutes,
      // supplierRoutes,
      // supplyRoutes,
      // harvestProcessedRoutes,
    ],
  },
]);
