import { CreateHarvest } from '../components/CreateHarvest';

import { ModifyHarvest } from '../components/ModifyHarvest';
import { ViewHarvest } from '../components/ViewHarvest';
import { HarvestModuleTemplate } from '../components/module/HarvestModuleTemplate';
import { HarvestProcessed } from '../components/module/processed/HarvestProcessed';

const harvestRoutes = {
  path: 'harvests',
  children: [
    {
      index: true,
      element: <HarvestModuleTemplate />,
    },
    {
      path: 'view/all',
      element: <HarvestModuleTemplate />,
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
      path: 'processed',
      children: [{ path: 'view/:id', element: <HarvestProcessed /> }],
    },
  ],
};

export { harvestRoutes };

