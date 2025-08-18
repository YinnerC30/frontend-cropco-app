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

interface ShoppingSearchBarSuppliesFilterProps {
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
  querySupplies: any;
  disabled: boolean;
}

export const ShoppingSearchBarSuppliesFilter: React.FC<
  ShoppingSearchBarSuppliesFilterProps
> = ({ formSearchBar, onAddFilter, onClearErrors, querySupplies, disabled }) => {
  const [openPopoverSupply, setOpenPopoverSupply] = useState(false);

  return (
    <FilterDropdownItem
      label={'Insumos'}
      className="w-[200px] sm:w-[250px] md:w-[250px] lg:w-[285px]"
      content={
        <>
          <FormField
            control={formSearchBar.control}
            name={`supplies`}
            render={({
              field,
            }: {
              field: ControllerRenderProps<any, any>;
            }) => {
              const currentSupplies = formSearchBar.watch('supplies');

              return (
                <FormItem className="">
                  <FormLabel className="block my-2">
                    {'Insumos involucrados:'}
                  </FormLabel>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Popover
                      open={openPopoverSupply}
                      onOpenChange={setOpenPopoverSupply}
                      modal={false}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          {querySupplies.isLoading || querySupplies.isFetching ? (
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
                            >
                              {field.value.length > 0 && !!querySupplies.data
                                ? `${currentSupplies!.length} seleccionado(s)`
                                : 'Selecciona insumos'}

                              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          )}
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder={`Buscar insumo...`}
                            className="h-9"
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
                                          field?.value?.some((i: any) => i.id === item?.id)
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
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      <ButtonRefetchData
                        onClick={async () => {
                          await querySupplies.refetch();
                        }}
                        disabled={false}
                        content="Actualizar datos de insumos involucrados"
                      />
                    </div>
                  </div>
                  <FormDescription>
                    {'Insumo(s) que han participado en la compra'}
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
      dataTestId="filter-supplies"
    />
  );
};
