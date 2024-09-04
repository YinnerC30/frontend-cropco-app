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
import { useEffect } from "react";
import { ModeToggle } from "../../core/components/ModeToggle";

export const Home = () => {
  // const {
  //   LogOutUser,
  //   isActiveSesion,
  //   validateToken,
  //   mutationCheckAuthStatus,
  //   mutationRenewToken,
  //   redirectToLogin,
  //   renewToken,

  //   TIME_QUESTION_RENEW_TOKEN,
  //   renewTokenInState,
  //   renewTokenInLocalStorage,
  // } = useAuthenticationUser();

  // // const [hasUpdateToken, setHasUpdateToken] = useState(false);

  // useEffect(() => {
  //   if (isActiveSesion()) {
  //     validateToken();
  //   } else {
  //     redirectToLogin();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (mutationCheckAuthStatus.isError) {
  //     const { statusCode } = mutationCheckAuthStatus.error.response.data;
  //     if (statusCode === 401) {
  //       LogOutUser();
  //     }
  //   }
  // }, [mutationCheckAuthStatus.isError, mutationCheckAuthStatus.error]);

  // useEffect(() => {
  //   if (isActiveSesion()) {
  //     const id = setTimeout(renewToken, TIME_QUESTION_RENEW_TOKEN);
  //     return () => clearTimeout(id);
  //   }
  // }, [mutationCheckAuthStatus]);

  // // const handleTokenUpdate = () => {
  // //   setHasUpdateToken(true);
  // // };

  // useEffect(() => {
  //   if (mutationRenewToken.isSuccess) {
  //     const { token } = mutationRenewToken.data.data;
  //     renewTokenInState(token);
  //     renewTokenInLocalStorage(token);
  //     // handleTokenUpdate(); // Llamada correcta a la función
  //   }
  // }, [
  //   mutationRenewToken.isSuccess,
  //   mutationRenewToken.data,
  //   renewTokenInState, // Incluye todas las dependencias
  // ]);

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
                    // LogOutUser();
                  }}
                >
                  <div className="flex gap-2">
                    <LogOut />
                    <span className="font-sans font-normal">Cerrar sesión</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
