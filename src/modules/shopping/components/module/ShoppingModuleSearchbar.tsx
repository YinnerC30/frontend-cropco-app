import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Form,
  PopoverContent,
  PopoverTrigger,
} from '@/components';
import {
  FormFieldCalendar,
  FormFieldInput,
  FormFieldSelect,
  Loading,
  ToolTipTemplate,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { formatTypeFilterNumber } from '@/modules/core/helpers/formatting/formatTypeFilterNumber';
import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Filter, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import {
  dateFilterOptions,
  numberFilterOptions,
} from '@/modules/core/interfaces/queries/FilterOptions';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { Popover } from '@radix-ui/react-popover';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';
import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarShopping } from '../../utils/formFieldsSearchBarShopping';
import { formSchemaSearchBarShopping } from '../../utils/formSchemaSearchBarShopping';
import { useGetAllSuppliesWithShopping } from '@/modules/supplies/hooks/queries/useGetAllSuppliesWithShopping';
import { useGetAllSuppliersWithShopping } from '@/modules/suppliers/hooks/queries/useGetAllSuppliersWithShopping';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { ScrollArea } from '@/components/ui/scroll-area';

import { CapitalizeFirstWord } from '@/auth';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { ControllerRenderProps } from 'react-hook-form';

export const ShoppingModuleSearchbar: React.FC = () => {
  const { paramsQuery, actionsShoppingModule, hasParamsQuery } =
    useShoppingModuleContext();
  const readOnly = !actionsShoppingModule['find_all_supplies_shopping'];
  const navigate = useNavigate();

  const querySupplies = useGetAllSuppliesWithShopping();
  const querySuppliers = useGetAllSuppliersWithShopping();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarShopping>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarShopping,
    defaultValues: paramsQuery,
    skiptDirty: true,
    validationMode: 'onSubmit',
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const [openPopoverDate, setOpenPopoverDate] = useState(false);
  const [openPopoverSupply, setOpenPopoverSupply] = useState(false);
  const [openPopoverSupplier, setOpenPopoverSupplier] = useState(false);

  const handleAddFilter = async (
    name: keyof z.infer<typeof formSchemaSearchBarShopping>
  ) => {
    const isValid = await form.trigger(name);
    if (!isValid) return false;

    const { filter_by_total, suppliers = [], supplies = [] } = form.watch();

    const filters: FilterSearchBar[] = [];

    if (suppliers?.length > 0) {
      filters.push({
        key: 'suppliers',
        label: `Proveedores: ${
          suppliers.some((e) => !e.first_name === true)
            ? suppliers
                .map((e) => {
                  return querySuppliers.data?.rows.find((cl) => cl.id === e.id)
                    ?.first_name;
                })
                .join(', ')
            : suppliers.map((e) => e.first_name).join(', ')
        }`,
      });
    }
    if (supplies?.length > 0) {
      filters.push({
        key: 'supplies',
        label: `Insumos: ${
          supplies.some((e) => !e.name === true)
            ? supplies
                .map((e) => {
                  return querySupplies.data?.rows.find((cr) => cr.id === e.id)
                    ?.name;
                })
                .join(', ')
            : supplies.map((e) => e.name).join(', ')
        }`,
      });
    }

    const { type_filter_total, total } = filter_by_total;
    if (type_filter_total && total) {
      const typeFilter = formatTypeFilterNumber(
        type_filter_total as TypeFilterNumber
      );
      filters.push({
        key: 'total',
        label: `Total: ${typeFilter} ${filter_by_total.total}`,
      });
    }

    setAppliedFilters(filters);
    setOpenDropDownMenu(false);
    await handleSearch(form.watch());
    return true;
  };

  const handleRemoveFilter = async (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
    switch (filter.key) {
      case 'suppliers':
        form.setValue('suppliers', [], { shouldDirty: false });
        break;
      case 'supplies':
        form.setValue('supplies', [], { shouldDirty: false });
        break;
      case 'date':
        form.setValue('filter_by_date.type_filter_date', undefined, {
          shouldDirty: false,
        });
        form.setValue('filter_by_date.date', undefined, { shouldDirty: false });
        break;
      case 'total':
        form.setValue('filter_by_total.type_filter_total', undefined, {
          shouldDirty: false,
        });
        form.setValue('filter_by_total.total', 0, { shouldDirty: false });
        break;
    }
    await handleSearch(form.watch());
  };

  const handleSearch = async (
    values: z.infer<typeof formSchemaSearchBarShopping>
  ) => {
    const params = new URLSearchParams();

    if (values.suppliers!.length > 0) {
      params.append('suppliers', values.suppliers!.map((e) => e.id).join(','));
    }
    if (values.supplies!.length > 0) {
      params.append('supplies', values.supplies!.map((e) => e.id).join(','));
    }

    if (values.filter_by_date.type_filter_date && values.filter_by_date.date) {
      params.append('filter_by_date', 'true');
      params.append(
        'type_filter_date',
        `${values.filter_by_date.type_filter_date}`
      );
      params.append('date', values.filter_by_date.date.toISOString());
    }

    if (
      values.filter_by_total.type_filter_total &&
      values.filter_by_total.total
    ) {
      params.append('filter_by_total', 'true');
      params.append(
        'type_filter_total',
        `${values.filter_by_total.type_filter_total}`
      );
      params.append('total', `${values.filter_by_total.total}`);
    }

    navigate(`?${params.toString()}`);
  };

  const handleResetForm = () => {
    setAppliedFilters([]);
    form.reset(
      {
        filter_by_date: {
          date: undefined,
          type_filter_date: TypeFilterDate.after,
        },
        filter_by_total: {
          type_filter_total: TypeFilterNumber.MIN,
          total: 0,
        },
        suppliers: [],
        supplies: [],
      },
      {
        keepErrors: false,
        keepDirty: false,
      }
    );
    navigate(MODULE_SHOPPING_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  const handleClearErrorsForm = (
    name: keyof z.infer<typeof formSchemaSearchBarShopping>
  ) => {
    form.clearErrors(name);
    form.resetField(name);
  };

  useEffect(() => {
    const addFilters = async () => {
      for (const key of Object.keys(paramsQuery)) {
        await handleAddFilter(
          key as keyof z.infer<typeof formSchemaSearchBarShopping>
        );
      }
    };

    if (querySuppliers.isSuccess && querySupplies.isSuccess && hasParamsQuery) {
      addFilters();
    }
  }, [querySuppliers.isSuccess, querySupplies.isSuccess, hasParamsQuery]);

  return (
    <div className="flex flex-col items-start justify-start my-4 sm:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          id="formSearch"
          className="flex flex-col w-full"
        >
          <DropdownMenu open={openDropDownMenu} modal={false}>
            <div className="flex flex-col items-center justify-center  md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Popover
                  open={openPopoverDate}
                  onOpenChange={setOpenPopoverDate}
                >
                  <PopoverTrigger asChild>
                    <Button
                      className="w-auto lg:w-[300px]"
                      variant={'outline'}
                      onClick={() => setOpenPopoverDate(true)}
                    >
                      {!form.getValues('filter_by_date.date') ||
                      !paramsQuery.filter_by_date?.date
                        ? 'Filtrar por fecha'
                        : formatTypeFilterDate(
                            form.getValues(
                              'filter_by_date.type_filter_date'
                            ) as TypeFilterDate
                          ) +
                          format(
                            form.getValues('filter_by_date.date') ?? '',
                            'PPP',
                            {
                              locale: es,
                            }
                          )}
                      <Calendar className="w-4 h-4 ml-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <FormFieldSelect
                      items={dateFilterOptions}
                      disabled={false}
                      {...formFieldsSearchBarShopping.type_filter_date}
                      name="filter_by_date.type_filter_date"
                      control={form.control}
                    />
                    <FormFieldCalendar
                      disabled={false}
                      {...formFieldsSearchBarShopping.date}
                      control={form.control}
                      name="filter_by_date.date"
                      className="w-[95%]"
                    />
                    <div className="flex justify-center gap-2">
                      <Button
                        className="self-end w-24 mt-4"
                        onClick={async (e) => {
                          e.preventDefault();
                          const result = await handleAddFilter(
                            'filter_by_date'
                          );
                          setOpenPopoverDate(!result);
                        }}
                      >
                        Aplicar
                      </Button>
                      <Button
                        variant={'destructive'}
                        className="self-end w-24 mt-4"
                        onClick={() => {
                          setOpenPopoverDate(false);
                          handleClearErrorsForm('filter_by_date');
                        }}
                      >
                        Cerrar
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <ToolTipTemplate content="Borrar consulta">
                  <Button
                    variant="outline"
                    onClick={handleResetForm}
                    size={'icon'}
                    disabled={readOnly}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </ToolTipTemplate>
              </div>

              <div className="self-start my-2 sm:self-center sm:m-0">
                <ToolTipTemplate content="Filtros">
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setOpenDropDownMenu((prev: boolean) => !prev)
                      }
                      size={'icon'}
                      disabled={readOnly}
                    >
                      <Filter className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </ToolTipTemplate>
              </div>
            </div>

            <DropdownMenuContent
              className="w-32"
              onPointerDownOutside={(e) => {
                e.preventDefault();
                setOpenDropDownMenu((prev: boolean) => !prev);
              }}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <FilterDropdownItem
                label={'Proveedores'}
                className=" lg:w-[280px]"
                content={
                  <>
                    <FormField
                      control={form.control}
                      name={`suppliers`}
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<any, any>;
                      }) => {
                        const currentEmployees = form.watch('suppliers');

                        return (
                          <FormItem className="">
                            <FormLabel className="block my-2">
                              {'Proveedores involucrados:'}
                            </FormLabel>
                            <Popover
                              open={openPopoverSupplier}
                              onOpenChange={setOpenPopoverSupplier}
                              modal={true}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  {querySuppliers.isLoading ? (
                                    <div className="w-[200px]">
                                      <Loading className="" />
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openPopoverSupplier}
                                      className={` ${cn(
                                        'justify-between',
                                        !field.value && 'text-muted-foreground'
                                      )}`}
                                      ref={field.ref}
                                      onBlur={field.onBlur}
                                      disabled={readOnly}
                                    >
                                      {field.value.length > 0 &&
                                      !!querySuppliers.data
                                        ? `${
                                            currentEmployees!.length
                                          } seleccionado(s)`
                                        : 'Selecciona proveedors'}

                                      <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                    </Button>
                                  )}
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder={`Buscar proveedor...`}
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <ScrollArea className="w-auto h-56 p-1 pr-2">
                                      <CommandEmpty>{`${CapitalizeFirstWord(
                                        'proveedor'
                                      )} no encontrado`}</CommandEmpty>
                                      <CommandGroup>
                                        {querySuppliers?.data?.rows.map(
                                          (item) => {
                                            return (
                                              <CommandItem
                                                value={item?.['first_name']}
                                                key={item.id!}
                                                onSelect={() => {
                                                  if (
                                                    field?.value?.some(
                                                      (i: any) =>
                                                        i.id === item?.id
                                                    )
                                                  ) {
                                                    form.setValue(
                                                      'suppliers',
                                                      [
                                                        ...field?.value?.filter(
                                                          (i: any) =>
                                                            i.id !== item?.id
                                                        ),
                                                      ],
                                                      {
                                                        shouldValidate: true,
                                                        shouldDirty: true,
                                                      }
                                                    );
                                                  } else {
                                                    form.setValue(
                                                      'suppliers',
                                                      [
                                                        ...(currentEmployees ||
                                                          []),
                                                        {
                                                          id: item.id,
                                                          first_name:
                                                            item['first_name'],
                                                        },
                                                      ],
                                                      {
                                                        shouldValidate: true,
                                                        shouldDirty: true,
                                                      }
                                                    );
                                                  }
                                                  setOpenPopoverSupplier(false);
                                                }}
                                              >
                                                <div className="">
                                                  {item?.['first_name']}
                                                </div>
                                                <CheckIcon
                                                  className={cn(
                                                    'ml-auto h-4 w-4',
                                                    field?.value.some(
                                                      (i: any) => {
                                                        return (
                                                          i.id === item?.id
                                                        );
                                                      }
                                                    )
                                                      ? 'opacity-100'
                                                      : 'opacity-0'
                                                  )}
                                                />
                                              </CommandItem>
                                            );
                                          }
                                        )}
                                      </CommandGroup>
                                    </ScrollArea>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              {'Cliente(s) que han participado en trabajos'}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </>
                }
                actionOnSave={() => handleAddFilter('suppliers')}
                actionOnClose={() => handleClearErrorsForm('suppliers')}
              />

              <FilterDropdownItem
                label={'Insumos'}
                className=" lg:w-[280px]"
                content={
                  <>
                    <FormField
                      control={form.control}
                      name={`supplies`}
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<any, any>;
                      }) => {
                        const currentCrops = form.watch('supplies');

                        return (
                          <FormItem className="">
                            <FormLabel className="block my-2">
                              {'Insumos involucrados:'}
                            </FormLabel>
                            <Popover
                              open={openPopoverSupply}
                              onOpenChange={setOpenPopoverSupply}
                              modal={true}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  {querySupplies.isLoading ? (
                                    <div className="w-[200px]">
                                      <Loading className="" />
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openPopoverSupply}
                                      className={` ${cn(
                                        'justify-between',
                                        !field.value && 'text-muted-foreground'
                                      )}`}
                                      ref={field.ref}
                                      onBlur={field.onBlur}
                                      disabled={readOnly}
                                    >
                                      {field.value.length > 0 &&
                                      !!querySupplies.data
                                        ? `${
                                            currentCrops!.length
                                          } seleccionado(s)`
                                        : 'Selecciona insumos'}

                                      <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                    </Button>
                                  )}
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder={`Buscar cliente...`}
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <ScrollArea className="w-auto h-56 p-1 pr-2">
                                      <CommandEmpty>{`${CapitalizeFirstWord(
                                        'cultivo'
                                      )} no encontrado`}</CommandEmpty>
                                      <CommandGroup>
                                        {querySupplies?.data?.rows.map(
                                          (item) => {
                                            return (
                                              <CommandItem
                                                value={item?.['name']}
                                                key={item.id!}
                                                onSelect={() => {
                                                  if (
                                                    field?.value?.some(
                                                      (i: any) =>
                                                        i.id === item?.id
                                                    )
                                                  ) {
                                                    form.setValue(
                                                      'supplies',
                                                      [
                                                        ...field?.value?.filter(
                                                          (i: any) =>
                                                            i.id !== item?.id
                                                        ),
                                                      ],
                                                      {
                                                        shouldValidate: true,
                                                        shouldDirty: true,
                                                      }
                                                    );
                                                  } else {
                                                    form.setValue(
                                                      'supplies',
                                                      [
                                                        ...(currentCrops || []),
                                                        {
                                                          id: item.id,
                                                          name: item['name'],
                                                        },
                                                      ],
                                                      {
                                                        shouldValidate: true,
                                                        shouldDirty: true,
                                                      }
                                                    );
                                                  }
                                                  setOpenPopoverSupply(false);
                                                }}
                                              >
                                                <div className="">
                                                  {item?.['name']}
                                                </div>
                                                <CheckIcon
                                                  className={cn(
                                                    'ml-auto h-4 w-4',
                                                    field?.value.some(
                                                      (i: any) => {
                                                        return (
                                                          i.id === item?.id
                                                        );
                                                      }
                                                    )
                                                      ? 'opacity-100'
                                                      : 'opacity-0'
                                                  )}
                                                />
                                              </CommandItem>
                                            );
                                          }
                                        )}
                                      </CommandGroup>
                                    </ScrollArea>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              {'Cultivo(s) que han participado en la compra'}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </>
                }
                actionOnSave={() => handleAddFilter('supplies')}
                actionOnClose={() => handleClearErrorsForm('supplies')}
              />

              <FilterDropdownItem
                label={'Total'}
                actionOnSave={() => handleAddFilter('filter_by_total')}
                actionOnClose={() => handleClearErrorsForm('filter_by_total')}
                content={
                  <>
                    <FormFieldSelect
                      disabled={false}
                      items={numberFilterOptions}
                      {...formFieldsSearchBarShopping.type_filter_total}
                      control={form.control}
                      name="filter_by_total.type_filter_total"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarShopping.total}
                      control={form.control}
                      type="number"
                      name="filter_by_total.total"
                    />
                  </>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <FiltersBadgedList
            filters={appliedFilters}
            handleRemove={handleRemoveFilter}
          />
        </form>
      </Form>
    </div>
  );
};
