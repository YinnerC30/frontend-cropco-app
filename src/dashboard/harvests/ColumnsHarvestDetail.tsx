import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { CaretSortIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

import { ArrowUpDown, CheckIcon, MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CustomFormField } from '@/interfaces/CustomFormField';
import { Employee } from '@/interfaces/Employee';
import { HarvestDetail } from '@/interfaces/Harvest';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toast } from 'sonner';
import {
  formFieldsHarvestDetail,
  formSchemaHarvestDetail,
} from './ElementsHarvestDetailForm';
import { add, modify, remove } from './harvestSlice';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { useGetAllEmployees } from '../employees/hooks/useGetAllEmployees';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export let columnsHarvestDetail: ColumnDef<HarvestDetail>[] = [];

for (const field of formFieldsHarvestDetail) {
  if (field.visible) {
    columnsHarvestDetail.push({
      accessorKey: field.name,
      header: ({ column }: any) => {
        return (
          <Button
            className="px-0 hover:bg-transparent"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {field.label.replace(/:/g, '')}
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
    });
  }
}

export const ModifyHarvestDetail = ({ defaultValues }: any) => {
  console.log({ defaultValues });
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
    const isIncludes = details.some(
      (item: any) => item.employee === values.employee,
    );
    if (isIncludes) return;

    dispatch(
      modify({
        harvestDetail: values,
        oldEmployee: { id: defaultValues.employee.id },
      }),
    );
    toast.success('Registro actualizado');
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar</DialogTitle>
          <DialogDescription>
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
          <Button type="submit" form="formDetail">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

columnsHarvestDetail.push({
  id: 'actions',
  cell: ({ row }: any) => {
    const harvestDetail = row.original;
    const { employee } = harvestDetail;

    const dispatch = useAppDispatch();

    const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

    const handleDelete = () => {
      dispatch(remove(employee.id!));
      toast.success(
        `Se ha eliminado la cosecha del empleado ${harvestDetail.employee.first_name}`,
      );
      setOpenDropDownMenu(false);
    };

    return (
      <>
        <DropdownMenu open={openDropDownMenu} modal={openDropDownMenu}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-8 h-8 p-0"
              onClick={() => setOpenDropDownMenu(!openDropDownMenu)}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onPointerDownOutside={() => setOpenDropDownMenu(false)}
            align="center"
            className="flex flex-col items-center"
          >
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator className="w-full" />
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'ghost'}>
                    <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estas seguro de eliminar el registro?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción es irreversible y no podrá recuperar su
                      registro
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="secondary">Cancelar</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button onClick={() => handleDelete()}>Continuar</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ModifyHarvestDetail defaultValues={harvestDetail} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  },
});

export default columnsHarvestDetail;
