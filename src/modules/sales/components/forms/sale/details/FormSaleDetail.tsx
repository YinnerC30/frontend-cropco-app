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

import { useFormSaleContext } from '@/modules/sales/hooks';
import { formSchemaSaleDetails } from '@/modules/sales/utils';
import React from 'react';
import { z } from 'zod';
import { FormSaleDetailsFields } from './FormSaleDetailsFields';
import { ScrollArea } from '@/components';

export const FormSaleDetail: React.FC = () => {
  const {
    readOnly,
    openDialog,
    setOpenDialog,
    handleOpenDialog,
    handleCloseDialog,
    resetSaleDetail,
    addSaleDetail,
    modifySaleDetail,
    formSaleDetail,
    removeCropStock,
    validateAvailableStock,
    isSubmittingSaleDetail,
  } = useFormSaleContext();

  const onSubmitSaleDetail = (
    values: z.infer<typeof formSchemaSaleDetails>
  ) => {
    const result = validateAvailableStock({
      id: values.crop.id,
      name: values.crop?.name!,
      stock: values.amount,
      unit_of_measure: values.unit_of_measure,
    });

    if (!result) return;

    if (!values.id) {
      const record = {
        ...values,
        deletedDate: null,
        client: { ...values.client, deletedDate: null },
        crop: { ...values.crop, deletedDate: null },
        id: generateUUID(),
      };

      removeCropStock({
        id: values.crop.id,
        name: values.crop?.name!,
        stock: values.amount,
        unit_of_measure: values.unit_of_measure,
      });

      addSaleDetail(record);
      toast.success('Registro añadido');
    } else {
      removeCropStock({
        id: values.crop.id,
        name: values.crop?.name!,
        stock: values.amount,
        unit_of_measure: values.unit_of_measure,
      });

      modifySaleDetail({
        ...values,
        client: { ...values.client, deletedDate: null },
        crop: { ...values.crop, deletedDate: null },
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
    resetSaleDetail();
    handleOpenDialog();
  };

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
          data-testid="btn-open-sale-detail-form"
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Crear nuevo registro</span>
        </Button>
      </ToolTipTemplate>
      <Dialog open={openDialog} modal={false}>
        <DialogContent
          className="sm:max-w-[425px] h-[85vh] overflow-hidden max-w-[95vw]"
          onClick={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogClose
            onClick={handleCloseDialog}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            data-testid="btn-close-form-dialog"
          >
            <Cross2Icon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Venta a cliente</DialogTitle>
            <DialogDescription>
              Información detallada de la venta realizada al cliente
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[60vh] w-full py-2">
            <FormSaleDetailsFields />
          </ScrollArea>

          <DialogFooter>
            <Button
              type="submit"
              onClick={formSaleDetail.handleSubmit(onSubmitSaleDetail)}
              disabled={isSubmittingSaleDetail}
              data-testid="form-detail-submit-button"
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
