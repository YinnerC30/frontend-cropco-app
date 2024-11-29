

import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ClientsModule = lazy(
  () => import('../components/module/ClientsModule')
);
const CreateClient = lazy(() => import('../components/CreateClient'));
const ViewClient = lazy(() => import('../components/ViewClient'));
const ModifyClient = lazy(() => import('../components/ModifyClient'));

// Configuración genérica de las rutas
const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_clients',
    element: <ClientsModule />,
    viewComponent: true,
  },
  {
    path: 'create/one',
    action: 'create_client',
    element: <CreateClient />,
  },
  {
    path: 'view/one/:id',
    action: 'find_one_client',
    element: <ViewClient />,
  },
  {
    path: 'update/one/:id',
    action: 'update_one_client',
    element: <ModifyClient />,
  },
];

const clientRoutes = {
  path: 'clients',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('clients', routeConfig),
  ],
};

export { clientRoutes };


