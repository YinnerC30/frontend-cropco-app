import { Button, Popover, PopoverContent, PopoverAnchor } from '@/components';
import { FormFieldCalendar, FormFieldSelect } from '@/modules/core/components';
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
import { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';

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
  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const handleApplyFilter = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result = await onAddFilter('filter_by_date');
    if (result) {
      setOpenPopoverDate(false);
    }
  };

  const handleCloseFilter = () => {
    onClearErrors('filter_by_date');
    setOpenPopoverDate(false);
  };

  const handleOpenPopover = () => {
    console.log('Abriendo popover desde botón completamente externo');

    // Calcular posición del botón para posicionar el popover
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setAnchorPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    setOpenPopoverDate(true);
  };

  return (
    <>
      {/* Botón COMPLETAMENTE fuera del Popover */}
      <Button
        ref={buttonRef}
        className="w-auto lg:w-[300px]"
        variant="outline"
        data-testid="btn-filter-date"
        onClick={handleOpenPopover}
      >
        {labelCalendarFilter}
        <Calendar className="w-4 h-4 ml-4" />
      </Button>

      {/* Popover completamente separado */}
      <Popover open={openPopoverDate} onOpenChange={setOpenPopoverDate}>
        {/* PopoverAnchor invisible posicionado donde está el botón */}
        <PopoverAnchor asChild>
          <div
            className="absolute w-0 h-0 opacity-0 pointer-events-none"
            style={{
              top: `${anchorPosition.top}px`,
              left: `${anchorPosition.left}px`,
            }}
          />
        </PopoverAnchor>

        <PopoverContent
          className="p-4 w-80"
          align="start"
          sideOffset={4}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            setOpenPopoverDate(false);
          }}
        >
          <div className="space-y-4">
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
              className="w-full"
            />
            <div className="flex justify-center gap-2">
              <Button
                className="self-end w-24"
                onClick={handleApplyFilter}
                data-testid="button-filter-date-apply"
              >
                Aplicar
              </Button>
              <Button
                variant="destructive"
                className="self-end w-24"
                onClick={handleCloseFilter}
                data-testid="button-filter-date-close"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
