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
import { ModeToggle } from "../../core/components/ModeToggle";
import { Toaster } from "@/components/ui/sonner";
import { LogOut } from "lucide-react";
import { CommandDialogApp } from "@/modules/core/components/CommandDialogApp";

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
        <CommandDialogApp />
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
                {/* TODO: Agregar icono de logout */}
                <DropdownMenuItem onClick={() => logOut()}>
                  <div className="flex gap-2">
                    <LogOut />
                    <span className="font-sans font-normal">Cerrar sesión</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <nav className="flex flex-row items-center justify-center col-span-2">
          <ul className="w-11/12 ml-5 text-base font-bold">
            {/* TODO: Agregar iconos a cada uno de los módulos */}
            {routes.map((route) => (
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
        <main className="col-span-8">
          <Outlet />
          <Toaster position="bottom-right" closeButton />
        </main>
      </div>
    </>
  );
};
