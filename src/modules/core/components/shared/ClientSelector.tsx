

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useGetAllClientsWithSales } from '@/modules/clients/hooks/queries/useGetAllClientsWithSales';

interface Props {
  selectedClient: string;
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
}

export default function ClientSelector({
  selectedClient,
  setSelectedClient,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const queryClients = useGetAllClientsWithSales();

  const data = queryClients.data?.records ?? [];

  const clients = [{ first_name: 'Todos', id: '' }, ...data];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {!!selectedClient
            ? `Cliente: ${
                clients.find((item) => item.id === selectedClient)?.first_name
              }`
            : 'Selecciona un cliente...'}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cliente..." />
          <CommandList>
            <CommandEmpty>No se encontró el cliente</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  key={client.first_name}
                  value={client.id}
                  onSelect={(currentValue) => {
                    setSelectedClient(
                      currentValue === selectedClient ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedClient === client.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {client.first_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
