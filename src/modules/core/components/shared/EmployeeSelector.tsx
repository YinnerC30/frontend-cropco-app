'use employee';

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

import { useGetAllEmployeesWithHarvests } from '@/modules/payments/hooks/queries/useGetAllEmployeesWithHarvests';
import { useGetAllEmployeesWithWorks } from '@/modules/payments/hooks/queries/useGetAllEmployeesWithWorks';

interface Props {
  selectedEmployee: string;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<string>>;
  employeesIn: 'harvests' | 'works';
}

export default function EmployeeSelector({
  selectedEmployee,
  setSelectedEmployee,
  employeesIn,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const queryEmployees =
    employeesIn === 'harvests'
      ? useGetAllEmployeesWithHarvests()
      : useGetAllEmployeesWithWorks();

  const data = queryEmployees.data?.rows ?? [];

  const employees = [{ first_name: 'Todos', id: '' }, ...data];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          {!!selectedEmployee
            ? `Empleado: ${
                employees.find((item) => item.id === selectedEmployee)
                  ?.first_name
              }`
            : 'Selecciona un empleado...'}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar empleado..." />
          <CommandList>
            <CommandEmpty>No se encontró el empleado</CommandEmpty>
            <CommandGroup>
              {employees.map((employee) => (
                <CommandItem
                  key={employee.first_name}
                  value={employee.id}
                  onSelect={(currentValue) => {
                    setSelectedEmployee(
                      currentValue === selectedEmployee ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedEmployee === employee.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {employee.first_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
