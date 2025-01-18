import { Button, Form, PopoverContent, PopoverTrigger } from '@/components';
import {
  FormFieldCalendar,
  FormFieldSelect,
  ToolTipTemplate,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { TypeFilterDate } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, X } from 'lucide-react';
import React, { useState } from 'react';

import { dateFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { Popover } from '@radix-ui/react-popover';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarConsumption } from '../../utils/formFieldsSearchBarConsumption';
import { formSchemaSearchBarConsumption } from '../../utils/formSchemaSearchBarConsumption';

export const ConsumptionModuleSearchbar: React.FC = () => {
  const { paramsQuery, actionsConsumptionsModule } =
    useConsumptionModuleContext();
  const readOnly = !actionsConsumptionsModule['find_all_supplies_consumption'];
  const navigate = useNavigate();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarConsumption>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarConsumption,
    defaultValues: paramsQuery,
    skiptDirty: true,
    validationMode: 'onSubmit',
  });

  const [openPopover, setOpenPopover] = useState(false);

  const handleAddFilter = async (
    name: keyof z.infer<typeof formSchemaSearchBarConsumption>
  ) => {
    const isValid = await form.trigger(name);
    if (!isValid) return false;

    await handleSearch(form.watch());
    return true;
  };

  const handleClearErrorsForm = (
    name: keyof z.infer<typeof formSchemaSearchBarConsumption>
  ) => {
    form.clearErrors(name);
    form.resetField(name);
  };

  const handleSearch = async (
    values: z.infer<typeof formSchemaSearchBarConsumption>
  ) => {
    const params = new URLSearchParams();

    if (values.filter_by_date.type_filter_date && values.filter_by_date.date) {
      params.append('filter_by_date', 'true');
      params.append(
        'type_filter_date',
        `${values.filter_by_date.type_filter_date}`
      );
      params.append('date', values.filter_by_date.date.toISOString());
    }

    navigate(`?${params.toString()}`);
  };

  const handleResetForm = () => {
    form.reset(
      {
        filter_by_date: {
          date: undefined,
          type_filter_date: TypeFilterDate.after,
        },
      },
      {
        keepErrors: false,
        keepDirty: false,
      }
    );
    navigate(MODULE_CONSUMPTION_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  return (
    <div className="flex flex-col items-start justify-start my-4 sm:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          id="formSearch"
          className="flex flex-col w-full"
        >
          <div className="flex flex-col items-center justify-center  md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button
                    className="w-auto lg:w-[300px]"
                    variant={'outline'}
                    onClick={() => setOpenPopover(true)}
                  >
                    {!form.getValues('filter_by_date.date') ||
                    !paramsQuery.filter_by_date?.date
                      ? 'Filtrar por fecha'
                      : formatTypeFilterDate(
                          form.getValues(
                            'filter_by_date.type_filter_date'
                          ) as TypeFilterDate
                        ) +
                        format(
                          form.getValues('filter_by_date.date') ?? '',
                          'PPP',
                          {
                            locale: es,
                          }
                        )}
                    <Calendar className="w-4 h-4 ml-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <FormFieldSelect
                    items={dateFilterOptions}
                    readOnly={false}
                    {...formFieldsSearchBarConsumption.type_filter_date}
                    name="filter_by_date.type_filter_date"
                    control={form.control}
                  />
                  <FormFieldCalendar
                    readOnly={false}
                    {...formFieldsSearchBarConsumption.date}
                    control={form.control}
                    name="filter_by_date.date"
                    className="w-[95%]"
                  />
                  <div className="flex justify-center gap-2">
                    <Button
                      className="self-end w-24 mt-4"
                      onClick={async (e) => {
                        e.preventDefault();
                        const result = await handleAddFilter('filter_by_date');
                        setOpenPopover(!result);
                      }}
                    >
                      Aplicar
                    </Button>
                    <Button
                      variant={'destructive'}
                      className="self-end w-24 mt-4"
                      onClick={() => {
                        setOpenPopover(false);
                        handleClearErrorsForm('filter_by_date');
                      }}
                    >
                      Cerrar
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <ToolTipTemplate content="Borrar consulta">
                <Button
                  variant="outline"
                  onClick={handleResetForm}
                  size={'icon'}
                  disabled={readOnly}
                >
                  <X className="w-4 h-4" />
                </Button>
              </ToolTipTemplate>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
