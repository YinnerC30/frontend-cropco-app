import { CaretSortIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Employee } from '@/modules/employees/Employee';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toast } from 'sonner';
import { useGetAllEmployees } from '../employees/hooks/useGetAllEmployees';
import {
  defaultValuesHarvestDetail,
  formFieldsHarvestDetail,
  formSchemaHarvestDetail,
} from './ElementsHarvestDetailForm';
import { add, calculateTotal } from './harvestSlice';
import { Loading, ErrorLoading } from '../core/components';

export const FormHarvestDetail = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
}: any) => {
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
    dispatch(add([values]));
    dispatch(calculateTotal());
    formHarvestDetail.reset();
    toast.success('Registro añadido');
    setIsOpenDialogForm(false);
  };

  if (queryEmployees.isLoading) return <Loading />;

  if (queryEmployees.isError) {
    return <ErrorLoading />;
  }

  return (
    <div>
      <Dialog open={isOpenDialogForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogClose
            onClick={() => setIsOpenDialogForm(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
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
                    <FormLabel className="block">
                      {formFieldsHarvestDetail.first_name.label}
                    </FormLabel>

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
                              : formFieldsHarvestDetail.first_name.placeholder}

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
                      {formFieldsHarvestDetail.first_name.description}
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
                    <FormLabel className="block">
                      {formFieldsHarvestDetail.total.label}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder={formFieldsHarvestDetail.total.placeholder}
                        {...field}
                        type="number"
                        min={0}
                      />
                    </FormControl>

                    <FormDescription>
                      {formFieldsHarvestDetail.total.description}
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
                    <FormLabel className="block">
                      {formFieldsHarvestDetail.value_pay.label}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder={formFieldsHarvestDetail.value_pay.label}
                        min={0}
                        step={50}
                        {...field}
                        type="number"
                      />
                    </FormControl>

                    <FormDescription>
                      {formFieldsHarvestDetail.value_pay.description}
                    </FormDescription>
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
                setIsOpenDialogForm(false);
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
    </div>
  );
};