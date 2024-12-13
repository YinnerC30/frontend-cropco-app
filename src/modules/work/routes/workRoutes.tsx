import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CreateWork = lazy(() => import('../components/CreateWork'));
const ModifyWork = lazy(() => import('../components/ModifyWork'));
const ViewWork = lazy(() => import('../components/ViewWork'));
const WorkModule = lazy(() => import('../components/module/WorkModule'));

const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_works',
    element: <WorkModule />,
    viewComponent: true,
  },
  {
    path: 'create/one',
    action: 'create_work',
    element: <CreateWork />,
  },
  {
    path: 'view/one/:id',
    action: 'find_one_work',
    element: <ViewWork />,
  },
  {
    path: 'update/one/:id',
    action: 'update_one_work',
    element: <ModifyWork />,
  },
];

const workRoutes = {
  path: 'works',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('works', routeConfig),
  ],
};

export { workRoutes as workRoutes };
