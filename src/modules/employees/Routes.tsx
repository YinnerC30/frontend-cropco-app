import { CreateEmployee } from './CreateEmployee';
import { ModifyEmployee } from './ModifyEmployee';
import { ViewEmployee } from './ViewEmployee';
import EmployeesModule from "./EmployeesModule";

const employeeRoutes = {
  path: "employees",
  children: [
    {
      path: "view",
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
