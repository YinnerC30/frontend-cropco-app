import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components';
import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { TypeFilterDate } from '@/modules/core/interfaces';
import { dateFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formFieldsSearchBarShopping } from '../../../utils/formFieldsSearchBarShopping';
import { formSchemaSearchBarShopping } from '../../../utils/formSchemaSearchBarShopping';
import { ParamQueryShopping } from '../ShoppingModuleContext';
import { FormFieldSelect, FormFieldCalendar } from '@/modules/core/components';

interface ShoppingSearchBarDateFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarShopping>,
    unknown
  >;
  onAddFilter: (
    name: keyof z.infer<typeof formSchemaSearchBarShopping>
  ) => Promise<boolean>;
  onClearErrors: (
    name: keyof z.infer<typeof formSchemaSearchBarShopping>
  ) => void;
  paramsQuery: ParamQueryShopping;
}

export const ShoppingSearchBarDateFilter: React.FC<
  ShoppingSearchBarDateFilterProps
> = ({ formSearchBar, onAddFilter, onClearErrors, paramsQuery }) => {
  const [openPopoverDate, setOpenPopoverDate] = useState(false);

  return (
    <Popover open={openPopoverDate} onOpenChange={setOpenPopoverDate}>
      <PopoverTrigger asChild>
        <Button
          className="w-auto lg:w-[300px]"
          variant={'outline'}
          onClick={() => setOpenPopoverDate(true)}
        >
          {!formSearchBar.getValues('filter_by_date.date') ||
          !paramsQuery.filter_by_date?.date
            ? 'Filtrar por fecha'
            : formatTypeFilterDate(
                formSearchBar.getValues(
                  'filter_by_date.type_filter_date'
                ) as TypeFilterDate
              ) +
              format(
                formSearchBar.getValues('filter_by_date.date') ?? '',
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
          disabled={false}
          {...formFieldsSearchBarShopping.type_filter_date}
          name="filter_by_date.type_filter_date"
          control={formSearchBar.control}
        />
        <FormFieldCalendar
          disabled={false}
          {...formFieldsSearchBarShopping.date}
          control={formSearchBar.control}
          name="filter_by_date.date"
          className="w-[95%]"
        />
        <div className="flex justify-center gap-2">
          <Button
            className="self-end w-24 mt-4"
            onClick={async (e) => {
              e.preventDefault();
              const result = await onAddFilter('filter_by_date');
              setOpenPopoverDate(!result);
            }}
          >
            Aplicar
          </Button>
          <Button
            variant={'destructive'}
            className="self-end w-24 mt-4"
            onClick={() => {
              setOpenPopoverDate(false);
              onClearErrors('filter_by_date');
            }}
          >
            Cerrar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
