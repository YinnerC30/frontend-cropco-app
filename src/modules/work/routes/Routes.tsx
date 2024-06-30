import { CreateWork } from "../components/CreateWork";
import { ModifyWork } from "../components/ModifyWork";
import { ViewWork } from "../components/ViewWork";
import { WorkModule } from "../components/WorkModule";

const workRoutes = {
  path: "works",
  children: [
    {
      path: "view",
      element: <WorkModule />,
    },
    {
      path: "create",
      element: <CreateWork />,
    },
    {
      path: "modify/:id",
      element: <ModifyWork />,
    },
    {
      path: "view/:id",
      element: <ViewWork />,
    },
  ],
};
export { workRoutes };
