

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
  showPreviousYear: boolean;
  setShowPreviousYear: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HiddenPreviousYearSelector = ({
  showPreviousYear,
  setShowPreviousYear,
}: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {`Información del año anterior: ${
            showPreviousYear ? 'Mostrar' : 'Ocultar'
          }`}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem
                key={'show'}
                value={'show'}
                onSelect={(currentValue) => {
                  currentValue === 'show'
                    ? setShowPreviousYear(true)
                    : setShowPreviousYear(false);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    showPreviousYear === true ? 'opacity-100' : 'opacity-0'
                  )}
                />
                Mostrar
              </CommandItem>
              <CommandItem
                key={'hidden'}
                value={'hidden'}
                onSelect={(currentValue) => {
                  currentValue === 'hidden'
                    ? setShowPreviousYear(false)
                    : setShowPreviousYear(true);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    !showPreviousYear === true ? 'opacity-100' : 'opacity-0'
                  )}
                />
                Ocultar
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
