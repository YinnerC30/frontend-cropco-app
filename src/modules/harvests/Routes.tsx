import { CreateHarvest } from './CreateHarvest';
import { HarvestModule } from './HarvestModule';
import { ModifyHarvest } from './ModifyHarvest';
import { ViewHarvest } from './ViewHarvest';

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
      element: <ViewHarvest />,
    },
    {
      path: 'modify/:id',
      element: <ModifyHarvest />,
    },
  ],
};

export { harvestRoutes };
