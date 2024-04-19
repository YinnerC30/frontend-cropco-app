import { CreateSupplier } from "../components/Create";
import { ModifySupplier } from "../components/Modify";
import { SuppliersModule } from "../components/Module";
import { ViewSupplier } from "../components/View";

const supplierRoutes = {
  path: "suppliers",
  children: [
    {
      path: "view",
      element: <SuppliersModule />,
    },
    {
      path: "create",
      element: <CreateSupplier />,
    },
    {
      path: "view/:id",
      element: <ViewSupplier />,
    },
    {
      path: "modify/:id",
      element: <ModifySupplier />,
    },
  ],
};

export { supplierRoutes };
