import { Button } from '@/components/ui/button';

import { CaretSortIcon, Cross2Icon } from '@radix-ui/react-icons';

import { CheckIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Employee } from '@/interfaces/Employee';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toast } from 'sonner';
import { formSchemaHarvestDetail } from './ElementsHarvestDetailForm';
import { calculateTotal, modify } from './harvestSlice';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { DialogClose } from '@radix-ui/react-dialog';
import { z } from 'zod';
import { useGetAllEmployees } from '../employees/hooks/useGetAllEmployees';

interface Props {
  defaultValues: any;
  isDialogOpen: boolean;
  setDialogOpen: any;
  setOpenDropDownMenu?: any;
}

export const ModifyHarvestDetail = ({
  isDialogOpen,
  setDialogOpen,
  defaultValues,
  setOpenDropDownMenu,
}: Props) => {
  const { query: queryEmployees } = useGetAllEmployees({
    searchParameter: '',
    allRecords: true,
  });

  const details: any = useAppSelector((state: any) => state.harvest.details);
  const formHarvestDetail = useForm<z.infer<typeof formSchemaHarvestDetail>>({
    resolver: zodResolver(formSchemaHarvestDetail),
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const onSubmitHarvestDetail = async (
    values: z.infer<typeof formSchemaHarvestDetail>,
  ) => {
    const oldEmployee = {
      id: defaultValues.employee.id,
    };

    dispatch(
      modify({
        detail: values,
        oldEmployee,
      }),
    );
    dispatch(calculateTotal());
    toast.success('Registro actualizado');
    setDialogOpen(false);
    setOpenDropDownMenu(false);
  };
  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose
          onClick={() => setDialogOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <Cross2Icon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Modificar</DialogTitle>
          <DialogDescription>
            Cuando termines de modificar la información, puedes cerrar esta
            ventana.
          </DialogDescription>
        </DialogHeader>

        <Form {...formHarvestDetail}>
          <form
            onSubmit={formHarvestDetail.handleSubmit(onSubmitHarvestDetail)}
            className="mx-5"
            id="formDetail"
          >
            <FormField
              key={'employee'}
              control={formHarvestDetail.control}
              name={'employee'}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">{'Empleado:'}</FormLabel>

                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value.id && 'text-muted-foreground',
                          )}
                        >
                          {field.value.id
                            ? queryEmployees.data.rows.find(
                                (item: Employee) => item.id === field.value.id,
                              )?.first_name
                            : 'Selecciona un empleado'}

                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar empleado..."
                          className="h-9"
                        />
                        <CommandList>
                          <ScrollArea className="w-auto h-56">
                            <CommandEmpty>Empleado no encontrado.</CommandEmpty>
                            <CommandGroup>
                              {queryEmployees.data.rows &&
                                Array.isArray(queryEmployees.data.rows) &&
                                queryEmployees.data.rows.map(
                                  (employee: Employee | any) => {
                                    const isIncludes = details.some(
                                      (item: any) =>
                                        item.employee.id === employee.id,
                                    );
                                    if (
                                      isIncludes &&
                                      employee.id !== field.value.id
                                    )
                                      return;

                                    return (
                                      <CommandItem
                                        value={employee.first_name}
                                        key={employee.id!}
                                        onSelect={() => {
                                          formHarvestDetail.setValue(
                                            'employee',
                                            employee!,
                                          );
                                        }}
                                      >
                                        {employee.first_name}
                                        <CheckIcon
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            employee.id! === field.value.id
                                              ? 'opacity-100'
                                              : 'opacity-0',
                                          )}
                                        />
                                      </CommandItem>
                                    );
                                  },
                                )}
                            </CommandGroup>
                          </ScrollArea>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormDescription>
                    Selecciona el nombre del empleado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'total'}
              control={formHarvestDetail.control}
              name={'total'}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">{'Total:'}</FormLabel>

                  <FormControl>
                    <Input
                      className="w-80"
                      placeholder={'0'}
                      {...field}
                      type="number"
                      min={0}
                      onChange={e => {
                        return !Number.isNaN(e.target.value)
                          ? field.onChange(parseFloat(e.target.value))
                          : 0;
                      }}
                    />
                  </FormControl>

                  <FormDescription>
                    Introduce la cantidad que ha cosechado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'value_pay'}
              control={formHarvestDetail.control}
              name={'value_pay'}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">{'Valor a pagar:'}</FormLabel>

                  <FormControl>
                    <Input
                      className="w-80"
                      placeholder={'0'}
                      {...field}
                      type="number"
                      min={0}
                      step={50}
                      onChange={e => {
                        return !Number.isNaN(e.target.value)
                          ? field.onChange(parseFloat(e.target.value))
                          : 0;
                      }}
                    />
                  </FormControl>

                  <FormDescription>Introduce el valor a pagar</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            variant={'destructive'}
            onClick={() => {
              formHarvestDetail.reset();
              setDialogOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" form="formDetail">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
