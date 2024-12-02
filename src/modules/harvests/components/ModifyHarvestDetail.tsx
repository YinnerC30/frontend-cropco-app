import { Cross2Icon } from '@radix-ui/react-icons';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useAppDispatch } from '@/redux/store';
import { toast } from 'sonner';

import { calculateTotal, modify } from '../utils/harvestSlice';

import { DialogClose } from '@radix-ui/react-dialog';
import { useFormHarvestContext } from '../hooks';

import { FormHarvestDetailsButtons } from './forms/harvest/details/FormHarvestDetailsButtons';
import { FormHarvestDetailsFields } from './forms/harvest/details/FormHarvestDetailsFields';
import { defaultValuesHarvestDetail } from './forms/harvest/FormHarvestContext';

export const ModifyHarvestDetail = () => {
  const dispatch = useAppDispatch();

  const {
    harvestDetail,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    getCurrentDataHarvestDetail,
    setHarvestDetail,
  } = useFormHarvestContext();

  const handleCloseDialog = () => {
    setIsOpenDialogModifyForm(false);
    setHarvestDetail(defaultValuesHarvestDetail);
  };

  const onSubmitHarvestDetail = () => {
    const values = getCurrentDataHarvestDetail();
    dispatch(
      modify({
        detail: { ...values, id: harvestDetail.id },
      })
    );
    dispatch(calculateTotal());
    handleCloseDialog();
    toast.success('Registro actualizado');
  };

  return (
    <Dialog
      open={isOpenDialogModifyForm}
      onOpenChange={setIsOpenDialogModifyForm}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose
          onClick={handleCloseDialog}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <Cross2Icon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Modificar</DialogTitle>
          <DialogDescription>
            Cuando termines de modificar la información, puedes cerrar esta
            ventana.
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
