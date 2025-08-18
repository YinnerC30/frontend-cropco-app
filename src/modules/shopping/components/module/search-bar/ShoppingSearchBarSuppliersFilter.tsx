import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PopoverContent,
  PopoverTrigger,
} from '@/components';
import {
  ButtonRefetchData,
  Loading,
} from '@/modules/core/components';
import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarShopping } from '../../../utils/formSchemaSearchBarShopping';
import { ControllerRenderProps } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CapitalizeFirstWord } from '@/auth';
import { X } from 'lucide-react';

interface ShoppingSearchBarSuppliersFilterProps {
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
  querySuppliers: any;
  disabled: boolean;
}

export const ShoppingSearchBarSuppliersFilter: React.FC<
  ShoppingSearchBarSuppliersFilterProps
> = ({ formSearchBar, onAddFilter, onClearErrors, querySuppliers, disabled }) => {
  const [openPopoverSupplier, setOpenPopoverSupplier] = useState(false);

  return (
    <FilterDropdownItem
      label={'Proveedores'}
      className="w-[200px] sm:w-[250px] md:w-[250px] lg:w-[285px]"
      content={
        <>
          <FormField
            control={formSearchBar.control}
            name={`suppliers`}
            render={({
              field,
            }: {
              field: ControllerRenderProps<any, any>;
            }) => {
              const currentSuppliers = formSearchBar.watch('suppliers');

              return (
                <FormItem className="">
                  <FormLabel className="block my-2">
                    {'Proveedores involucrados:'}
                  </FormLabel>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Popover
                      open={openPopoverSupplier}
                      onOpenChange={setOpenPopoverSupplier}
                      modal={false}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          {querySuppliers.isLoading || querySuppliers.isFetching ? (
                            <div className="w-[200px]">
                              <Loading className="" />
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openPopoverSupplier}
                              className={` ${cn(
                                'justify-between',
                                !field.value && 'text-muted-foreground'
                              )}`}
                              ref={field.ref}
                              onBlur={field.onBlur}
                              disabled={disabled}
                              data-testid="btn-open-command-supplier"
                            >
                              {field.value.length > 0 && !!querySuppliers.data
                                ? `${currentSuppliers!.length} seleccionado(s)`
                                : 'Selecciona proveedores'}

                              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          )}
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder={`Buscar proveedor...`}
                            className="h-9"
                          />
                          <CommandList>
                            <ScrollArea className="w-auto h-56 p-1 pr-2">
                              <CommandEmpty>{`${CapitalizeFirstWord(
                                'proveedor'
                              )} no encontrado`}</CommandEmpty>
                              <CommandGroup>
                                {querySuppliers?.data?.records.map((item: any, index: number) => {
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
                                            'suppliers',
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
                                            'suppliers',
                                            [
                                              ...(currentSuppliers || []),
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
                                        setOpenPopoverSupplier(false);
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
                    <div className="flex items-center justify-center">
                      <Button
                        type="button"
                        onClick={() => {
                          formSearchBar.setValue('suppliers', [], {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                        }}
                        size={'icon'}
                        variant={'outline'}
                        className="w-8 mr-1 bg-destructive hover:bg-destructive/80"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      <ButtonRefetchData
                        onClick={async () => {
                          await querySuppliers.refetch();
                        }}
                        disabled={false}
                        content="Actualizar datos de proveedores involucrados"
                      />
                    </div>
                  </div>
                  <FormDescription>
                    {'Proveedor(s) que han participado en compras'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </>
      }
      actionOnSave={() => onAddFilter('suppliers')}
      actionOnClose={() => onClearErrors('suppliers')}
      dataTestId="filter-suppliers"
    />
  );
};
