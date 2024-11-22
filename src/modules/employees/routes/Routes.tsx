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
      path: 'view/all',
      element: <EmployeesModule />,
    },
    {
      path: 'create/one',
      element: <CreateEmployee />,
    },
    {
      path: 'view/one/:id',
      element: <ViewEmployee />,
    },
    {
      path: 'update/one/:id',
      element: <ModifyEmployee />,
    },
  ],
};

export { employeeRoutes };
