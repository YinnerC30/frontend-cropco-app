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


import { TrashIcon } from '@radix-ui/react-icons';

interface Props {
  onClick: any;
  disabled: boolean;
  visible: boolean;
}

export const ButtonDeleteBulk = ({ onClick, disabled = false, visible }: Props) => {
  return (


    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} className={`${!visible ? 'hidden' : ''}`} >
          <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
        </Button>
      </AlertDialogTrigger>

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
            <Button variant="secondary">
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={onClick}
            >
              Continuar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  );
};
