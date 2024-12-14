
import { CreateSale } from '../components/CreateSale';
import { ModifySale } from '../components/ModifySale';
import SaleModule from '../components/module/SaleModule';
import { ViewSale } from '../components/ViewSale';

const salesRoutes = {
  path: 'sales',
  children: [
    {
      index: true,
      element: <SaleModule />,
    },
    {
      path: 'view/all',
      element: <SaleModule />,
    },
    {
      path: 'create/one',
      element: <CreateSale />,
    },
    {
      path: 'update/one/:id',
      element: <ModifySale />,
    },
    {
      path: 'view/one/:id',
      element: <ViewSale />,
    },
  ],
};

export { salesRoutes as saleRoutes };

