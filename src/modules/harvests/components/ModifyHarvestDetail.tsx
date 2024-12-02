import { Button } from '@/components/ui/button';

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
import { z } from 'zod';
import { useFormHarvestContext } from '../hooks';
import { formSchemaHarvestDetail } from '../utils';
import { FormHarvestDetailsProvider } from './forms/harvest/details/FormHarvestDetailsContext';
import { FormHarvestDetailsFields } from './forms/harvest/details/FormHarvestDetailsFields';
import { FormHarvestDetailsButtons } from './forms/harvest/details/FormHarvestDetailsButtons';

export const ModifyHarvestDetail = () => {
  const dispatch = useAppDispatch();

  const { harvestDetail, isOpenDialogModifyForm, setIsOpenDialogModifyForm } =
    useFormHarvestContext();

  const handleCloseDialog = () => {
    setIsOpenDialogModifyForm(false);
  };

  const onSubmitHarvestDetail = (
    values: z.infer<typeof formSchemaHarvestDetail>
  ) => {
    dispatch(
      modify({
        detail: { ...values, id: harvestDetail.id },
      })
    );
    dispatch(calculateTotal());
    toast.success('Registro actualizado');
  };

  return (
    <FormHarvestDetailsProvider onSubmit={onSubmitHarvestDetail}>
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
            <FormHarvestDetailsButtons />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormHarvestDetailsProvider>
  );
};
