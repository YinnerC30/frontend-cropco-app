import { SaleModule } from "../components";

const saleRoutes = {
  path: "sales",
  children: [
    {
      path: "view",
      element: <SaleModule />,
    },
  ],
};

export { saleRoutes };
