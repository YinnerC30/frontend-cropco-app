import { CreateEmployee } from '../components/CreateEmployee';
import { ModifyEmployee } from '../components/ModifyEmployee';
import { EmployeesModule } from '../components/EmployeesModule';
import { ViewEmployee } from '../components/ViewEmployee';

const employeeRoutes = {
  path: 'employees',
  children: [
    {
      index: true,
      element: <EmployeesModule />,
    },
    {
      path: 'all',
      element: <EmployeesModule />,
    },
    {
      path: 'create',
      element: <CreateEmployee />,
    },
    {
      path: 'view/:id',
      element: <ViewEmployee />,
    },
    {
      path: 'modify/:id',
      element: <ModifyEmployee />,
    },
  ],
};

export { employeeRoutes };
