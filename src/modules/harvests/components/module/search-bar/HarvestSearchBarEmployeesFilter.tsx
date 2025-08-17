import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components';
import { ButtonRefetchData, Loading } from '@/modules/core/components';
import { CapitalizeFirstWord } from '@/auth/helpers';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarHarvest } from '../../../utils/formSchemaSearchBarHarvest';

interface HarvestSearchBarEmployeesFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarHarvest>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  queryEmployees: any;
  disabled?: boolean;
}

interface Employee {
  id?: string | undefined;
  full_name?: string | undefined;
}

// Hook personalizado para manejar la lógica del popover
const usePopoverState = () => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setOpenPopover(open);
  }, []);

  return {
    openPopover,
    handleOpenChange,
  };
};

// Hook personalizado para manejar la lógica de selección de empleados
const useEmployeeSelection = (
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarHarvest>,
    unknown
  >,
  setOpenPopover: (open: boolean) => void
) => {
  const currentEmployees = formSearchBar.watch('employees') || [];

  const handleEmployeeSelect = useCallback(
    (employee: Employee, field: ControllerRenderProps<any, any>) => {
      const isSelected = field?.value?.some(
        (item: Employee) => item.id === employee.id
      );

      if (isSelected) {
        // Remover empleado si ya está seleccionado
        formSearchBar.setValue(
          'employees',
          field?.value?.filter((item: Employee) => item.id !== employee.id),
          {
            shouldValidate: true,
            shouldDirty: true,
          }
        );
      } else {
        // Agregar empleado si no está seleccionado
        formSearchBar.setValue(
          'employees',
          [
            ...currentEmployees,
            {
              id: employee.id,
              full_name: employee.full_name,
            },
          ],
          {
            shouldValidate: true,
            shouldDirty: true,
          }
        );
      }
      setOpenPopover(false);
    },
    [formSearchBar, currentEmployees, setOpenPopover]
  );

  return {
    currentEmployees,
    handleEmployeeSelect,
  };
};

// Función utilitaria para renderizar el botón de trigger
const renderTriggerButton = (
  field: ControllerRenderProps<any, any>,
  openPopover: boolean,
  currentEmployees: Employee[],
  queryEmployees: any,
  disabled: boolean
) => {
  if (queryEmployees.isLoading || queryEmployees.isFetching) {
    return (
      <div className="w-[200px]">
        <Loading className="" />
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={openPopover}
      className={cn('justify-between', !field.value && 'text-muted-foreground')}
      ref={field.ref}
      onBlur={field.onBlur}
      disabled={disabled}
      data-testid="btn-open-command-employee"
    >
      {field.value.length > 0 && !!queryEmployees.data
        ? `${currentEmployees.length} seleccionado(s)`
        : 'Selecciona empleados'}

      <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
    </Button>
  );
};

// Función utilitaria para renderizar la lista de empleados
const renderEmployeeList = (
  queryEmployees: any,
  field: ControllerRenderProps<any, any>,
  handleEmployeeSelect: (
    employee: Employee,
    field: ControllerRenderProps<any, any>
  ) => void
) => {
  return queryEmployees?.data?.records.map((item: any, index: number) => (
    <CommandItem
      value={item?.['full_name']}
      key={item.id!}
      data-testid={`form-field-command-item-${index}`}
      onSelect={() => handleEmployeeSelect(item, field)}
    >
      <div className="">{item?.['full_name']}</div>
      <CheckIcon
        className={cn(
          'ml-auto h-4 w-4',
          field?.value.some((i: Employee) => i.id === item?.id)
            ? 'opacity-100'
            : 'opacity-0'
        )}
      />
    </CommandItem>
  ));
};

// Función utilitaria para manejar el refetch de datos
const handleRefetchEmployees = async (queryEmployees: any) => {
  await queryEmployees.refetch();
};

export const HarvestSearchBarEmployeesFilter: React.FC<
  HarvestSearchBarEmployeesFilterProps
> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  queryEmployees,
  disabled = false,
}) => {
  const { openPopover, handleOpenChange } = usePopoverState();
  const { currentEmployees, handleEmployeeSelect } = useEmployeeSelection(
    formSearchBar,
    handleOpenChange
  );

  return (
    <FilterDropdownItem
      label={'Empleados'}
      className="lg:w-[280px]"
      actionOnSave={() => onAddFilter('employees')}
      actionOnClose={() => onClearErrors('employees')}
      dataTestId="filter-employees"
      content={
        <FormField
          control={formSearchBar.control}
          name={`employees`}
          render={({ field }: { field: ControllerRenderProps<any, any> }) => (
            <FormItem className="">
              <FormLabel className="block my-2">
                {'Empleados involucrados:'}
              </FormLabel>
              <Popover
                open={openPopover}
                onOpenChange={handleOpenChange}
                modal={true}
              >
                <div className="flex flex-wrap gap-2">
                  <PopoverTrigger asChild>
                    <FormControl>
                      {renderTriggerButton(
                        field,
                        openPopover,
                        currentEmployees,
                        queryEmployees,
                        disabled
                      )}
                    </FormControl>
                  </PopoverTrigger>
                  <ButtonRefetchData
                    onClick={() => handleRefetchEmployees(queryEmployees)}
                    disabled={false}
                    content="Actualizar datos de empleados involucrados"
                  />
                </div>
                <PopoverContent
                  className="w-[200px] p-0"
                  onPointerDownOutside={(e) => {
                    e.preventDefault();
                  }}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <Command>
                    <CommandInput
                      placeholder={`Buscar empleado...`}
                      className="h-9"
                    />
                    <CommandList>
                      <ScrollArea className="w-auto h-56 p-1 pr-2">
                        <CommandEmpty>{`${CapitalizeFirstWord(
                          'empleado'
                        )} no encontrado`}</CommandEmpty>
                        <CommandGroup>
                          {renderEmployeeList(
                            queryEmployees,
                            field,
                            handleEmployeeSelect
                          )}
                        </CommandGroup>
                      </ScrollArea>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {
                  'Empleado(s) que han participado en el trabajo de cosecha en el cultivo'
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      }
    />
  );
};
