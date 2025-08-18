import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogCustomClose,
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
import { ScrollArea } from '@/components';

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
    isSubmittingShoppingDetail,
    modifyShoppingDetail,
  } = useFormShoppingContext();

  const onSubmitShoppingDetail = (
    values: z.infer<typeof formSchemaShoppingDetail>
  ) => {
    if (!shoppingDetail.id) {
      const record = {
        ...values,
        deletedDate: null,
        supply: { ...values.supply, deletedDate: null },
        supplier: { ...values.supplier, deletedDate: null },
        id: generateUUID(),
      };
      addShoppingDetail(record);
      toast.success('Registro añadido');
    } else {
      const record = {
        ...values,
        id: shoppingDetail.id,
        supply: { ...values.supply, deletedDate: null },
        supplier: { ...values.supplier, deletedDate: null },
      };
      modifyShoppingDetail({
        ...record,
        deletedDate: null,
      });
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
          className={`${
            readOnly && 'hidden'
          } bg-primary/70 hover:bg-primary/50`}
          size="icon"
          onClick={handleOpenDialogExtended}
          disabled={readOnly}
          data-testid="btn-open-shopping-detail-form"
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Crear nuevo registro</span>
        </Button>
      </ToolTipTemplate>
      <Dialog open={openDialog} modal={false}>
        <DialogContent
          className="sm:max-w-[425px] h-[85vh] overflow-hidden max-w-[95vw]"
          onClick={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogCustomClose handleClose={handleCloseDialog} />
          <DialogHeader>
            <DialogTitle>Compra a proveedores</DialogTitle>
            <DialogDescription className="">
              Información detallada de la compra realizada al proveedor
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[60vh] w-full py-2">
            <FormShoppingDetailsFields />
          </ScrollArea>

          <DialogFooter>
            <Button
              type="submit"
              onClick={formShoppingDetail.handleSubmit(onSubmitShoppingDetail)}
              disabled={isSubmittingShoppingDetail}
              data-testid="form-detail-submit-button"
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
