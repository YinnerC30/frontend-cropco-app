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
import { useLayoutEffect } from "react";

export const Home = () => {
  const { LogOutUser, redirectToLogin, isActiveSesion, renewToken } =
    useAuthenticationUser();

  useLayoutEffect(() => {
    !isActiveSesion() && redirectToLogin();
  }, [isActiveSesion]);

  const handleLogout = () => {
    LogOutUser();
  };

  const handleAumentarSesion = () => {
    renewToken();
    console.log("Sesión aumentada");
  };

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

            <Button onClick={handleAumentarSesion} variant="destructive">
              Aumentar sesión
            </Button>
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
