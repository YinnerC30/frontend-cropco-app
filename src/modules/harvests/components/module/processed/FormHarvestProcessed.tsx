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
import {
  FormFieldCalendar,
  FormFieldInput,
  Loading,
  ToolTipTemplate,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks';
import {
  usePatchHarvestProcessed,
  usePostHarvestProcessed,
} from '@/modules/harvests/hooks';
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

export const FormHarvestProcessed: React.FC = memo(() => {
  const {
    queryOneHarvest: { data, isLoading },
    openDialog,
    setOpenDialog,
    harvestProcessed,
    setHarvestProcessed,
    actionsHarvestsModule,
  } = useHarvestProcessedContext();

  const formProcessed = useCreateForm({
    schema: formSchemaHarvestProcessed,
    defaultValues: harvestProcessed,
  });

  const handleOpenDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    formProcessed.reset();

    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    formProcessed.reset({ total: 0, date: undefined });
  };

  const mutationPostHarvestProcessed = usePostHarvestProcessed();
  const mutationPatchHarvestProcessed = usePatchHarvestProcessed();

  const onSubmitHarvestProcessed = async () => {
    const result = await formProcessed.trigger();

    if (!result) {
      return;
    }

    const isUpdate = !!harvestProcessed.id;

    const values = formProcessed.watch();

    const finalData = {
      ...values,
      total: +values.total,
      crop: {
        id: data?.crop.id,
      },
      harvest: {
        id: data?.id,
      },
    };

    if (isUpdate) {
      mutationPatchHarvestProcessed.mutate(
        { ...finalData, id: harvestProcessed.id },
        {
          onSuccess: () => {
            formProcessed.reset({ total: 0, date: undefined });
            setHarvestProcessed({
              date: undefined,
              total: 0,
              id: undefined,
            });

            setOpenDialog(false);
          },
        }
      );
    } else {
      mutationPostHarvestProcessed.mutate(finalData, {
        onSuccess: () => {
          formProcessed.reset({ total: 0, date: undefined });

          setOpenDialog(false);
        },
      });
    }
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
      <ToolTipTemplate content={'Crear registro'}>
        <Button
          variant="outline"
          size="icon"
          onClick={handleOpenDialogExtended}
          disabled={!actionsHarvestsModule['create_harvest_processed']}
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Crear nuevo registro</span>
        </Button>
      </ToolTipTemplate>

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
              Ingrese los datos solicitados para actualizar el monto al stock
              del cultivo
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
                  disabled={false}
                  conditionCalendar={{
                    before: new Date(data?.date!),
                    after: new Date(),
                  }}
                />
                <FormFieldInput
                  control={formProcessed.control}
                  description={formFieldsHarvestProcessed.total.description}
                  label={formFieldsHarvestProcessed.total.label}
                  name={'total'}
                  placeholder={formFieldsHarvestProcessed.total.placeholder}
                  disabled={false}
                  type="number"
                />
              </form>
            </Form>
          )}

          <DialogFooter>
            <Button
              onClick={onSubmitHarvestProcessed}
              disabled={
                mutationPostHarvestProcessed.isPending ||
                mutationPatchHarvestProcessed.isPending
              }
            >
              {mutationPostHarvestProcessed.isPending ||
                (mutationPatchHarvestProcessed.isPending && (
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                ))}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});
