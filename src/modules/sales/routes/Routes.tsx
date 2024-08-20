import { SaleModule } from "../components/SaleModule";
import { CreateSale } from "../components/CreateSale";
import { ModifySale } from "../components/ModifySale";
import { ViewSale } from "../components/ViewSale";

const saleRoutes = {
  path: "sales",
  children: [
    {
      path: "all",
      element: <SaleModule />,
    },
    {
      path: "create",
      element: <CreateSale />,
    },
    {
      path: "modify/:id",
      element: <ModifySale />,
    },
    {
      path: "view/:id",
      element: <ViewSale />,
    },
  ],
};

export { saleRoutes };
