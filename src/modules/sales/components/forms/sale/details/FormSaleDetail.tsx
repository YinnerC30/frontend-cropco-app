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

import { Form } from '@/components';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import { useFormSaleContext } from '@/modules/sales/hooks';
import { formSchemaSaleDetails } from '@/modules/sales/utils';
import { z } from 'zod';
import { FormSaleDetailsFields } from './FormSaleDetailsFields';

export const FormSaleDetail = () => {
  const {
    readOnly,
    openDialog,
    setOpenDialog,
    saleDetail,
    handleOpenDialog,
    handleCloseDialog,
    resetSaleDetail,
    addSaleDetail,
    modifySaleDetail,
    formSaleDetail,
  } = useFormSaleContext();

  const { setIsActiveDialog } = useDialogStatus();

  const onSubmitSaleDetail = (
    // values: any
    values: z.infer<typeof formSchemaSaleDetails>
  ) => {
    console.log('entro');
    if (!saleDetail.id) {
      const record = {
        ...values,
        id: generateUUID(),
      };
      addSaleDetail(record);
      toast.success('Registro añadido');
    } else {
      const record = {
        ...values,
        id: saleDetail.id,
      };
      modifySaleDetail(record);
      toast.success('Registro actualizado');
    }

    setIsActiveDialog(false);
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
        <Form {...formSaleDetail}>
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
              <DialogTitle>Venta a cliente</DialogTitle>
              <DialogDescription className="">
                Información detallada de la venta realizada al cliente
              </DialogDescription>
            </DialogHeader>

            <FormSaleDetailsFields action={onSubmitSaleDetail} />

            <DialogFooter>
              <Button type="submit" form="formSaleDetail">
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Form>
      </Dialog>
    </>
  );
};
