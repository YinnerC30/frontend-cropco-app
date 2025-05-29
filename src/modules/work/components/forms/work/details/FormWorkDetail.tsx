import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { toast } from 'sonner';
import { v4 as generateUUID } from 'uuid';

import { ToolTipTemplate } from '@/modules/core/components';

import { Plus } from 'lucide-react';

import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';
import { formSchemaWorkDetails } from '@/modules/work/utils/formSchemaWorkDetails';
import { z } from 'zod';
import { FormWorkDetailsFields } from './FormWorkDetailsFields';

export const FormWorkDetail: React.FC = () => {
  const {
    readOnly,
    openDialog,
    setOpenDialog,
    handleOpenDialog,
    handleCloseDialog,
    resetWorkDetail,
    addWorkDetail,
    modifyWorkDetail,
    formWorkDetail,
  } = useFormWorkContext();

  const onSubmitWorkDetail = (
    values: z.infer<typeof formSchemaWorkDetails>
  ) => {
    if (!values.id) {
      const record = {
        ...values,
        payment_is_pending: true,
        deletedDate: null,
        id: generateUUID(),
      };
      addWorkDetail(record);
      toast.success('Registro añadido');
    } else {
      modifyWorkDetail({
        ...values,
        payment_is_pending: true,
        deletedDate: null,
      });
      toast.success('Registro actualizado');
    }
    setOpenDialog(false);
  };

  const handleOpenDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    resetWorkDetail();
    handleOpenDialog();
  };

  return (
    <>
      <ToolTipTemplate content={'Crear registro'}>
        <Button
          type="button"
          className={`${
            readOnly && 'hidden'
          } bg-primary/70 hover:bg-primary/50`}
          size="icon"
          onClick={handleOpenDialogExtended}
          disabled={readOnly}
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Crear nuevo registro</span>
        </Button>
      </ToolTipTemplate>
      <Dialog open={openDialog} modal={false}>
        <DialogContent
          className="sm:max-w-[425px]"
          onClick={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogClose
            onClick={handleCloseDialog}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Trabajo del empleado</DialogTitle>
            <DialogDescription className="">
              Información detallada del trabajo realizado por el empleado
            </DialogDescription>
          </DialogHeader>

          <FormWorkDetailsFields />

          <DialogFooter>
            <Button
              type="submit"
              onClick={formWorkDetail.handleSubmit(onSubmitWorkDetail)}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
