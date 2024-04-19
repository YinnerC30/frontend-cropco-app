import { CreateHarvest } from '../components/CreateHarvest';
import { HarvestModule } from '../components/HarvestModule';
import { ModifyHarvest } from '../components/ModifyHarvest';
import { ViewHarvest } from '../components/ViewHarvest';

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
