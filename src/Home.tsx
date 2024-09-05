import { CommandDialogApp } from "@/modules/core/components/CommandDialogApp";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticationUser } from "@/modules/authentication/hooks/useAuthenticationUser";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Header } from "./components/Home/Header";
import { Main } from "./components/Home/Main";
import { MyAccount } from "./components/Home/MyAccount";
import { NavBar } from "./components/Home/NavBar";
import { NavElement } from "./components/Home/NavElement";
import { ModeToggle } from "./modules/core/components";
import { Route, routes } from "./routes/RoutesNavBar";

export const Home = () => {
  const { toast } = useToast();
  const {
    redirectToLogin,
    isActiveSesion,
    renewToken,
    validateToken,
    mutationCheckAuthStatus,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
  } = useAuthenticationUser();

  const [visibleToastExtendSesion, setVisibleToastExtendSesion] =
    useState(false);

  useLayoutEffect(() => {
    !isActiveSesion() && redirectToLogin();
  }, [isActiveSesion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleToastExtendSesion(true);
    }, TIME_QUESTION_RENEW_TOKEN);

    return () => clearTimeout(timer);
  }, [visibleToastExtendSesion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      validateToken();
    }, TIME_ACTIVE_TOKEN);

    return () => clearTimeout(timer);
  }, [mutationCheckAuthStatus, validateToken, visibleToastExtendSesion]);

  const handleAumentarSesion = () => {
    renewToken();
    setVisibleToastExtendSesion(false);
  };

  const showToast = () => {
    return toast({
      title: "Aumentar tiempo de sesión",
      duration: 2000,
      description:
        "La sesión esta por expirar, si desea continuar por favor presione Clic",
      action: (
        <ToastAction
          onClick={() => {
            console.log("Diste clic en el toast");
            handleAumentarSesion();
          }}
          altText="Extender sesión"
        >
          Aumentar
        </ToastAction>
      ),
    });
  };

  useEffect(() => {
    if (visibleToastExtendSesion) {
      showToast();
    }
  }, [visibleToastExtendSesion]);

  return (
    <div className="grid grid-cols-12 ">
      <CommandDialogApp />

      <Header className="flex flex-row items-center col-span-12 col-start-1 py-4 border-b justify-evenly">
        <Link
          className="mx-4 text-3xl font-medium hover:text-blue-500"
          to="/app/home"
        >
          Cropco
        </Link>
        <ModeToggle />
        <MyAccount />
      </Header>

      <NavBar className="flex flex-col col-span-2 gap-1 py-2 pl-4 border-r">
        {routes.map((route: Route) => (
          <NavElement
            key={route.path}
            route={route}
            className="w-[180px] hover:bg-blue-500 hover:rounded-md hover:text-white transition-all duration-75"
          />
        ))}
      </NavBar>

      <Main className="col-span-10 ml-5">
        <Outlet />
      </Main>
    </div>
  );
};
