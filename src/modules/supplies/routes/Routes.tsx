import {
  CreateSupply,
  ModifySupply,
  SuppliesModule,
  ViewSupply,
} from '../components';

const supplyRoutes = {
  path: 'supplies',
  children: [
    {
      path: 'view',
      element: <SuppliesModule />,
    },
    {
      path: 'create',
      element: <CreateSupply />,
    },
    {
      path: 'view/:id',
      element: <ViewSupply />,
    },
    {
      path: 'modify/:id',
      element: <ModifySupply />,
    },
  ],
};

export { supplyRoutes };
