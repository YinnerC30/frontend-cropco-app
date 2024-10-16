import { CreateHarvest } from "../components/CreateHarvest";
import { HarvestModule } from "../components/HarvestModule";
import { HarvestProcessedModule } from "../components/HarvestProcessedModule";
import { ModifyHarvest } from "../components/ModifyHarvest";
import { ViewHarvest } from "../components/ViewHarvest";

const harvestRoutes = {
  path: "harvests",
  children: [
    {
      index: true,
      element: <HarvestModule />,
    },
    {
      path: "all",
      element: <HarvestModule />,
    },
    {
      path: "create",
      element: <CreateHarvest />,
    },
    {
      path: "view/:id",
      element: <ViewHarvest />,
    },
    {
      path: "modify/:id",
      element: <ModifyHarvest />,
    },
    {
      path: "processed",
      children: [{ path: "view/:id", element: <HarvestProcessedModule /> }],
    },
  ],
};

export { harvestRoutes };
