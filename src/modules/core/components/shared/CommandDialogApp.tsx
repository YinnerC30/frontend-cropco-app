import { useAuthContext } from '@/auth/hooks/useAuthContext';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Route, routes } from '@/routes/components/RoutesNavBar';
import { DialogTitle } from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormChange } from '../form/FormChangeContext';

export const CommandDialogApp = () => {
  const [open, setOpen] = useState(false);

  const { nameModulesUser } = useAuthContext();

  const { hasUnsavedChanges, showToast } = useFormChange();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        if (hasUnsavedChanges) {
          showToast({
            skipRedirection: true,
            action: () => {
              setOpen((open) => !open);
            },
          });
        } else {
          setOpen((open) => !open);
        }
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [hasUnsavedChanges]);

  const navigate = useNavigate();

  return (
    <CommandDialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogTitle>
        <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
      </DialogTitle>
      <CommandInput placeholder="Escribe el nombre de un módulo..." />

      <CommandList className="">
        <CommandEmpty>No se encontraron resultados</CommandEmpty>
        <CommandGroup heading="Módulos">
          {routes.map((route: Route) => {
            if (nameModulesUser.includes(route.name_module)) {
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
};
