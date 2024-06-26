import { SaleModule } from "../components";
import { CreateSale } from "../components/CreateSale";

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
  ],
};

export { saleRoutes };
