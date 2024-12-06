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
} from '@/components/ui/alert-dialog';

import { Trash } from 'lucide-react';
import { useState } from 'react';
import { ToolTipTemplate } from '../shared/ToolTipTemplate';

interface Props {
  onClick: any;
  disabled: boolean;
  visible: boolean;
  className?: string;
}

export const ButtonDeleteBulk = ({
  onClick,
  disabled = false,
  visible,
  className,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenAlertDialog = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  return (
    <>
      <ToolTipTemplate content={'Eliminar varios registros'}>
        <Button
          className={`${className} ${!true ? 'hidden' : ''} `}
          variant="outline"
          size="icon"
          disabled={disabled}
          onClick={handleOpenAlertDialog}
        >
          <Trash className="w-4 h-4" />
          <span className="sr-only">Eliminar registros</span>
        </Button>
      </ToolTipTemplate>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
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
    </>
  );
};
