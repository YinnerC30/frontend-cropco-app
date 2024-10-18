'use client';

import * as React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { routes } from '@/routes/RoutesNavBar';
import { useNavigate } from 'react-router-dom';
import { useAuthorizationActions } from '@/modules/authentication/hooks/useAuthorizationActions';

export function CommandDialogApp() {
  const [open, setOpen] = React.useState(false);

  const { modulesUser } = useAuthorizationActions();

  React.useEffect(() => {
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
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Escribe el nombre de un módulo..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados</CommandEmpty>
        <CommandGroup heading="Módulos">
          {routes.map((route: any) => {
            if (
              modulesUser.includes(route.name_module) ||
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
