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

import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';
import { v4 as generateUUID } from 'uuid';

import { ToolTipTemplate } from '@/modules/core/components';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { calculateTotal } from '@/modules/harvests/utils/harvestSlice';
import { Plus } from 'lucide-react';

import { FormHarvestDetailsButtons } from './FormHarvestDetailsButtons';
import { FormHarvestDetailsFields } from './FormHarvestDetailsFields';
import { useDialogStatus } from '@/components/common/DialogStatusContext';

export const FormHarvestDetail = () => {
  const dispatch = useAppDispatch();
  const {
    readOnly,
    getCurrentDataHarvestDetail,
    openDialog,
    setOpenDialog,
    harvestDetail,
    handleOpenDialog,
    handleCloseDialog,
    resetHarvestDetail,
    resetForm,
    setHarvestDetail,
    form,
    detailsHarvest,
    setDetailsHarvest,
    modifyHarvestDetail,
  } = useFormHarvestContext();

  const { setIsActiveDialog } = useDialogStatus();

  const onSubmitHarvestDetail = () => {
    const values = getCurrentDataHarvestDetail();
    if (!harvestDetail.id) {
      const record = {
        ...values,
        id: generateUUID(),
      };
      setDetailsHarvest((prev: any) => [...prev, record]);
      form.setValue('details', [...detailsHarvest, record], {
        shouldValidate: true,
        shouldDirty: true,
      });
      // resetForm();
      toast.success('Registro añadido');
    } else {
      modifyHarvestDetail({ ...values, id: harvestDetail.id });
      // setHarvestDetail({ ...values, id: harvestDetail.id });
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
    resetHarvestDetail();
    handleOpenDialog();
  };

  console.log(openDialog);

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
            <DialogTitle>Cosecha empleado</DialogTitle>
            <DialogDescription className="">
              Información detallada de la cosecha realizada por el empleado
            </DialogDescription>
          </DialogHeader>

          <FormHarvestDetailsFields />

          <DialogFooter>
            <FormHarvestDetailsButtons onClick={onSubmitHarvestDetail} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
