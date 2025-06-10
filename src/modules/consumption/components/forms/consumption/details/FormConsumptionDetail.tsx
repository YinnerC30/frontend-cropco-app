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
    validateAvailableStock,
    removeSupplyStock,
  } = useFormConsumptionContext();

  const onSubmitConsumptionDetail = (
    values: z.infer<typeof formSchemaConsumptionDetail>
  ) => {
    const result = validateAvailableStock({
      id: values.supply.id,
      name: values.supply?.name!,
      amount: values.amount,
      unit_of_measure: values.unit_of_measure,
      supply: values.supply,
    } as any);

    if (!result) return;
    if (!consumptionDetail.id) {
      const record = {
        ...values,
        deletedDate: null,
        id: generateUUID(),
      };
      removeSupplyStock({
        id: values.supply.id,
        name: values.supply?.name!,
        amount: values.amount,
        unit_of_measure: values.unit_of_measure,
        supply: values.supply,
      } as any);
      addConsumptionDetail(record);
      toast.success('Registro añadido');
    } else {
      const record = { ...values, id: consumptionDetail.id, deletedDate: null };
      removeSupplyStock({
        id: values.supply.id,
        name: values.supply?.name!,
        amount: values.amount,
        unit_of_measure: values.unit_of_measure,
        supply: values.supply,
      } as any);
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
          className="sm:max-w-[525px]"
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
            <DialogTitle>Consumo de sumistro</DialogTitle>
            <DialogDescription className="">
              Información detallada del consumo realizado al insumo por cultivo
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
