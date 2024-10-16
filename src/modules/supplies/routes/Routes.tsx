import {
  CreateSupply,
  ModifySupply,
  SuppliesModule,
  ViewSupply,
} from "../components";

const supplyRoutes = {
  path: "supplies",
  children: [
    {
      index: true,
      element: <SuppliesModule />,
    },
    {
      path: "all",
      element: <SuppliesModule />,
    },
    {
      path: "create",
      element: <CreateSupply />,
    },
    {
      path: "view/:id",
      element: <ViewSupply />,
    },
    {
      path: "modify/:id",
      element: <ModifySupply />,
    },
  ],
};

export { supplyRoutes };
