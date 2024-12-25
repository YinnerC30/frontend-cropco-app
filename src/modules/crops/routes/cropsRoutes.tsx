import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CropsModule = lazy(() => import('../components/module/CropsModule'));
const CreateCrop = lazy(() => import('../components/CreateCrop'));
const ViewCrop = lazy(() => import('../components/ViewCrop'));
const ModifyCrop = lazy(() => import('../components/ModifyCrop'));

// Configuración genérica de las rutas
const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_crops',
    element: <CropsModule />,
    viewComponent: true,
  },
  {
    path: 'create/one',
    action: 'create_crop',
    element: <CreateCrop />,
  },
  {
    path: 'view/one/:id',
    action: 'find_one_crop',
    element: <ViewCrop />,
  },
  {
    path: 'update/one/:id',
    action: 'update_one_crop',
    element: <ModifyCrop />,
  },
];

const cropRoutes = {
  path: 'crops',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('crops', routeConfig),
  ],
};

export { cropRoutes };
