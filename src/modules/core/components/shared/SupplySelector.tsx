

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
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

import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseApiGetAllRecords } from '../../interfaces';
import { Supply } from '@/modules/supplies/interfaces/Supply';

interface Props {
  selectedsupply: string;
  setSelectedsupply: React.Dispatch<React.SetStateAction<string>>;
  query: UseQueryResult<
    ResponseApiGetAllRecords<Supply>,
    AxiosError<TypedAxiosError, unknown>
  >;
}

export default function supplySelector({
  selectedsupply,
  setSelectedsupply,
  query,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const data = query.data?.records ?? [];

  const supplies = [{ name: 'Todos', id: '' }, ...data];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {!!selectedsupply
            ? `Insumo: ${
                supplies.find((item) => item.id === selectedsupply)?.name
              }`
            : 'Selecciona un insumo...'}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar insumo..." />
          <CommandList>
            <CommandEmpty>No se encontró el insumo</CommandEmpty>
            <CommandGroup>
              {supplies.map((supply) => (
                <CommandItem
                  key={supply.name}
                  value={supply.id}
                  onSelect={(currentValue) => {
                    setSelectedsupply(
                      currentValue === selectedsupply ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedsupply === supply.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {supply.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
