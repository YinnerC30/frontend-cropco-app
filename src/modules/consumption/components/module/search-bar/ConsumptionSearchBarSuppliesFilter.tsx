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
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components';
import { ButtonRefetchData, Loading } from '@/modules/core/components';
import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { CapitalizeFirstWord } from '@/auth';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import { CheckIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarConsumption } from '../../../utils/formSchemaSearchBarConsumption';

interface ConsumptionSearchBarSuppliesFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarConsumption>,
    unknown
  >;
  onAddFilter: (
    name: keyof z.infer<typeof formSchemaSearchBarConsumption>
  ) => Promise<boolean>;
  onClearErrors: (
    name: keyof z.infer<typeof formSchemaSearchBarConsumption>
  ) => void;
  querySupplies: any;
  disabled: boolean;
}

export const ConsumptionSearchBarSuppliesFilter: React.FC<
  ConsumptionSearchBarSuppliesFilterProps
> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  querySupplies,
  disabled,
}) => {
  const [openPopoverSupply, setOpenPopoverSupply] = useState(false);

  return (
    <FilterDropdownItem
      label={'Insumos'}
      className="lg:w-[280px]"
      content={
        <>
          <FormField
            control={formSearchBar.control}
            name={`supplies`}
            render={({ field }: { field: ControllerRenderProps<any, any> }) => {
              const currentSupplies = formSearchBar.watch('supplies');

              return (
                <FormItem className="">
                  <FormLabel className="block my-2">
                    {'Insumos involucrados:'}
                  </FormLabel>
                  <Popover
                    open={openPopoverSupply}
                    onOpenChange={setOpenPopoverSupply}
                    modal={true}
                  >
                    <div className="flex flex-wrap gap-2">
                      <PopoverTrigger asChild>
                        <FormControl>
                          {querySupplies.isLoading ||
                          querySupplies.isFetching ? (
                            <div className="w-[200px]">
                              <Loading className="" />
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openPopoverSupply}
                              className={` ${cn(
                                'justify-between',
                                !field.value && 'text-muted-foreground'
                              )}`}
                              ref={field.ref}
                              onBlur={field.onBlur}
                              disabled={disabled}
                              data-testid="btn-consumption-supplies-select"
                            >
                              {field.value.length > 0 && !!querySupplies.data
                                ? `${currentSupplies!.length} seleccionado(s)`
                                : 'Selecciona insumos'}

                              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          )}
                        </FormControl>
                      </PopoverTrigger>
                    </div>

                    <div className="flex items-center justify-center">
                      <Button
                        type="button"
                        onClick={() => {
                          formSearchBar.setValue('supplies', [], {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                        }}
                        size={'icon'}
                        variant={'outline'}
                        className="w-8 mr-1 bg-destructive hover:bg-destructive/80"
                        data-testid="btn-consumption-clear-supplies"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      <ButtonRefetchData
                        onClick={async () => {
                          await querySupplies.refetch();
                        }}
                        disabled={false}
                        content="Actualizar datos de insumos involucrados"
                        data-testid="btn-consumption-refetch-supplies-detail"
                      />
                    </div>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Buscar insumo...`}
                          className="h-9"
                          data-testid="input-consumption-search-supplies"
                        />
                        <CommandList>
                          <ScrollArea className="w-auto h-56 p-1 pr-2">
                            <CommandEmpty>{`${CapitalizeFirstWord(
                              'insumo'
                            )} no encontrado`}</CommandEmpty>
                            <CommandGroup>
                              {querySupplies?.data?.records.map((item: any) => {
                                return (
                                  <CommandItem
                                    value={item?.['name']}
                                    key={item.id!}
                                    onSelect={() => {
                                      if (
                                        field?.value?.some(
                                          (i: any) => i.id === item?.id
                                        )
                                      ) {
                                        formSearchBar.setValue(
                                          'supplies',
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
                                          'supplies',
                                          [
                                            ...(currentSupplies || []),
                                            {
                                              id: item.id,
                                              name: item['name'],
                                            },
                                          ],
                                          {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                          }
                                        );
                                      }
                                      setOpenPopoverSupply(false);
                                    }}
                                    data-testid={`option-consumption-supply-${item.id}`}
                                  >
                                    <div className="">{item?.['name']}</div>
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
                    {'Insumos(s) que han participado en el consumo'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </>
      }
      actionOnSave={() => onAddFilter('supplies')}
      actionOnClose={() => onClearErrors('supplies')}
    />
  );
};
