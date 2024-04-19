import ErrorPage from "@/ErrorPage";

import { clientRoutes } from "@/modules/clients/routes/Routes";
import { Home } from "@/modules/core/components";
import { cropRoutes } from "@/modules/crops/routes/Routes";
import { employeeRoutes } from "@/modules/employees/routes/Routes";

import { harvestProcessedRoutes } from "@/modules/harvest-processed/Routes";
import { harvestRoutes } from "@/modules/harvests/routes/Routes";
import { supplierRoutes } from "@/modules/suppliers/routes/Routes";
import { supplyRoutes } from "@/modules/supplies/routes/Routes";
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
      employeeRoutes,
      supplierRoutes,
      supplyRoutes,
      harvestProcessedRoutes,
    ],
  },
]);
