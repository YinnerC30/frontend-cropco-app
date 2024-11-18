import { Button } from '@/components';

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

import { Trash } from 'lucide-react';
import { ToolTipTemplate } from './ToolTipTemplate';

interface Props {
  onClick: any;
  disabled: boolean;
  visible: boolean;
}

export const ButtonDeleteBulk = ({
  onClick,
  disabled = false,
  visible,
}: Props) => {
  return (
    <AlertDialog>
      <ToolTipTemplate content={'Eliminar varios registros'}>
        <AlertDialogTrigger asChild>
          <Button
            className={`${!visible ? 'hidden' : ''} `}
            variant="outline"
            size="icon"
            disabled={disabled}
          >
            <Trash className="w-4 h-4" />
            <span className="sr-only">Eliminar registros</span>
          </Button>
        </AlertDialogTrigger>
      </ToolTipTemplate>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro de eliminar los registros?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es irreversible y no podrá recuperar los registros
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onClick}>Continuar</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
