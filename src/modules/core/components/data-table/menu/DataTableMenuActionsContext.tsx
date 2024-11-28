import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';
import { MoreHorizontal } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

const DataTableMenuActionsContext = createContext<any>(undefined);

export const DataTableMenuActionsProvider = ({ children }: any) => {
  const [open, toggleOpen] = useState(false);
  return (
    <DataTableMenuActionsContext.Provider value={{ open, toggleOpen }}>
      <DropdownMenu open={open} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 "
            onClick={() => toggleOpen(!open)}
          >
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onPointerDownOutside={() => toggleOpen(false)}
          align="center"
          className="flex flex-col items-center gap-1 "
        >
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator className="w-full" />
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </DataTableMenuActionsContext.Provider>
  );
};

export const useDataTableMenuActionsContext = () => {
  const context = useContext(DataTableMenuActionsContext);
  if (!context) {
    throw new Error(
      'useDataTableMenuActionsContext must be used within useDataTableMenuActionsProvider'
    );
  }
  return context;
};
