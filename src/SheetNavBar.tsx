import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavBar } from './components/Home/NavBar';
import { NavElement } from './components/Home/NavElement';
import { Route, routes } from './routes/RoutesNavBar';
import { useState } from 'react';

interface Props {
  modulesUser: any[];
}

export function SheetNavBar({ modulesUser }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="w-[250px] ">
        <NavBar className="flex flex-col col-span-2 gap-1 py-2 pl-4 row-span-11">
          {routes.map((route: Route) => {
            if (
              modulesUser.includes(route.name_module) ||
              route.name_module === 'N/A'
            ) {
              return (
                <NavElement
                  key={route.path}
                  route={route}
                  className="w-auto "
                  onClick={() => setOpen(!open)}
                />
              );
            }
          })}
        </NavBar>
      </SheetContent>
    </Sheet>
  );
}
