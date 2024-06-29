import { WorkModule } from "../components/WorkModule";

const workRoutes = {
  path: "works",
  children: [
    {
      path: "view",
      element: <WorkModule />,
    },
    // {
    //   path: 'create',
    //   element: <CreateCrop />,
    // },
    // {
    //   path: 'modify/:id',
    //   element: <ModifyCrop />,
    // },
    // {
    //   path: 'view/:id',
    //   element: <ViewCrop />,
    // },
  ],
};
export { workRoutes };
