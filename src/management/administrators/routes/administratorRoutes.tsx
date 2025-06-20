import { Navigate } from 'react-router-dom';
import { AdministratorsModule } from '../components/module';

// const CreateAdministrator = lazy(() => import('../components/CreateAdministrator'));
// const ModifyAdministrator = lazy(() => import('../components/ModifyAdministrator'));
// const AdministratorsModule = lazy(() => import('../components/module/AdministratorsModule'));
// const ViewAdministrator = lazy(() => import('../components/ViewAdministrator'));

// Configuración genérica de las rutas
// const routeConfig: RouteConfig[] = [
//   {
//     path: 'view/all',
//     action: 'find_all_administrators',
//     element: <AdministratorsModule />,
//     viewComponent: true,
//   },
//   {
//     path: 'create/one',
//     action: 'create_administrator',
//     element: <CreateAdministrator />,
//   },
//   {
//     path: 'view/one/:id',
//     action: 'find_one_administrator',
//     element: <ViewAdministrator />,
//   },
//   {
//     path: 'update/one/:id',
//     action: 'update_one_administrator',
//     element: <ModifyAdministrator />,
//   },
// ];

const administratorRoutes = {
  path: 'administrators',
  children: [
    { index: true, element: <Navigate to="view/all" /> },
    {
      path: 'view/all',
      element: <AdministratorsModule />,
    },
    // ...generateRoutes('administrators', routeConfig),
  ],
};

export { administratorRoutes };
