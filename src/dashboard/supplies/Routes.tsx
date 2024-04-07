import { CreateSupply } from './CreateSupply';
import { ModifySupply } from './ModifySupply';
import SuppliesModule from './SuppliesModule';
import { ViewSupply } from './ViewSupply';

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
