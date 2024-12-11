import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components';
import { TrashIcon } from '@radix-ui/react-icons';
import { useDataTableMenuActionsContext } from '../DataTableMenuActionsContext';
interface Props {
  action: any;
  disabled?: boolean;
}
export const ActionDeleteRecord = ({ action, disabled }: Props) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem disabled={disabled} asChild>
          <Button variant={'ghost'}>
            <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
          </Button>
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro de eliminar el registro?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es irreversible y no podrá recuperar su registro
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button onClick={() => toggleOpen(false)} variant="secondary">
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                action();
                toggleOpen(false);
              }}
            >
              Continuar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
