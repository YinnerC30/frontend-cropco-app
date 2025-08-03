import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CreateSale = lazy(() => import('../components/CreateSale'));
const ModifySale = lazy(() => import('../components/ModifySale'));
const ViewSale = lazy(() => import('../components/ViewSale'));
const SaleModule = lazy(() => import('../components/module/SaleModule'));

const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_sales',
    element: <SaleModule />,
    viewComponent: true,
    label: 'Ventas'
  },
  {
    path: 'create/one',
    action: 'create_sale',
    element: <CreateSale />,
    label: 'Crear Venta'
  },
  {
    path: 'view/one/:id',
    action: 'find_one_sale',
    element: <ViewSale />,
    label: 'Ver Venta'
  },
  {
    path: 'update/one/:id',
    action: 'update_one_sale',
    element: <ModifySale />,
    label: 'Modificar Venta'
  },
];

const saleRoutes = {
  path: 'sales',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('sales', routeConfig),
  ],
};

export { saleRoutes as saleRoutes };
