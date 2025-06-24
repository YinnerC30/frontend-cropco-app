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
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { Plus } from 'lucide-react';

import { formSchemaHarvestDetail } from '@/modules/harvests/utils';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { FormHarvestDetailsFields } from './FormHarvestDetailsFields';

export const FormHarvestDetail: React.FC = () => {
  const {
    readOnly,
    openDialog,
    setOpenDialog,
    handleOpenDialog,
    handleCloseDialog,
    resetHarvestDetail,
    formHarvestDetail,
    addHarvestDetail,
    modifyHarvestDetail,
  } = useFormHarvestContext();

  const [disableButton, setDisableButton] = useState(false);

  const onSubmitHarvestDetail = (
    values: z.infer<typeof formSchemaHarvestDetail>
  ) => {
    if (disableButton) return;
    setDisableButton(true);
    let record;
    if (!values.id) {
      record = {
        ...values,
        id: generateUUID(),
        payment_is_pending: true,
        deletedDate: null,
      };
      addHarvestDetail(record);
      toast.success('Registro añadido');
    } else {
      record = {
        ...values,
        id: values.id,
        payment_is_pending: true,
        deletedDate: null,
      };
      modifyHarvestDetail(record);
      toast.success('Registro actualizado');
    }
    setOpenDialog(false);
  };

  const handleOpenDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    resetHarvestDetail();
    setDisableButton(false);
    handleOpenDialog();
  };

  useEffect(() => {
    return () => {
      setOpenDialog(false);
      setDisableButton(false);
    };
  }, []);

  return (
    <>
      <ToolTipTemplate content={'Crear registro'}>
        <Button
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
          className="max-w-[95vw] sm:max-w-[425px]"
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
            <DialogTitle>Cosecha empleado</DialogTitle>
            <DialogDescription className="">
              Información detallada de la cosecha realizada por el empleado
            </DialogDescription>
          </DialogHeader>

          <FormHarvestDetailsFields />

          <DialogFooter>
            <Button
              type="submit"
              disabled={disableButton}
              onClick={formHarvestDetail.handleSubmit(onSubmitHarvestDetail)}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
