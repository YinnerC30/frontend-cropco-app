import { CreateCrop } from "../components/Create";
import CropsModule from "../components/Module";
import { ModifyCrop } from "../components/Modify";
import { ViewCrop } from "../components/View";

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
