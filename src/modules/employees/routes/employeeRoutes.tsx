import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { RouteConfig } from '@/routes/interfaces/RouteConfig';

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const EmployeesModule = lazy(
  () => import('../components/module/EmployeesModule')
);
const CreateEmployee = lazy(() => import('../components/CreateEmployee'));
const ViewEmployee = lazy(() => import('../components/ViewEmployee'));
const ModifyEmployee = lazy(() => import('../components/ModifyEmployee'));

// Configuración genérica de las rutas
const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_employees',
    element: <EmployeesModule />,
    viewComponent: true,
  },
  {
    path: 'create/one',
    action: 'create_employee',
    element: <CreateEmployee />,
  },
  {
    path: 'view/one/:id',
    action: 'find_one_employee',
    element: <ViewEmployee />,
  },
  {
    path: 'update/one/:id',
    action: 'update_one_employee',
    element: <ModifyEmployee />,
  },
];

const employeeRoutes = {
  path: 'employees',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('employees', routeConfig),
  ],
};

export { employeeRoutes };
