

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
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

const currentYear = new Date().getFullYear();


interface Props {
  initialYear?: number;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export default function YearSelector({ selectedYear, setSelectedYear, initialYear = 2023 }: Props) {
  const [open, setOpen] = React.useState(false);

  const years = Array.from(
    { length: currentYear - initialYear },
    (_, i) => currentYear - i
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[120px] justify-between"
        >
          {selectedYear ? `Año: ${selectedYear}` : 'Selecciona un año...'}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar año..." />
          <CommandList>
            <CommandEmpty>No se encontró el año.</CommandEmpty>
            <CommandGroup>
              {years.map((year) => (
                <CommandItem
                  key={year}
                  value={year.toString()}
                  onSelect={(currentValue) => {
                    setSelectedYear(
                      Number(currentValue) === selectedYear
                        ? 2025
                        : Number(currentValue)
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedYear === year ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {year}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
