import { CreateEmployee } from "../components/Create";
import { ModifyEmployee } from "../components/Modify";
import { EmployeesModule } from "../components/Module";
import { ViewEmployee } from "../components/View";

const employeeRoutes = {
  path: "employees",
  children: [
    {
      path: "view",
      element: <EmployeesModule />,
    },
    {
      path: "create",
      element: <CreateEmployee />,
    },
    {
      path: "view/:id",
      element: <ViewEmployee />,
    },
    {
      path: "modify/:id",
      element: <ModifyEmployee />,
    },
  ],
};

export { employeeRoutes };
