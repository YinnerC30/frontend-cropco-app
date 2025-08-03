import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CreateConsumption = lazy(() => import('../components/CreateConsumption'));
const ModifyConsumption = lazy(() => import('../components/ModifyConsumption'));
const ViewConsumption = lazy(() => import('../components/ViewConsumption'));
const ConsumptionModule = lazy(
  () => import('../components/module/ConsumptionModule')
);

const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_supplies_consumption',
    element: <ConsumptionModule />,
    viewComponent: true,
    label: 'Consumos'
  },
  {
    path: 'create/one',
    action: 'create_supply_consumption',
    element: <CreateConsumption />,
    label: 'Crear Consumo'
  },
  {
    path: 'view/one/:id',
    action: 'find_one_supplies_consumption',
    element: <ViewConsumption />,
    label: 'Ver Consumo'
  },
  {
    path: 'update/one/:id',
    action: 'update_one_supplies_consumption',
    element: <ModifyConsumption />,
    label: 'Modificar Consumo'
  },
];

const consumptionRoutes = {
  path: 'consumptions',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('consumptions', routeConfig),
  ],
};

export { consumptionRoutes };
