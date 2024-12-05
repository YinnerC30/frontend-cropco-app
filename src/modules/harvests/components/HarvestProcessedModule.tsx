import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';

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

import {
  FormFieldCalendar,
  FormFieldInput,
  Loading,
  ToolTipTemplate,
} from '@/modules/core/components';
import { Plus } from 'lucide-react';

import {
  Badge,
  Form,
  Input,
  ScrollArea,
  Separator,
  Textarea,
} from '@/components';
import { CalendarIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetHarvest } from '../hooks/queries/useGetHarvest';
import columnsHarvestProcessed from './columns/ColumnsTableHarvestProcessed';

import { cn } from '@/lib/utils';
import { BreadCrumb } from '@/modules/core/components/';
import {
  FormDataTableButtonsPagination,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from '@/modules/core/helpers/formatting/FormatNumber';
import { useCreateForm } from '@/modules/core/hooks';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { usePostHarvestProcessed } from '../hooks';
import { MODULE_HARVESTS_PATHS } from '../routes/pathRoutes';
import { formFieldsHarvest } from '../utils';
import { formFieldsHarvestProcessed } from '../utils/formFieldsHarvestProcessed';

const formSchemaHarvestProcessed = z.object({
  date: z.date({ required_error: 'La fecha es un campo obligatorio' }),
  total: z.coerce
    .number({
      required_error: `El total es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: `El número debe ser positivo` }),
});

export const HarvestProcessedModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetHarvest(id!);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Usar codigo largo
  const formProcessed = useCreateForm({
    schema: formSchemaHarvestProcessed,
    defaultValues: {
      date: undefined,
      total: undefined,
    },
  });

  const { isPending, mutate } = usePostHarvestProcessed();

  // Usar codigo largo
  // const { table, lengthColumns } = useDataTableGeneric({
  //   columns: columnsHarvestProcessed,
  //   data: [],
  // });

  const onSubmitHarvestProcessed = () => {
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
    mutate(finalData);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[
          { link: MODULE_HARVESTS_PATHS.ViewAll, name: 'Cosechas' },
          {
            link: `${MODULE_HARVESTS_PATHS.ViewAll}${data.id}`,
            name: `${data.crop.name} | ${format(
              ConvertStringToDate(data.date),
              'PPP',
              {
                locale: es,
              }
            )}`,
          },
        ]}
        finalItem={`Inventario`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <div className="flex flex-col gap-2 ml-1">
          <div>
            <h3 className="block mb-1">Fecha de la cosecha:</h3>

            <Button
              variant={'outline'}
              className={cn(
                'mt-2 w-[200px] pl-3 text-left font-normal',
                !data.date && 'text-muted-foreground'
              )}
              disabled
            >
              {data.date ? (
                format(`${data.date}T00:00:00-05:00`, 'PPP', { locale: es })
              ) : (
                <span>Selecciona una fecha</span>
              )}
              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
            </Button>
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.date.description}
            </p>
          </div>
          <div>
            <h3>Cultivo:</h3>
            <Input
              className="w-40 mt-2 text-neutral-500"
              value={data.crop.name}
              readOnly
            />
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.crop.description}
            </p>
          </div>

          <div>
            <h3>Total:</h3>
            <Input
              className="w-40 mt-2 text-neutral-500"
              value={FormatNumber(data.total)}
              readOnly
            />
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.total.description}
            </p>
          </div>
          <div>
            <h3>Valor a pagar:</h3>
            <Input
              className="w-40 mt-2 text-neutral-500"
              value={FormatMoneyValue(data.value_pay)}
              readOnly
            />
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.value_pay.description}
            </p>
          </div>
          <div>
            <h3>Observación:</h3>
            <Textarea
              value={data.observation}
              className="resize-none w-80 text-neutral-500"
              placeholder="Ninguna"
              rows={3}
              readOnly
            />
            <p className="text-[0.8rem] text-muted-foreground">
              {formFieldsHarvest.observation.description}
            </p>
          </div>
        </div>

        <Separator className="my-4" />
        <h3>
          A continuación registre de forma individual la cosecha procesada que
          ha salido hasta el momento:
        </h3>

        {/* Dialog */}
        <>
          <ToolTipTemplate content={'Crear registro'}>
            <Button
              variant="outline"
              size="icon"
              onClick={handleOpenDialogExtended}
              // disabled={readOnly}
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
                <DialogTitle>Cosecha empleado</DialogTitle>
                <DialogDescription className="">
                  Información detallada de la cosecha realizada por el empleado
                </DialogDescription>
              </DialogHeader>

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
                    description={'Total'}
                    label={'Total'}
                    name={'total'}
                    placeholder={formFieldsHarvestProcessed.total.placeholder}
                    readOnly={false}
                    type="number"
                  />
                </form>
              </Form>

              <DialogFooter>
                <Button onClick={onSubmitHarvestProcessed} disabled={false}>
                  {isPending && (
                    <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Guardar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
        {/* Fin Dialog */}

        {/* DataTable */}
        {/* <div className="w-[800px]">
          <FormDataTableProvider
            table={table}
            disabledDoubleClick={false}
            errorMessage={'Esta vaina tiene errores!!'}
            lengthColumns={lengthColumns}
          >
            <div className="flex justify-between my-2">
              <div className="flex flex-col gap-2">
                <FormDataTableRowCount />
                <FormDataTableRowSelection />
              </div>
              <FormDataTableSelectPageSize />
            </div>
            <FormDataTable onCellDoubleClick={(data) => console.log(data)} />
            <FormDataTableButtonsPagination />
            <FormDataTablePageCount />
          </FormDataTableProvider>
        </div> */}

        <div>
          <h3>Total de cosecha procesada:</h3>
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(data.total_processed)}
          </Badge>
          <p className="text-[0.8rem] text-muted-foreground">
            {formFieldsHarvest.total_processed.description}
          </p>
        </div>

        <Button className="mt-2" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </ScrollArea>
    </>
  );
};
export default HarvestProcessedModule;
