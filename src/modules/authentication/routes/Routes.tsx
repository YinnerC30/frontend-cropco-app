import { Login } from "../components/Login";
import { LogOut } from "../components/LogOut";

const authenticationRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <LogOut />,
  },
];

export { authenticationRoutes };
