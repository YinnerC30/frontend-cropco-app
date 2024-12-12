import { Navigate } from 'react-router-dom';
import { CreateHarvest } from '../components/CreateHarvest';

import { ModifyHarvest } from '../components/ModifyHarvest';
import { ViewHarvest } from '../components/ViewHarvest';
import { HarvestModule } from '../components/module/HarvestModule';
import { HarvestProcessed } from '../components/module/processed/HarvestProcessed';

const harvestRoutes = {
  path: 'harvests',
  children: [
    { index: true, element: <Navigate to={'view/all'} /> },
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
      path: 'processed',
      children: [{ path: 'view/:id', element: <HarvestProcessed /> }],
    },
  ],
};

export { harvestRoutes };
