import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SuppliesModule = lazy(
  () => import('../components/module/SuppliesModule')
);
const CreateSupply = lazy(() => import('../components/CreateSupply'));
const ViewSupply = lazy(() => import('../components/ViewSupply'));
const ModifySupply = lazy(() => import('../components/ModifySupply'));

// Configuración genérica de las rutas
const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_supply',
    element: <SuppliesModule />,
    viewComponent: true,
    label: 'Insumos'
  },
  {
    path: 'create/one',
    action: 'create_supply',
    element: <CreateSupply />,
    label: 'Crear Insumo'
  },
  {
    path: 'view/one/:id',
    action: 'find_one_supply',
    element: <ViewSupply />,
    label: 'Ver Insumo'
  },
  {
    path: 'update/one/:id',
    action: 'update_one_supply',
    element: <ModifySupply />,
    label: 'Modificar Insumo'
  },
];

const supplyRoutes = {
  path: 'supplies',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('supplies', routeConfig),
  ],
};

export { supplyRoutes };
