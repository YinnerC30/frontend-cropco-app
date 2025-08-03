import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CreateShopping = lazy(() => import('../components/CreateShopping'));
const ModifyShopping = lazy(() => import('../components/ModifyShopping'));
const ViewShopping = lazy(() => import('../components/ViewShopping'));
const ShoppingModule = lazy(
  () => import('../components/module/ShoppingModule')
);

const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_supplies_shopping',
    element: <ShoppingModule />,
    viewComponent: true,
    label: 'Compras'
  },
  {
    path: 'create/one',
    action: 'create_supply_shopping',
    element: <CreateShopping />,
    label: 'Crear Compra'
  },
  {
    path: 'view/one/:id',
    action: 'find_one_supplies_shopping',
    element: <ViewShopping />,
    label: 'Ver Compra'
  },
  {
    path: 'update/one/:id',
    action: 'update_one_supplies_shopping',
    element: <ModifyShopping />,
    label: 'Modificar Compra'
  },
];

const shoppingRoutes = {
  path: 'shopping',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('shopping', routeConfig),
  ],
};

export { shoppingRoutes as shoppingRoutes };
