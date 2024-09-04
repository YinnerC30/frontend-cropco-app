import { useAuthenticationUser } from "@/modules/authentication/hooks/useAuthenticationUser";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const { isActiveSesion, validateToken, redirectToLogin } =
    useAuthenticationUser();

  useEffect(() => {
    if (isActiveSesion()) {
      validateToken();
    } else {
      redirectToLogin();
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
export default { Layout };
