import { Button, PopoverContent, PopoverTrigger } from '@/components';
import { ButtonRefetchData, Loading } from '@/modules/core/components';

import { CheckIcon } from 'lucide-react';

import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { Popover } from '@radix-ui/react-popover';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

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
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Client } from '@/modules/clients/interfaces/Client';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { formSchemaSearchBarSale } from '@/modules/sales/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { z } from 'zod';

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

  queryClients: UseQueryGetAllRecordsReturn<Client>;
  disabled: boolean;
}

export const SaleSearchBarClientsFilter: React.FC<Props> = (props) => {
  const [openPopoverClient, setOpenPopoverClient] = useState(false);
  const { formSearchBar, onAddFilter, onClearErrors, queryClients, disabled } =
    props;

  return (
    <FilterDropdownItem
      label={'Clientes'}
      className=" lg:w-[280px]"
      content={
        <>
          <FormField
            control={formSearchBar.control}
            name={`clients`}
            render={({ field }: { field: ControllerRenderProps<any, any> }) => {
              const currentEmployees = formSearchBar.watch('clients');

              return (
                <FormItem className="">
                  <FormLabel className="block my-2">
                    {'Clientes involucrados:'}
                  </FormLabel>
                  <Popover
                    open={openPopoverClient}
                    onOpenChange={setOpenPopoverClient}
                    modal={true}
                  >
                    <div className="flex flex-wrap gap-2">
                      <PopoverTrigger asChild>
                        <FormControl>
                          {queryClients.isLoading || queryClients.isFetching ? (
                            <div className="w-[200px]">
                              <Loading className="" />
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openPopoverClient}
                              className={` ${cn(
                                'justify-between',
                                !field.value && 'text-muted-foreground'
                              )}`}
                              ref={field.ref}
                              onBlur={field.onBlur}
                              disabled={disabled}
                              data-testid="btn-open-command-client"
                            >
                              {field.value.length > 0 && !!queryClients.data
                                ? `${currentEmployees!.length} seleccionado(s)`
                                : 'Selecciona clientes'}

                              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          )}
                        </FormControl>
                      </PopoverTrigger>
                      <ButtonRefetchData
                        onClick={async () => {
                          await queryClients.refetch();
                        }}
                        disabled={false}
                        content="Actualizar datos de clientes involucrados"
                      />
                    </div>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Buscar cliente...`}
                          className="h-9"
                        />
                        <CommandList>
                          <ScrollArea className="w-auto h-56 p-1 pr-2">
                            <CommandEmpty>{`${CapitalizeFirstWord(
                              'cliente'
                            )} no encontrado`}</CommandEmpty>
                            <CommandGroup>
                              {queryClients?.data?.records.map(
                                (item, index) => {
                                  return (
                                    <CommandItem
                                      value={item?.['full_name']}
                                      key={item.id!}
                                      onSelect={() => {
                                        if (
                                          field?.value?.some(
                                            (i: any) => i.id === item?.id
                                          )
                                        ) {
                                          formSearchBar.setValue(
                                            'clients',
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
                                            'clients',
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
                                        setOpenPopoverClient(false);
                                      }}
                                      data-testid={`form-field-command-item-${index}`}
                                    >
                                      <div className="">
                                        {item?.['full_name']}
                                      </div>

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
                                }
                              )}
                            </CommandGroup>
                          </ScrollArea>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {'Cliente(s) que han participado en las ventas'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </>
      }
      actionOnSave={() => onAddFilter('clients')}
      actionOnClose={() => onClearErrors('clients')}
      dataTestId="filter-clients"
    />
  );
};
