import { CreateSupplier } from './CreateSupplier';
import { ModifySupplier } from './ModifySupplier';
import { SuppliersModule } from './SupplierModule';
import { ViewSupplier } from './ViewSupplier';

const routes = {
  path: 'suppliers',
  children: [
    {
      path: 'view',
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

export default routes;
