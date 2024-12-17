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

import { useDialogStatus } from '@/components/common/DialogStatusContext';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { FormConsumptionDetailsButtons } from './FormConsumptionDetailsButtons';
import { FormConsumptionDetailsFields } from './FormConsumptionDetailsFields';

export const FormConsumptionDetail = () => {
  const {
    readOnly,
    getCurrentDataConsumptionDetail,
    openDialog,
    setOpenDialog,
    consumptionDetail,
    handleOpenDialog,
    handleCloseDialog,
    resetConsumptionDetail,
    form,
    detailsConsumption,
    setDetailsConsumption,
    modifyConsumptionDetail,
  } = useFormConsumptionContext();

  const { setIsActiveDialog } = useDialogStatus();

  const onSubmitConsumptionDetail = () => {
    const values = getCurrentDataConsumptionDetail();
    if (!consumptionDetail.id) {
      const record = {
        ...values,
        id: generateUUID(),
      };
      setDetailsConsumption((prev: any) => [...prev, record]);
      form.setValue('details', [...detailsConsumption, record], {
        shouldValidate: true,
        shouldDirty: true,
      });

      toast.success('Registro añadido');
    } else {
      const record = { ...values, id: consumptionDetail.id };
      modifyConsumptionDetail(record);
      toast.success('Registro actualizado');
    }

    setIsActiveDialog(false);
    setOpenDialog(false);
    form.trigger('details');
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
            <FormConsumptionDetailsButtons
              onClick={onSubmitConsumptionDetail}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
