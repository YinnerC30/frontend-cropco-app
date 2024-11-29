import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SuppliersModule = lazy(
  () => import('../components/module/SuppliersModule')
);
const CreateSupplier = lazy(() => import('../components/CreateSupplier'));
const ViewSupplier = lazy(() => import('../components/ViewSupplier'));
const ModifySupplier = lazy(() => import('../components/ModifySupplier'));

// Configuración genérica de las rutas
const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_suppliers',
    element: <SuppliersModule />,
    viewComponent: true,
  },
  {
    path: 'create/one',
    action: 'create_supplier',
    element: <CreateSupplier />,
  },
  {
    path: 'view/one/:id',
    action: 'find_one_supplier',
    element: <ViewSupplier />,
  },
  {
    path: 'update/one/:id',
    action: 'update_one_supplier',
    element: <ModifySupplier />,
  },
];

const supplierRoutes = {
  path: 'suppliers',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('suppliers', routeConfig),
  ],
};

export { supplierRoutes };
