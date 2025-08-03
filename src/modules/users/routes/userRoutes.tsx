import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteConfig } from '../../../routes/interfaces/RouteConfig';

const CreateUser = lazy(() => import('../components/CreateUser'));
const ModifyUser = lazy(() => import('../components/ModifyUser'));
const UsersModule = lazy(() => import('../components/module/UsersModule'));
const ViewUser = lazy(() => import('../components/ViewUser'));

// Configuración genérica de las rutas
const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_users',
    element: <UsersModule />,
    viewComponent: true,
    label: 'Usuarios'
  },
  {
    path: 'create/one',
    action: 'create_user',
    element: <CreateUser />,
    label: 'Crear Usuario'
  },
  {
    path: 'view/one/:id',
    action: 'find_one_user',
    element: <ViewUser />,
    label: 'Ver Usuario'
  },
  {
    path: 'update/one/:id',
    action: 'update_one_user',
    element: <ModifyUser />,
    label: 'Modificar Usuario'
  },
];

const userRoutes = {
  path: 'users',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    ...generateRoutes('users', routeConfig),
  ],
};

export { userRoutes };
