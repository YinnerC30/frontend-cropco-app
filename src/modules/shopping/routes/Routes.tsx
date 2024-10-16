import { CreateShopping } from "../components/CreateShopping";
import { ModifyShopping } from "../components/ModifyShopping";
import { ShoppingModule } from "../components/ShoppingModule";
import { ViewShopping } from "../components/ViewShopping";

const shoppingRoutes = {
  path: "shopping",
  children: [
    {
      index: true,
      element: <ShoppingModule />,
    },
    {
      path: "all",
      element: <ShoppingModule />,
    },
    {
      path: "create",
      element: <CreateShopping />,
    },
    {
      path: "modify/:id",
      element: <ModifyShopping />,
    },
    {
      path: "view/:id",
      element: <ViewShopping />,
    },
  ],
};

export { shoppingRoutes };
