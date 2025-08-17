import { CapitalizeFirstWord } from '@/auth';
import { Button, PopoverContent, PopoverTrigger } from '@/components';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Client } from '@/modules/clients/interfaces/Client';
import { ButtonRefetchData, Loading } from '@/modules/core/components';
import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { formSchemaSearchBarSale } from '@/modules/sales/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import { CheckIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Tipos inferidos del schema
type FormSchema = z.infer<typeof formSchemaSearchBarSale>;
type ClientsField = NonNullable<FormSchema['clients']>;
type ClientItem = NonNullable<ClientsField>[0];

interface Props {
  formSearchBar: UseFormReturn<FormSchema, unknown>;
  onAddFilter: (filterName: keyof FormSchema) => Promise<boolean>;
  onClearErrors: (filterName: keyof FormSchema) => void;
  queryClients: UseQueryGetAllRecordsReturn<Client>;
  disabled: boolean;
}

// Subcomponente: Item individual de cliente
interface ClientItemProps {
  client: Client;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const ClientItem: React.FC<ClientItemProps> = ({
  client,
  index,
  isSelected,
  onSelect,
}) => {
  return (
    <CommandItem
      value={client.full_name}
      key={client.id}
      onSelect={onSelect}
      role="option"
      aria-selected={isSelected}
      data-testid={`form-field-command-item-${index}`}
    >
      <div className="">{client.full_name}</div>
      <CheckIcon
        className={cn(
          'ml-auto h-4 w-4',
          isSelected ? 'opacity-100' : 'opacity-0'
        )}
      />
    </CommandItem>
  );
};

// Subcomponente: Lista de clientes
interface ClientListProps {
  clients: Client[];
  selectedClients: ClientsField;
  onClientSelect: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({
  clients,
  selectedClients,
  onClientSelect,
}) => {
  return (
    <ScrollArea className="w-auto h-56 p-1 pr-2">
      <CommandEmpty>
        {`${CapitalizeFirstWord('cliente')} no encontrado`}
      </CommandEmpty>
      <CommandGroup role="listbox">
        {clients.map((client, index) => {
          const isSelected = selectedClients.some(
            (selected) => selected.id === client.id
          );

          return (
            <ClientItem
              key={client.id}
              client={client}
              index={index}
              isSelected={isSelected}
              onSelect={() => onClientSelect(client)}
            />
          );
        })}
      </CommandGroup>
    </ScrollArea>
  );
};

// Componente principal refactorizado
export const SaleSearchBarClientsFilter: React.FC<Props> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  queryClients,
  disabled,
}) => {
  const [openPopoverClient, setOpenPopoverClient] = useState(false);

  // Obtener clientes actuales una sola vez para evitar re-renders
  const currentClients = formSearchBar.watch('clients') || [];

  // Memoizar función de refetch para evitar recreaciones
  const handleRefetchClients = useCallback(async () => {
    await queryClients.refetch();
  }, [queryClients]);

  // Memoizar función de selección de cliente
  const handleClientSelection = useCallback(
    (field: ControllerRenderProps<FormSchema, 'clients'>, client: Client) => {
      const currentFieldValue = field.value || [];
      const isClientSelected = currentFieldValue.some(
        (selectedClient) => selectedClient.id === client.id
      );

      if (isClientSelected) {
        // Remover cliente si ya está seleccionado
        formSearchBar.setValue(
          'clients',
          currentFieldValue.filter(
            (selectedClient) => selectedClient.id !== client.id
          ),
          {
            shouldValidate: true,
            shouldDirty: true,
          }
        );
      } else {
        // Agregar cliente si no está seleccionado
        const newClient: ClientItem = {
          id: client.id,
          full_name: client.full_name,
        };

        formSearchBar.setValue('clients', [...currentClients, newClient], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }

      // Opcional: mantener popover abierto para selección múltiple
      setOpenPopoverClient(false);
    },
    [formSearchBar, currentClients]
  );

  // Memoizar función de renderizado del botón
  const renderClientButton = useCallback(
    (field: ControllerRenderProps<FormSchema, 'clients'>) => {
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
          aria-label="Seleccionar clientes"
          className={cn(
            'justify-between',
            !field.value && 'text-muted-foreground'
          )}
          ref={field.ref}
          onBlur={field.onBlur}
          disabled={disabled}
          data-testid="btn-open-command-client"
          id={field.name}
          aria-describedby={
            field.name ? `${field.name}-description` : undefined
          }
          onClick={() => setOpenPopoverClient(!openPopoverClient)}
        >
          {field.value && field.value.length > 0
            ? `${currentClients.length} seleccionado(s)`
            : 'Selecciona clientes'}

          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      );
    },
    [
      currentClients,
      openPopoverClient,
      disabled,
      queryClients.isLoading,
      queryClients.isFetching,
    ]
  );

  // Memoizar función de renderizado de la lista
  const renderClientList = useCallback(
    (field: ControllerRenderProps<FormSchema, 'clients'>) => {
      if (!queryClients.data?.records) return null;

      return (
        <ClientList
          clients={queryClients.data.records}
          selectedClients={currentClients}
          onClientSelect={(client) => handleClientSelection(field, client)}
        />
      );
    },
    [queryClients.data?.records, currentClients, handleClientSelection]
  );

  return (
    <FilterDropdownItem
      label={'Clientes'}
      className="lg:w-[280px]"
      content={
        <>
          <FormField
            control={formSearchBar.control}
            name="clients"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="block my-2">
                  {'Clientes involucrados:'}
                </FormLabel>
                <div className="flex flex-wrap gap-2">
                  <Popover
                    open={openPopoverClient}
                    onOpenChange={setOpenPopoverClient}
                    modal={false}
                  >
                    <PopoverTrigger asChild>
                      {renderClientButton(field)}
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar cliente..."
                          className="h-9"
                        />
                        <CommandList>{renderClientList(field)}</CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <ButtonRefetchData
                    onClick={handleRefetchClients}
                    disabled={false}
                    content="Actualizar datos de clientes involucrados"
                  />
                </div>
                <FormDescription>
                  {'Cliente(s) que han participado en las ventas'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      }
      actionOnSave={() => onAddFilter('clients')}
      actionOnClose={() => onClearErrors('clients')}
      dataTestId="filter-clients"
    />
  );
};
