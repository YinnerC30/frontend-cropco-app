import ClientsModule from "../components/ClientsModule";
import { CreateClient } from "../components/CreateClient";
import { ModifyClient } from "../components/ModifyClient";
import { ViewClient } from "../components/ViewClient";

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
