import { CreateUser, ModifyUser, UsersModule, ViewUser } from "../components";
import { UpdateUserActions } from "../components/UpdateUserActions";

const userRoutes = {
  path: "users",
  children: [
    {
      path: "all",
      element: <UsersModule />,
    },
    {
      path: "create",
      element: <CreateUser />,
    },
    {
      path: "view/:id",
      element: <ViewUser />,
    },
    {
      path: "modify/:id",
      element: <ModifyUser />,
    },
    {
      path: "update/actions/:id",
      element: <UpdateUserActions />,
    },
  ],
};

export { userRoutes };
