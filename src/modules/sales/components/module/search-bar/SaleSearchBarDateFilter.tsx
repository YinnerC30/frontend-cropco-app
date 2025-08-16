import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components';
import { FormFieldCalendar, FormFieldSelect } from '@/modules/core/components';
import { ButtonCalendarFilter } from '@/modules/core/components/search-bar/ButtonCalendarFilter';
import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { TypeFilterDate } from '@/modules/core/interfaces';
import { dateFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import {
  formFieldsSearchBarSale,
  formSchemaSearchBarSale,
} from '@/modules/sales/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ParamQuerySale } from '../SaleModuleContext';
import { useState } from 'react';

interface Props {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarSale>,
    unknown
  >;
  onAddFilter: (
    filterName: keyof z.infer<typeof formSchemaSearchBarSale>
  ) => Promise<boolean>;
  onClearErrors: (
    filterName: keyof z.infer<typeof formSchemaSearchBarSale>
  ) => void;
  paramsQuery: ParamQuerySale;
}

export const SaleSearchBarDateFilter: React.FC<Props> = (props) => {
  const { formSearchBar, onAddFilter, onClearErrors, paramsQuery } = props;

  const [openPopoverDate, setOpenPopoverDate] = useState(false);

  const labelCalendarFilter =
    !formSearchBar.getValues('filter_by_date.date') ||
    !paramsQuery.filter_by_date?.date
      ? 'Filtrar por fecha'
      : formatTypeFilterDate(
          formSearchBar.getValues(
            'filter_by_date.type_filter_date'
          ) as TypeFilterDate
        ) +
        format(formSearchBar.getValues('filter_by_date.date') ?? '', 'PPP', {
          locale: es,
        });

  return (
    <Popover
      open={openPopoverDate}
      onOpenChange={(status) => {
        if (status) {
          setOpenPopoverDate(status);
        }
      }}
    >
      <PopoverTrigger>
        <ButtonCalendarFilter
          label={labelCalendarFilter}
          dataTestId="btn-filter-date"
        />
      </PopoverTrigger>

      <PopoverContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
          if (openPopoverDate) {
            setOpenPopoverDate(false);
          }
        }}
      >
        <FormFieldSelect
          items={dateFilterOptions}
          disabled={false}
          {...formFieldsSearchBarSale.type_filter_date}
          name="filter_by_date.type_filter_date"
          control={formSearchBar.control}
        />
        <FormFieldCalendar
          disabled={false}
          {...formFieldsSearchBarSale.date}
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
            data-testid={`button-filter-date-apply`}
          >
            Aplicar
          </Button>
          <Button
            variant={'destructive'}
            className="self-end w-24 mt-4"
            onClick={async () => {
              onClearErrors('filter_by_date');
              setOpenPopoverDate(false);
            }}
            data-testid={`button-filter-date-close`}
          >
            Cerrar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
