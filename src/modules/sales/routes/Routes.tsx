import { SaleModule } from "../components";
import { CreateSale } from "../components/CreateSale";
import { ModifySale } from "../components/ModifySale";

const saleRoutes = {
  path: "sales",
  children: [
    {
      path: "view",
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
  ],
};

export { saleRoutes };
