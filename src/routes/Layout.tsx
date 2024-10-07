import { useAuthenticationUser } from "@/modules/authentication/hooks/useAuthenticationUser";
import { Loading } from "@/modules/core/components";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const {
    isActiveSesion,
    validateToken,
    redirectToLogin,
    mutationCheckAuthStatus,
  } = useAuthenticationUser();

  useEffect(() => {
    if (isActiveSesion()) {
      validateToken();
    } else {
      redirectToLogin();
    }
  }, []);

  if (mutationCheckAuthStatus.isPending) {
    console.log("Se mostro loading 😁");
    return <Loading />;
  }

  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
};
export default { Layout };
