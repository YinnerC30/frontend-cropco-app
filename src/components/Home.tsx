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
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { ScrollArea } from './ui/scroll-area';
import { Toaster } from './ui/sonner';

export const Home = () => {
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
                <Button variant="secondary">Perfil</Button>
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
        <nav className="flex flex-row col-span-2 row-start-2 row-span-9">
          <ul className="w-11/12 ml-5 text-base font-bold">
            <li>
              <NavLink to="users">Usuarios</NavLink>
            </li>
          </ul>

          <div className="h-full m-1">
            <Separator orientation="vertical" />
          </div>
        </nav>
        <main className="col-span-6 row-span-7">
          {/* TODO: Configurar medidas de Scroll area */}
          <ScrollArea>
            <Outlet />
          </ScrollArea>
        </main>
        <Toaster />
      </div>
    </>
  );
};
