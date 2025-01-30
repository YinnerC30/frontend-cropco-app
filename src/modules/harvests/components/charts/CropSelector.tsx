'use client';

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
import { useGetAllCropsWithHarvest } from '@/modules/crops/hooks';

interface Props {
  selectedCrop: string;
  setSelectedCrop: React.Dispatch<React.SetStateAction<string>>;
}

export default function CropSelector({ selectedCrop, setSelectedCrop }: Props) {
  const [open, setOpen] = React.useState(false);

  const { query: queryCrops } = useGetAllCropsWithHarvest({
    allRecords: true,
    queryValue: '',
  });

  const data = queryCrops.data?.rows ?? [];

  const crops = [{ name: 'Todos', id: '' }, ...data];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {!!selectedCrop
            ?  `Cultivo: ${crops.find((item) => item.id === selectedCrop)?.name}`
            : 'Selecciona un cultivo...'}
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
