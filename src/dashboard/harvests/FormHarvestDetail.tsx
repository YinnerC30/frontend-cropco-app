import { CaretSortIcon, CheckIcon, PlusIcon } from '@radix-ui/react-icons';
import { z } from 'zod';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Employee } from '@/interfaces/Employee';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetAllEmployees } from '../employees/hooks/useGetAllEmployees';
import {
  defaultValuesHarvestDetail,
  formSchemaHarvestDetail,
} from './ElementsHarvestDetailForm';
import { add, calculateTotal } from './harvestSlice';
import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';

export const FormHarvestDetail = () => {
  const dispatch = useAppDispatch();
  const details: any = useAppSelector((state: any) => state.harvest.details);
  const { query: queryEmployees } = useGetAllEmployees({
    searchParameter: '',
    allRecords: true,
  });
  const formHarvestDetail = useForm<z.infer<typeof formSchemaHarvestDetail>>({
    resolver: zodResolver(formSchemaHarvestDetail),
    defaultValues: defaultValuesHarvestDetail,
  });

  const onSubmitHarvestDetail = async (
    values: z.infer<typeof formSchemaHarvestDetail>,
  ) => {
    dispatch(add(values));
    dispatch(calculateTotal());
    formHarvestDetail.reset();
  };

  if (queryEmployees.isLoading) return <Loading />;

  if (queryEmployees.isError) {
    return <ErrorLoading />;
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="my-2">Añadir registro</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar cosecha empleado</DialogTitle>
            <DialogDescription className="">
              Cuando termines de agregar la información, puedes cerrar esta
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
                key={'employee.id'}
                control={formHarvestDetail.control}
                name={'employee.id'}
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
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? queryEmployees.data.rows.find(
                                  (item: Employee) => item.id === field.value,
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
                              <CommandEmpty>
                                Empleado no encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {queryEmployees.data.rows &&
                                  Array.isArray(queryEmployees.data.rows) &&
                                  queryEmployees.data.rows.map(
                                    (employee: Employee | any) => {
                                      const isIncludes = details.some(
                                        (item: any) =>
                                          item.employee.id === employee.id,
                                      );
                                      if (isIncludes) return;
                                      return (
                                        <CommandItem
                                          value={employee.first_name}
                                          key={employee.id!}
                                          onSelect={() => {
                                            formHarvestDetail.setValue(
                                              'employee',
                                              employee!,
                                            );
                                            formHarvestDetail.trigger(
                                              'employee.id',
                                            );
                                          }}
                                        >
                                          {employee.first_name}
                                          <CheckIcon
                                            className={cn(
                                              'ml-auto h-4 w-4',
                                              employee.id! === field.value
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

                    <FormDescription>
                      Introduce el valor a pagar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <Button type="submit" form="formDetail">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
