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

import { useFormHarvestContext } from '../../hooks';
import { add, calculateTotal } from '../../utils/harvestSlice';
import { FormHarvestDetailsButtons } from './harvest/details/FormHarvestDetailsButtons';

import { FormHarvestDetailsFields } from './harvest/details/FormHarvestDetailsFields';

export const CreateHarvestDetail = () => {
  const dispatch = useAppDispatch();
  const { readOnly, getCurrentDataHarvestDetail, resetForm } =
    useFormHarvestContext();

  const onSubmitHarvestDetail = () => {
    const values = getCurrentDataHarvestDetail();
    dispatch(
      add([
        {
          ...values,
          id: generateUUID(),
        },
      ])
    );
    dispatch(calculateTotal());
    resetForm();
    toast.success('Registro añadido');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`block my-2 ml-1 ${readOnly && 'hidden'}`}
          disabled={readOnly}
        >
          Añadir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Cross2Icon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Agregar cosecha empleado</DialogTitle>
          <DialogDescription className="">
            Cuando termines de agregar la información, puedes cerrar esta
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
