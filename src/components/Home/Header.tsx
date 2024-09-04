// import { Link } from "react-router-dom";
// import { Button } from "../ui/button";
// import { ModeToggle } from "@/modules/core/components";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";

// import { useAuthenticationUser } from "@/modules/authentication/hooks/useAuthenticationUser";
// import { LogOut } from "lucide-react";

interface Props {
  className: string;
  children: React.ReactNode;
}

export const Header = ({ className, children }: Props) => {
  // const { LogOutUser } = useAuthenticationUser();
  return (
    <header className={className}>
      {children}
      {/* Tema de color de la aplicación */}
      {/* <ModeToggle /> */}

      {/* Opciones de usuario */}
      {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link">Perfil</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                LogOutUser();
              }}
            >
              <div className="flex gap-2">
                <LogOut />
                <span className="font-sans font-normal">Cerrar sesión</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

      {/* Ir a la landing */}
      {/* <Link to={"/"}>Ir a LandingPage</Link> */}
    </header>
  );
};
