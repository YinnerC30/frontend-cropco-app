"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { routes } from "@/routes/RoutesNavBar";
import { useNavigate } from "react-router-dom";

export function CommandDialogApp() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escribe el nombre de un módulo..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados</CommandEmpty>
          <CommandGroup heading="Módulos">
            {routes.map((item: any) => (
              <CommandItem
                key={item.path}
                onSelect={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
              >
                {item.Icon}
                <span className="ml-2">{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
