import ClientsModule from '../components/ClientsModule/ClientsModule';
import { CreateClient } from '../components/CreateClient';
import { ModifyClient } from '../components/ModifyClient';
import { ViewClient } from '../components/ViewClient';

const clientRoutes = {
  path: 'clients',
  children: [
    {
      index: true,
      element: <ClientsModule />,
    },
    {
      path: 'view/all',
      element: <ClientsModule />,
    },
    {
      path: 'create/one',
      element: <CreateClient />,
    },
    {
      path: 'view/one/:id',
      element: <ViewClient />,
    },
    {
      path: 'update/one/:id',
      element: <ModifyClient />,
    },
  ],
};

export { clientRoutes };
