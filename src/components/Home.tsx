import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { ModeToggle } from './ModeToggle';
import { routes } from './RoutesNavBar';
import { Toaster } from './ui/sonner';

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (endpoint: string) => {
    navigate(`${endpoint}`);
  };

  return (
    <>
      <div className="grid grid-cols-10">
        <header className="flex flex-col col-span-10 col-start-1 my-6 max-h-16">
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
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <nav className="flex flex-row items-start justify-center col-span-2">
          <ul className="w-11/12 ml-5 text-base font-bold">
            {routes.map(route => (
              <li key={route.name}>
                <Button
                  variant={'link'}
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

          <Toaster position="top-right" closeButton richColors={true} />
        </main>
      </div>
    </>
  );
};
