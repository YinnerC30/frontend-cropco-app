import { CreateEmployee } from './CreateEmployee';
import EmployeesModule from './EmployeesModule';
import { ModifyEmployee } from './ModifyEmployee';
import { ViewEmployee } from './ViewEmployee';

const employeeRoutes = {
  path: 'employees',
  children: [
    {
      path: 'view',
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

export { employeeRoutes};
