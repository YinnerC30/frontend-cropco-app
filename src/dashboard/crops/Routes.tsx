import { CreateCrop } from './CreateCrop';
import CropsModule from './CropsModule';
import { ModifyCrop } from './ModifyCrop';
import { ViewCrop } from './ViewCrop';

const routes = {
  path: 'crops',
  children: [
    {
      path: 'view',
      element: <CropsModule />,
    },
    {
      path: 'create',
      element: <CreateCrop />,
    },
    {
      path: 'modify/:id',
      element: <ModifyCrop />,
    },
    {
      path: 'view/:id',
      element: <ViewCrop />,
    },
  ],
};
export default routes;
