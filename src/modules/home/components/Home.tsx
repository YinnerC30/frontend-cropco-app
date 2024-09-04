import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Outlet } from "react-router-dom";

import { CommandDialogApp } from "@/modules/core/components/CommandDialogApp";
import { Route, routes } from "@/routes/RoutesNavBar";

import { useAuthenticationUser } from "@/modules/authentication/hooks/useAuthenticationUser";
import { LogOut } from "lucide-react";
import { ModeToggle } from "../../core/components/ModeToggle";
import { useEffect, useLayoutEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const Home = () => {
  const { toast } = useToast();
  const {
    LogOutUser,
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

  const handleLogout = () => {
    LogOutUser();
  };

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
    <>
      <div className="grid grid-cols-12">
        <CommandDialogApp />
        {/* TODO: Mejorar header de la app */}
        <header className="flex flex-col col-span-12 col-start-1 my-3 border-b max-h-16">
          <div className="flex items-center justify-evenly">
            <Button variant="link" asChild>
              <Link to="/">CropcoApp</Link>
            </Button>

            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link">Perfil</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* TODO: Agregar icono de logout */}
                <DropdownMenuItem
                  onClick={() => {
                    handleLogout();
                    // location.reload();
                  }}
                >
                  <div className="flex gap-2">
                    <LogOut />
                    <span className="font-sans font-normal">Cerrar sesión</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to={"/"}>Ir a LandingPage</Link>
          </div>
        </header>
        <nav className="flex flex-row justify-center col-span-2 border-r">
          <ul className="w-11/12 ml-5 text-base font-bold">
            {/* TODO: Agregar iconos a cada uno de los módulos */}
            {routes.map((route: Route) => (
              <li key={route.name}>
                <div className="w-[200px] flex items-center gap-4">
                  {route.Icon}
                  <Link to={route.path}>{route.name}</Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-full"></div>
        </nav>
        <main className="col-span-10 ml-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};
