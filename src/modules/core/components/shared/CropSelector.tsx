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
import { Crop } from '@/modules/crops/interfaces/Crop';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseApiGetAllRecords } from '../../interfaces';

interface Props {
  selectedCrop: string;
  setSelectedCrop: React.Dispatch<React.SetStateAction<string>>;
  query: UseQueryResult<
    ResponseApiGetAllRecords<Crop>,
    AxiosError<TypedAxiosError, unknown>
  >;
}

export default function CropSelector({
  selectedCrop,
  setSelectedCrop,
  query,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const data = query.data?.records ?? [];

  const crops = [{ name: 'Todos', id: '' }, ...data];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between overflow-hidden text-ellipsis truncate"
        >
          <span
            className={cn(
              'text-muted-foreground',
              'overflow-hidden text-ellipsis truncate'
            )}
          >
            {!!selectedCrop
              ? `Cultivo: ${
                  crops.find((item) => item.id === selectedCrop)?.name
                }`
              : 'Selecciona un cultivo...'}
          </span>

          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cultivo..." />
          <CommandList>
            <CommandEmpty>No se encontró el cultivo</CommandEmpty>
            <CommandGroup>
              {crops.map((crop) => (
                <CommandItem
                  key={crop.name}
                  value={crop.id}
                  onSelect={(currentValue) => {
                    setSelectedCrop(
                      currentValue === selectedCrop ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedCrop === crop.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {crop.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
