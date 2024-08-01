import { CreateCrop } from "../components/CreateCrop";
import CropsModule from "../components/CropsModule";
import { ModifyCrop } from "../components/ModifyCrop";
import { ViewCrop } from "../components/ViewCrop";

const cropRoutes = {
  path: "crops",
  children: [
    {
      path: "all",
      element: <CropsModule />,
    },
    {
      path: "create",
      element: <CreateCrop />,
    },
    {
      path: "modify/:id",
      element: <ModifyCrop />,
    },
    {
      path: "view/:id",
      element: <ViewCrop />,
    },
  ],
};
export { cropRoutes };
