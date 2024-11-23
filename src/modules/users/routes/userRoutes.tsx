// path: /routes/userRoutes.tsx
import { generateRoutes } from '@/routes/helpers/generateRoutes';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteConfig } from '../../../routes/interfaces/RouteConfig';

// Lazy load de los componentes
const CreateUser = lazy(() => import('../components/CreateUser'));
const ModifyUser = lazy(() => import('../components/ModifyUser'));
const UsersModule = lazy(() => import('../components/UsersModule/UsersModule'));
const ViewUser = lazy(() => import('../components/ViewUser'));
const FormChangePassword = lazy(
  () => import('../components/FormChangePassword')
);

// Configuración genérica de las rutas
const routeConfig: RouteConfig[] = [
  {
    path: 'view/all',
    action: 'find_all_users',
    element: <UsersModule />,
    viewComponent: true,
  },
  {
    path: 'create/one',
    action: 'create_user',
    element: <CreateUser />,
  },
  {
    path: 'view/one/:id',
    action: 'find_one_user',
    element: <ViewUser />,
  },
  {
    path: 'update/one/:id',
    action: 'update_one_user',
    element: <ModifyUser />,
  },
  {
    path: 'change-password/one',
    action: 'change_password_user',
    element: <FormChangePassword />,
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