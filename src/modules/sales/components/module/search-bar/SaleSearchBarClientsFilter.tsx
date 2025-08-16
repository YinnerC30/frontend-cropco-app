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

  // Funciones extraídas para mejorar la legibilidad
  const handleRefetchClients = async () => {
    await queryClients.refetch();
  };

  const handleClientSelection = (
    field: ControllerRenderProps<any, any>,
    item: Client,
    currentClients: any[] | undefined
  ) => {
    const isClientSelected = field?.value?.some((i: any) => i.id === item?.id);

    if (isClientSelected) {
      // Remover cliente si ya está seleccionado
      formSearchBar.setValue(
        'clients',
        [...field?.value?.filter((i: any) => i.id !== item?.id)],
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    } else {
      // Agregar cliente si no está seleccionado
      formSearchBar.setValue(
        'clients',
        [
          ...(currentClients || []),
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
  };

  const renderClientButton = (field: ControllerRenderProps<any, any>) => {
    const currentClients = formSearchBar.watch('clients');

    if (queryClients.isLoading || queryClients.isFetching) {
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
        aria-expanded={openPopoverClient}
        className={cn(
          'justify-between',
          !field.value && 'text-muted-foreground'
        )}
        ref={field.ref}
        onBlur={field.onBlur}
        disabled={disabled}
        data-testid="btn-open-command-client"
      >
        {field.value.length > 0 && !!queryClients.data
          ? `${currentClients!.length} seleccionado(s)`
          : 'Selecciona clientes'}

        <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
      </Button>
    );
  };

  const renderClientItem = (
    item: Client,
    index: number,
    field: ControllerRenderProps<any, any>
  ) => {
    const currentClients = formSearchBar.watch('clients');
    const isSelected = field?.value.some((i: any) => i.id === item?.id);

    return (
      <CommandItem
        value={item?.['full_name']}
        key={item.id!}
        onSelect={() => handleClientSelection(field, item, currentClients)}
        data-testid={`form-field-command-item-${index}`}
      >
        <div className="">{item?.['full_name']}</div>
        <CheckIcon
          className={cn(
            'ml-auto h-4 w-4',
            isSelected ? 'opacity-100' : 'opacity-0'
          )}
        />
      </CommandItem>
    );
  };

  const renderClientList = (field: ControllerRenderProps<any, any>) => {
    return (
      <ScrollArea className="w-auto h-56 p-1 pr-2">
        <CommandEmpty>
          {`${CapitalizeFirstWord('cliente')} no encontrado`}
        </CommandEmpty>
        <CommandGroup>
          {queryClients?.data?.records.map((item, index) =>
            renderClientItem(item, index, field)
          )}
        </CommandGroup>
      </ScrollArea>
    );
  };

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
                        <FormControl>{renderClientButton(field)}</FormControl>
                      </PopoverTrigger>
                      <ButtonRefetchData
                        onClick={handleRefetchClients}
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
                        <CommandList>{renderClientList(field)}</CommandList>
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
