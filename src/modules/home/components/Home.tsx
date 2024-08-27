import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuthenticationUser } from "@/modules/authentication/hooks/useAuthenticationUser";
import { useCheckAuthStatus } from "@/modules/authentication/hooks/useCheckAuthStatus";
import { Loading } from "@/modules/core/components";
import { CommandDialogApp } from "@/modules/core/components/CommandDialogApp";
import { Route, routes } from "@/routes/RoutesNavBar";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
// import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";
import { renewToken } from "@/modules/authentication/services/renewToken";
import { ToastAction } from "@radix-ui/react-toast";
import { ModeToggle } from "../../core/components/ModeToggle";

export const Home = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    LogOutUser,
    isActiveSesion,
    getTokenSesion,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
    renewJWT,
    redirectToLogin,
  } = useAuthenticationUser();

  const { mutate, isPending, error, isError } = useCheckAuthStatus();

  const setupAuthCheckInterval = () => {
    return setInterval(() => {
      mutate({ token: getTokenSesion() });
    }, TIME_ACTIVE_TOKEN);
  };

  const handleTokenRenewal = () => {
    renewToken(getTokenSesion())
      .then((data) => {
        console.log("Token renovado con éxito:", data);
        const { token } = data;
        renewJWT(token);
      })
      .catch((error) => {
        console.error("Error al renovar el token:", error);
      });
  };

  // const setupRenewTokenInterval = () => {
  //   return setInterval(() => {
  //     toast({
  //       title: "Scheduled: Catch up ",
  //       description: "Friday, February 10, 2023 at 5:57 PM",
  //       action: (
  //         <ToastAction
  //           altText="Goto schedule to undo"
  //           onClick={() =>
  //             renewToken(getTokenSesion())
  //               .then((data) => {
  //                 console.log("Token renovado con éxito:", data);
  //                 const { token } = data;
  //                 renewJWT(token);
  //               })
  //               .catch((error) => {
  //                 console.error("Error al renovar el token:", error);
  //               })
  //           }
  //         >
  //           Undo
  //         </ToastAction>
  //       ),
  //       duration: 2000,
  //     });
  //   }, TIME_QUESTION_RENEW_TOKEN);
  // };

  useEffect(() => {
    if (isActiveSesion()) {
      const intervalId1 = setupAuthCheckInterval();

      return () => {
        clearInterval(intervalId1);
      };
    } else {
      redirectToLogin();
    }
  }, []);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    const {
      response: {
        data: { statusCode },
      },
    } = error;
    if (statusCode === 401) {
      LogOutUser();
    }
  }

  // Remplazar por componente Link de React Router Dom

  const handleNavigate = (endpoint: string) => {
    navigate(`${endpoint}`);
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
                    LogOutUser();
                    // toast.success("El usuario ha cerrado la sesión");
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
                <div className="w-[200px] flex items-center">
                  {route.Icon}
                  <Button
                    variant={"link"}
                    onClick={() => handleNavigate(route.path)}
                  >
                    {route.name}
                  </Button>
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
