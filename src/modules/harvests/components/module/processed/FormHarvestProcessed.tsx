import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
} from '@/components';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import {
  FormFieldCalendar,
  FormFieldInput,
  Loading,
  ToolTipTemplate,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks';
import { usePostHarvestProcessed } from '@/modules/harvests/hooks';
import { formFieldsHarvestProcessed } from '@/modules/harvests/utils/formFieldsHarvestProcessed';

import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';

import { Plus } from 'lucide-react';
import { memo, useEffect } from 'react';

import { ConvertStringToDate } from '@/modules/core/helpers';
import { z } from 'zod';
import { useHarvestProcessedContext } from './HarvestProcessedContext';

const formSchemaHarvestProcessed = z.object({
  date: z.date({ required_error: 'La fecha es un campo obligatorio' }),
  total: z.coerce
    .number({
      required_error: `El total es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: `El número debe ser positivo` }),
});

export const FormHarvestProcessed = memo(() => {
  const { data, isLoading, openDialog, setOpenDialog, harvestProcessed } =
    useHarvestProcessedContext();

  const formProcessed = useCreateForm({
    schema: formSchemaHarvestProcessed,
    defaultValues: harvestProcessed,
  });

  const { setIsActiveDialog } = useDialogStatus();

  const handleOpenDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    formProcessed.reset();
    setIsActiveDialog(true);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsActiveDialog(false);
    setOpenDialog(false);
    formProcessed.reset({ total: 0, date: undefined });
  };

  const { isPending, mutate } = usePostHarvestProcessed();

  const onSubmitHarvestProcessed = async () => {
    const result = await formProcessed.trigger();
    if (!result) {
      return;
    }
    const values = formProcessed.watch();
    const finalData = {
      ...values,
      total: +values.total,
      crop: {
        id: data.crop.id,
      },
      harvest: {
        id: data.id,
      },
    };
    mutate(finalData, {
      onSuccess: () => {
        formProcessed.reset({ total: 0, date: undefined });
      },
    });
  };

  useEffect(() => {
    formProcessed.reset({
      date:
        typeof harvestProcessed.date === 'string'
          ? ConvertStringToDate(harvestProcessed?.date)
          : harvestProcessed.date,
      total: harvestProcessed.total,
    });
  }, [harvestProcessed]);

  return (
    <div>
      <div className="w-[600px] flex justify-end mt-2">
        <ToolTipTemplate content={'Crear registro'}>
          <Button
            variant="outline"
            size="icon"
            onClick={handleOpenDialogExtended}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Crear nuevo registro</span>
          </Button>
        </ToolTipTemplate>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={false}>
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
            <DialogTitle>Cosecha procesada</DialogTitle>
            <DialogDescription className="">
              Ingrese los datos solicitados para agregar el monto al stock del
              cultivo
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <Loading />
          ) : (
            <Form {...formProcessed}>
              <form className="z-50 mx-5" id="myform">
                <FormFieldCalendar
                  control={formProcessed.control}
                  description={formFieldsHarvestProcessed.date.description}
                  label={formFieldsHarvestProcessed.date.label}
                  name={'date'}
                  placeholder={formFieldsHarvestProcessed.date.placeholder}
                  readOnly={false}
                />
                <FormFieldInput
                  control={formProcessed.control}
                  description={formFieldsHarvestProcessed.total.description}
                  label={formFieldsHarvestProcessed.total.label}
                  name={'total'}
                  placeholder={formFieldsHarvestProcessed.total.placeholder}
                  readOnly={false}
                  type="number"
                />
              </form>
            </Form>
          )}

          <DialogFooter>
            <Button onClick={onSubmitHarvestProcessed} disabled={isPending}>
              {isPending && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});
