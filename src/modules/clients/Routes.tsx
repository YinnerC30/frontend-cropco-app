import ClientsModule from './ClientsModule';
import { CreateClient } from './CreateClient';
import { ModifyClient } from './ModifyClient';
import { ViewClient } from './ViewClient';

const clientRoutes = {
  path: 'clients',
  children: [
    {
      path: 'view',
      element: <ClientsModule />,
    },
    {
      path: 'create',
      element: <CreateClient />,
    },
    {
      path: 'view/:id',
      element: <ViewClient />,
    },
    {
      path: 'modify/:id',
      element: <ModifyClient />,
    },
  ],
};

export  { clientRoutes };
