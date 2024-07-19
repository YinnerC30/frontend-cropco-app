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

import { removeUserActive } from "@/modules/authentication/utils/authenticationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { routes } from "@/routes/RoutesNavBar";
import { useEffect } from "react";
import { RootState } from "../../../redux/store";
import { ModeToggle } from "./ModeToggle";
import { Toaster } from "sonner";

// TODO: Ubicar correcatement el Sonner o toast para que le haga efecto el cambio de color light/dark
export const Home = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.authentication);

  useEffect(() => {
    if (user.token.length === 0) {
      navigate("/authentication/login", { replace: true });
    }
  }, [user]);

  const handleNavigate = (endpoint: string) => {
    navigate(`${endpoint}`);
  };

  const logOut = () => {
    dispatch(removeUserActive());
    localStorage.removeItem("user-active");
    navigate("/authentication/login", { replace: true });
  };

  return (
    <>
      <div className="grid grid-cols-10">
        {/* TODO: Mejorar header de la app */}
        <header className="flex flex-col col-span-10 col-start-1 my-3 max-h-16">
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
                <DropdownMenuItem onClick={() => logOut()}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <nav className="flex flex-row items-start justify-center col-span-2">
          <ul className="w-11/12 ml-5 text-base font-bold">
            {/* TODO: Agregar iconos a cada uno de los módulos */}
            {routes.map((route) => (
              <li key={route.name}>
                <Button
                  variant={"link"}
                  onClick={() => handleNavigate(route.path)}
                >
                  {route.name}
                </Button>
              </li>
            ))}
          </ul>

          <div className="h-full"></div>
        </nav>
        <main className="col-span-8">
          <Outlet />
          <Toaster position="bottom-right" closeButton />
        </main>
      </div>
    </>
  );
};
