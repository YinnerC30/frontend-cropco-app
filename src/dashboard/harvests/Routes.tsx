import { CreateHarvest } from './CreateHarvest';
import { HarvestModule } from './HarvestModule';

const harvestRoutes = {
  path: 'harvests',
  children: [
    {
      path: 'view',
      element: <HarvestModule />,
    },
    {
      path: 'create',
      element: <CreateHarvest />,
    },
    {
      path: 'view/:id',
      // element: <ViewClient />,
    },
    {
      path: 'modify/:id',
      // element: <ModifyClient />,
    },
  ],
};

export { harvestRoutes };
