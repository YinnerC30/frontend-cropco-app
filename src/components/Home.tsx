import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ModeToggle } from './mode-toggle';

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (endpoint: string) => {
    navigate(`${endpoint}`);
  };

  return (
    <>
      <div className="grid h-screen grid-cols-10 grid-rows-10">
        <header className="flex flex-col col-span-10 col-start-1 row-span-1">
          <div className="flex items-center my-2 justify-evenly">
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
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator className="my-2" />
        </header>
        <nav className="flex flex-row items-center justify-center col-span-2 row-start-2 row-span-9">
          <ul className="w-11/12 ml-5 text-base font-bold">
            <li>
              <Button
                variant={'link'}
                onClick={() => handleNavigate('users/view')}
              >
                Users
              </Button>
            </li>
            <li>
              <Button
                variant={'link'}
                onClick={() => handleNavigate('crops/view')}
              >
                Crops
              </Button>
            </li>
            <li>
              <Button
                variant={'link'}
                onClick={() => handleNavigate('clients/view')}
              >
                Clientes
              </Button>
            </li>
            <li>
              <Button
                variant={'link'}
                onClick={() => handleNavigate('employees/view')}
              >
                Empleados
              </Button>
            </li>
            <li>
              <Button
                variant={'link'}
                onClick={() => handleNavigate('suppliers/view')}
              >
                Proveedores
              </Button>
            </li>
            <li>
              <Button
                variant={'link'}
                onClick={() => handleNavigate('supplies/view')}
              >
                Insumos
              </Button>
            </li>
          </ul>

          <div className="h-full">
            <Separator orientation="vertical" />
          </div>
        </nav>
        <main className="col-span-8 overflow-hidden row-span-9">
          <Outlet />
          <Toaster position="top-right" closeButton richColors={true} />
        </main>
      </div>
    </>
  );
};
