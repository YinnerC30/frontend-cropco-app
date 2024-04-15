import HarvestProcessedModule from './HarvestProcessedModule';

const harvestProcessedRoutes = {
  path: 'harvests/processed',
  children: [
    {
      path: 'view',
      element: <HarvestProcessedModule />,
    },
  ],
};

export { harvestProcessedRoutes };
