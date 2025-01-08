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

import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';

import { formSchemaConsumptionDetail } from '@/modules/consumption/utils';
import { z } from 'zod';
import { FormConsumptionDetailsFields } from './FormConsumptionDetailsFields';

export const FormConsumptionDetail: React.FC = () => {
  const {
    readOnly,
    openDialog,
    setOpenDialog,
    consumptionDetail,
    handleOpenDialog,
    handleCloseDialog,
    resetConsumptionDetail,
    addConsumptionDetail,
    modifyConsumptionDetail,
    formConsumptionDetail,
  } = useFormConsumptionContext();

  const onSubmitConsumptionDetail = (
    values: z.infer<typeof formSchemaConsumptionDetail>
  ) => {
    if (!consumptionDetail.id) {
      const record = {
        ...values,
        id: generateUUID(),
      };
      addConsumptionDetail(record);
      toast.success('Registro añadido');
    } else {
      const record = { ...values, id: consumptionDetail.id };
      modifyConsumptionDetail(record);
      toast.success('Registro actualizado');
    }

    setOpenDialog(false);
  };

  const handleOpenDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    resetConsumptionDetail();
    handleOpenDialog();
  };

  return (
    <>
      <ToolTipTemplate content={'Crear registro'}>
        <Button
          className={`${readOnly && 'hidden'}`}
          variant="outline"
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
            <DialogTitle>Compra a proveedores</DialogTitle>
            <DialogDescription className="">
              Información detallada de la compra realizada al proveedor
            </DialogDescription>
          </DialogHeader>

          <FormConsumptionDetailsFields />

          <DialogFooter>
            <Button
              type="submit"
              onClick={formConsumptionDetail.handleSubmit(
                onSubmitConsumptionDetail
              )}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
