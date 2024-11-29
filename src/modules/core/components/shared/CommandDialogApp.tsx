import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import { routes } from '@/routes/components/RoutesNavBar';
import { DialogTitle } from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CommandDialogApp() {
  const [open, setOpen] = useState(false);

  const { nameModulesUser } = useAuthContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigate = useNavigate();

  return (
    <CommandDialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTitle>
        <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
      </DialogTitle>
      <CommandInput placeholder="Escribe el nombre de un módulo..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados</CommandEmpty>
        <CommandGroup heading="Módulos">
          {routes.map((route: any) => {
            if (
              nameModulesUser.includes(route.name_module) ||
              route.name_module === 'N/A'
            ) {
              return (
                <CommandItem
                  key={route.path}
                  onSelect={() => {
                    navigate(route.path);
                    setOpen(false);
                  }}
                >
                  {route.Icon}
                  <span className="ml-2 font-medium">{route.label}</span>
                </CommandItem>
              );
            }
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
