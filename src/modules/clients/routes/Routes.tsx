import ClientsModule from "../components/Module";
import { CreateClient } from "../components/Create";
import { ModifyClient } from "../components/Modify";
import { ViewClient } from "../components/View";

const clientRoutes = {
  path: "clients",
  children: [
    {
      path: "all",
      element: <ClientsModule />,
    },
    {
      path: "create",
      element: <CreateClient />,
    },
    {
      path: "view/:id",
      element: <ViewClient />,
    },
    {
      path: "modify/:id",
      element: <ModifyClient />,
    },
  ],
};

export { clientRoutes };
