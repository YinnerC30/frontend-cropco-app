import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CreateHarvest = lazy(() => import('../components/CreateHarvest'));
const ModifyHarvest = lazy(() => import('../components/ModifyHarvest'));
const ViewHarvest = lazy(() => import('../components/ViewHarvest'));
const HarvestModule = lazy(() => import('../components/module/HarvestModule'));
const HarvestProcessed = lazy(
  () => import('../components/module/processed/HarvestProcessed')
);

const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_harvests',
    element: <HarvestModule />,
    viewComponent: true,
  },
  {
    path: 'create/one',
    action: 'create_harvest',
    element: <CreateHarvest />,
  },
  {
    path: 'view/one/:id',
    action: 'find_one_harvest',
    element: <ViewHarvest />,
  },
  {
    path: 'update/one/:id',
    action: 'update_one_harvest',
    element: <ModifyHarvest />,
  },
  {
    path: 'processed/view/:id',
    action: 'find_one_harvest_processed_all',
    element: <HarvestProcessed />,
  },
];

const harvestRoutes = {
  path: 'harvests',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('harvests', routeConfig),
  ],
};

export { harvestRoutes };
