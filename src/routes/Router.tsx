import ErrorPage from "@/ErrorPage";
import { authenticationRoutes } from "@/modules/authentication/routes/Routes";

import { clientRoutes } from "@/modules/clients/routes/Routes";
import { consumptionRoutes } from "@/modules/consumption/routes/Routes";

import { cropRoutes } from "@/modules/crops/routes/Routes";
import { employeeRoutes } from "@/modules/employees/routes/Routes";

import { dashboardRoutes } from "@/modules/dashboard/routes/Routes";
import { harvestRoutes } from "@/modules/harvests/routes/Routes";
import { paymentsRoutes } from "@/modules/payments/routes/Routes";
import { saleRoutes } from "@/modules/sales/routes/Routes";
import { shoppingRoutes } from "@/modules/shopping/routes/Routes";
import { supplierRoutes } from "@/modules/suppliers/routes/Routes";
import { supplyRoutes } from "@/modules/supplies/routes/Routes";
import { userRoutes } from "@/modules/users/routes/Routes";
import { workRoutes } from "@/modules/work/routes/Routes";

import { LandingPage } from "@/components/common/LandingPage";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "../Home";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "authentication",
        children: authenticationRoutes,
      },
      {
        path: "home",
        element: <Home />,
        children: [
          dashboardRoutes,
          userRoutes,
          cropRoutes,
          clientRoutes,
          harvestRoutes,
          employeeRoutes,
          supplierRoutes,
          supplyRoutes,
          saleRoutes,
          workRoutes,
          paymentsRoutes,
          shoppingRoutes,
          consumptionRoutes,
        ],
      },
    ],
  },
]);
