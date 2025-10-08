import { Button, Popover, PopoverAnchor, PopoverContent } from '@/components';
import { FormFieldCalendar, FormFieldSelect } from '@/modules/core/components';
import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { TypeFilterDate } from '@/modules/core/interfaces';
import { dateFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formFieldsSearchBarShopping } from '../../../utils/formFieldsSearchBarShopping';
import { formSchemaSearchBarShopping } from '../../../utils/formSchemaSearchBarShopping';
import { ParamQueryShopping } from '../ShoppingModuleContext';

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
              {...formFieldsSearchBarShopping.type_filter_date}
              name="filter_by_date.type_filter_date"
              control={formSearchBar.control}
            />
            <FormFieldCalendar
              disabled={false}
              {...formFieldsSearchBarShopping.date}
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
