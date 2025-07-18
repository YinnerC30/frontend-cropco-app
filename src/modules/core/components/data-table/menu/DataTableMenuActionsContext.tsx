import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';
import { MoreHorizontal } from 'lucide-react';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react';

// Definición del tipo para el contexto
interface DataTableMenuActionsContextType {
  open: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
}

const DataTableMenuActionsContext = createContext<
  DataTableMenuActionsContextType | undefined
>(undefined);

interface DataTableMenuActionsProviderProps extends PropsWithChildren {
  idRow?: string;
}

export const DataTableMenuActionsProvider = ({
  idRow = 'no-implemented',
  children,
}: DataTableMenuActionsProviderProps) => {
  const [open, toggleOpen] = useState<boolean>(false);
  return (
    <DataTableMenuActionsContext.Provider value={{ open, toggleOpen }}>
      <DropdownMenu open={open} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 "
            onClick={() => toggleOpen(!open)}
            data-testid={`btn-actions-table-row-id-${idRow}`}
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

export const useDataTableMenuActionsContext =
  (): DataTableMenuActionsContextType => {
    const context = useContext(DataTableMenuActionsContext);
    if (!context) {
      throw new Error(
        'useDataTableMenuActionsContext must be used within DataTableMenuActionsProvider'
      );
    }
    return context;
  };
