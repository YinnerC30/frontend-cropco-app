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
import React, { useState } from 'react';
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

export const HarvestSearchBarEmployeesFilter: React.FC<HarvestSearchBarEmployeesFilterProps> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  queryEmployees,
  disabled = false,
}) => {
  const [openPopover, setOpenPopover] = useState(false);

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
          render={({
            field,
          }: {
            field: ControllerRenderProps<any, any>;
          }) => {
            const currentEmployees = formSearchBar.watch('employees');

            return (
              <FormItem className="">
                <FormLabel className="block my-2">
                  {'Empleados involucrados:'}
                </FormLabel>
                <Popover
                  open={openPopover}
                  onOpenChange={setOpenPopover}
                  modal={true}
                >
                  <div className="flex flex-wrap gap-2">
                    <PopoverTrigger asChild>
                      <FormControl>
                        {queryEmployees.isLoading || queryEmployees.isFetching ? (
                          <div className="w-[200px]">
                            <Loading className="" />
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openPopover}
                            className={` ${cn(
                              'justify-between',
                              !field.value && 'text-muted-foreground'
                            )}`}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            disabled={disabled}
                            data-testid={`btn-open-command-employee`}
                          >
                            {field.value.length > 0 && !!queryEmployees.data
                              ? `${currentEmployees!.length} seleccionado(s)`
                              : 'Selecciona empleados'}

                            <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        )}
                      </FormControl>
                    </PopoverTrigger>
                    <ButtonRefetchData
                      onClick={async () => {
                        await queryEmployees.refetch();
                      }}
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
                            {queryEmployees?.data?.records.map((item: any, index: number) => {
                              return (
                                <CommandItem
                                  value={item?.['full_name']}
                                  key={item.id!}
                                  data-testid={`form-field-command-item-${index}`}
                                  onSelect={() => {
                                    if (
                                      field?.value?.some((i: any) => i.id === item?.id)
                                    ) {
                                      formSearchBar.setValue(
                                        'employees',
                                        [
                                          ...field?.value?.filter(
                                            (i: any) => i.id !== item?.id
                                          ),
                                        ],
                                        {
                                          shouldValidate: true,
                                          shouldDirty: true,
                                        }
                                      );
                                    } else {
                                      formSearchBar.setValue(
                                        'employees',
                                        [
                                          ...(currentEmployees || []),
                                          {
                                            id: item.id,
                                            full_name: item['full_name'],
                                          },
                                        ],
                                        {
                                          shouldValidate: true,
                                          shouldDirty: true,
                                        }
                                      );
                                    }
                                    setOpenPopover(false);
                                  }}
                                >
                                  <div className="">{item?.['full_name']}</div>
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      field?.value.some((i: any) => {
                                        return i.id === item?.id;
                                      })
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              );
                            })}
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
            );
          }}
        />
      }
    />
  );
};
