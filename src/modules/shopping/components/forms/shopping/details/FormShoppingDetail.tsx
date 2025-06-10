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

import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';
import { formSchemaShoppingDetail } from '@/modules/shopping/utils';
import { z } from 'zod';
import { FormShoppingDetailsFields } from './FormShoppingDetailsFields';

export const FormShoppingDetail: React.FC = () => {
  const {
    readOnly,
    openDialog,
    setOpenDialog,
    shoppingDetail,
    handleOpenDialog,
    handleCloseDialog,
    resetShoppingDetail,
    formShoppingDetail,
    addShoppingDetail,

    modifyShoppingDetail,
  } = useFormShoppingContext();

  const onSubmitShoppingDetail = (
    values: z.infer<typeof formSchemaShoppingDetail>
  ) => {
    if (!shoppingDetail.id) {
      const record = {
        ...values,
        deletedDate: null,
        id: generateUUID(),
      };
      addShoppingDetail(record);
      toast.success('Registro añadido');
    } else {
      const record = { ...values, id: shoppingDetail.id };
      modifyShoppingDetail({ ...record, deletedDate: null });
      toast.success('Registro actualizado');
    }
    setOpenDialog(false);
  };

  const handleOpenDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    resetShoppingDetail();
    handleOpenDialog();
  };
  return (
    <>
      <ToolTipTemplate content={'Crear registro'}>
        <Button
          className={`${readOnly && 'hidden'} bg-primary/70 hover:bg-primary/50`}
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
            <DialogTitle>Compra a proveedores</DialogTitle>
            <DialogDescription className="">
              Información detallada de la compra realizada al proveedor
            </DialogDescription>
          </DialogHeader>

          <FormShoppingDetailsFields />

          <DialogFooter>
            <Button
              type="submit"
              onClick={formShoppingDetail.handleSubmit(onSubmitShoppingDetail)}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
