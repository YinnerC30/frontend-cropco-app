import { CreateSupplier } from '../components/CreateSupplier';
import { ModifySupplier } from '../components/ModifySupplier';
import { SuppliersModule } from '../components/SuppliersModule';
import { ViewSupplier } from '../components/ViewSupplier';

const supplierRoutes = {
  path: 'suppliers',

  children: [
    {
      index: true,
      element: <SuppliersModule />,
    },
    {
      path: 'all',
      element: <SuppliersModule />,
    },
    {
      path: 'create',
      element: <CreateSupplier />,
    },
    {
      path: 'view/:id',
      element: <ViewSupplier />,
    },
    {
      path: 'modify/:id',
      element: <ModifySupplier />,
    },
  ],
};

export { supplierRoutes };
