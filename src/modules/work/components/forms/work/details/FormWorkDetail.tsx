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
import { FormWorkDetailsButtons } from './FormWorkDetailsButtons';
import { FormWorkDetailsFields } from './FormWorkDetailsFields';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';

export const FormWorkDetail = () => {
  const {
    readOnly,
    getCurrentDataWorkDetail,
    openDialog,
    setOpenDialog,
    workDetail,
    handleOpenDialog,
    handleCloseDialog,
    resetWorkDetail,
    form,
    detailsWork,
    setDetailsWork,
    modifyWorkDetail,
  } = useFormWorkContext();

  const { setIsActiveDialog } = useDialogStatus();

  const onSubmitWorkDetail = () => {
    const values = getCurrentDataWorkDetail();
    if (!workDetail.id) {
      const record = {
        ...values,
        id: generateUUID(),
      };
      setDetailsWork((prev: any) => [...prev, record]);
      form.setValue('details', [...detailsWork, record], {
        shouldValidate: true,
        shouldDirty: true,
      });

      toast.success('Registro añadido');
    } else {
      modifyWorkDetail({ ...values, id: workDetail.id });
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
    resetWorkDetail();
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
            <DialogTitle>Cosecha empleado</DialogTitle>
            <DialogDescription className="">
              Información detallada de la cosecha realizada por el empleado
            </DialogDescription>
          </DialogHeader>

          <FormWorkDetailsFields />

          <DialogFooter>
            <FormWorkDetailsButtons onClick={onSubmitWorkDetail} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
