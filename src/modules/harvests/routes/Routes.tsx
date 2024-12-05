import { CreateHarvest } from '../components/CreateHarvest';
import { HarvestModule } from '../components/HarvestModule';
import HarvestProcessedModule from '../components/HarvestProcessedModule';
import { ModifyHarvest } from '../components/ModifyHarvest';
import { ViewHarvest } from '../components/ViewHarvest';

const harvestRoutes = {
  path: 'harvests',
  children: [
    {
      index: true,
      element: <HarvestModule />,
    },
    {
      path: 'view/all',
      element: <HarvestModule />,
    },
    {
      path: 'create/one',
      element: <CreateHarvest />,
    },
    {
      path: 'view/one/:id',
      element: <ViewHarvest />,
    },
    {
      path: 'update/one/:id',
      element: <ModifyHarvest />,
    },
    {
      path: "processed",
      children: [{ path: "view/:id", element: <HarvestProcessedModule /> }],
    },
  ],
};

export { harvestRoutes };
