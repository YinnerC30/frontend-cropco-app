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
  DialogTrigger,
} from '@/components/ui/dialog';

import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';
import { v4 as generateUUID } from 'uuid';

import { useFormHarvestContext } from '../../../hooks';
import { add, calculateTotal, modify } from '../../../utils/harvestSlice';
import { FormHarvestDetailsButtons } from './details/FormHarvestDetailsButtons';

import { FormHarvestDetailsFields } from './details/FormHarvestDetailsFields';

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
  } = useFormHarvestContext();

  const onSubmitHarvestDetail = () => {
    const values = getCurrentDataHarvestDetail();
    if (!harvestDetail.id) {
      dispatch(
        add([
          {
            ...values,
            id: generateUUID(),
          },
        ])
      );
      resetForm();
      toast.success('Registro añadido');
    } else {
      dispatch(
        modify({
          detail: { ...values, id: harvestDetail.id },
        })
      );
      setHarvestDetail({ ...values, id: harvestDetail.id });
      toast.success('Registro actualizado');
    }
    dispatch(calculateTotal());
  };

  const handleOpenDialogExtended = () => {
    resetHarvestDetail();
    handleOpenDialog();
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={false}>
      <DialogTrigger asChild>
        <Button
          className={`block my-2 ml-1 ${readOnly && 'hidden'}`}
          onClick={() => handleOpenDialogExtended()}
          disabled={readOnly}
        >
          Añadir
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogClose
          onClick={() => handleCloseDialog()}
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
  );
};
