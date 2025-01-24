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
import { Calendar, CheckIcon, Filter, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { useGetAllClientsWithSales } from '@/modules/clients/hooks/queries/useGetAllClientsWithSales';
import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import {
  dateFilterOptions,
  numberFilterOptions,
} from '@/modules/core/interfaces/queries/FilterOptions';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { useGetAllCropsWithSales } from '@/modules/crops/hooks/queries/useGetAllCropsWithSales';
import { Popover } from '@radix-ui/react-popover';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';
import { MODULE_SALES_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarSale } from '../../utils/formFieldsSearchBarSale';
import { formSchemaSearchBarSale } from '../../utils/formSchemaSearchBarSale';

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
import { CaretSortIcon } from '@radix-ui/react-icons';

const valuesResetForm = {
  filter_by_date: {
    date: undefined,
    type_filter_date: TypeFilterDate.after,
  },
  filter_by_total: {
    type_filter_total: TypeFilterNumber.MIN,
    total: 0,
  },
  filter_by_quantity: {
    type_filter_quantity: TypeFilterNumber.MIN,
    quantity: 0,
  },
  clients: [],
  crops: [],
};

export const SaleModuleSearchbar: React.FC = () => {
  const { paramsQuery, actionsSalesModule, hasParamsQuery } =
    useSaleModuleContext();
  const readOnly = !actionsSalesModule['find_all_sales'];
  const navigate = useNavigate();

  const queryClients = useGetAllClientsWithSales();
  const queryCrops = useGetAllCropsWithSales();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarSale>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarSale,
    defaultValues: paramsQuery,
    skiptDirty: true,
    validationMode: 'onChange',
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [openPopoverDate, setOpenPopoverDate] = useState(false);
  const [openPopoverClient, setOpenPopoverClient] = useState(false);
  const [openPopoverCrop, setOpenPopoverCrop] = useState(false);

  const handleAddFilter = async (
    name: keyof z.infer<typeof formSchemaSearchBarSale>
  ) => {
    const isValid = await form.trigger(name);
    if (!isValid) return false;

    const {
      filter_by_total,
      filter_by_quantity,
      clients = [],
      crops = [],
    } = form.watch();

    const filters: FilterSearchBar[] = [];

    if (clients?.length > 0) {
      filters.push({
        key: 'clients',
        label: `Clientes: ${
          clients.some((e) => !e.first_name === true)
            ? clients
                .map((e) => {
                  return queryClients.data?.rows.find((cl) => cl.id === e.id)
                    ?.first_name;
                })
                .join(', ')
            : clients.map((e) => e.first_name).join(', ')
        }`,
      });
    }
    if (crops?.length > 0) {
      filters.push({
        key: 'crops',
        label: `Cultivos: ${
          crops.some((e) => !e.name === true)
            ? crops
                .map((e) => {
                  return queryCrops.data?.rows.find((cr) => cr.id === e.id)
                    ?.name;
                })
                .join(', ')
            : crops.map((e) => e.name).join(', ')
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

    const { type_filter_quantity, quantity } = filter_by_quantity;
    if (type_filter_quantity && quantity) {
      const typeFilter = formatTypeFilterNumber(
        type_filter_quantity as TypeFilterNumber
      );
      filters.push({
        key: 'quantity',
        label: `Cantidad: ${typeFilter} ${filter_by_quantity.quantity}`,
      });
    }

    setAppliedFilters(filters);
    setOpenDropDownMenu(false);
    await handleSearch(form.watch());
    return true;
  };

  const handleClearErrorsForm = (
    name: keyof z.infer<typeof formSchemaSearchBarSale>
  ) => {
    form.clearErrors(name);
    form.resetField(name);
  };

  const handleRemoveFilter = (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
    switch (filter.key) {
      case 'clients':
        form.setValue('clients', [], { shouldDirty: false });
        break;
      case 'crops':
        form.setValue('crops', [], { shouldDirty: false });
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
      case 'quantity':
        form.setValue('filter_by_quantity.type_filter_quantity', undefined, {
          shouldDirty: false,
        });
        form.setValue('filter_by_quantity.quantity', 0, { shouldDirty: false });
        break;
    }
    handleSearch(form.watch());
  };

  const handleSearch = async (
    values: z.infer<typeof formSchemaSearchBarSale>
  ) => {
    const params = new URLSearchParams();

    if (values.filter_by_date.type_filter_date && values.filter_by_date.date) {
      params.append('filter_by_date', 'true');
      params.append(
        'type_filter_date',
        `${values.filter_by_date.type_filter_date}`
      );
      params.append('date', values.filter_by_date.date.toISOString());
    }

    if (values.clients!.length > 0) {
      params.append('clients', values.clients!.map((e) => e.id).join(','));
    }
    if (values.crops!.length > 0) {
      params.append('crops', values.crops!.map((e) => e.id).join(','));
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
    if (
      values.filter_by_quantity.type_filter_quantity &&
      values.filter_by_quantity.quantity
    ) {
      params.append('filter_by_quantity', 'true');
      params.append(
        'type_filter_quantity',
        `${values.filter_by_quantity.type_filter_quantity}`
      );
      params.append('quantity', `${values.filter_by_quantity.quantity}`);
    }

    navigate(`?${params.toString()}`);
  };

  const handleResetForm = () => {
    setAppliedFilters([]);
    form.reset(valuesResetForm, {
      keepErrors: false,
      keepDirty: false,
    });
    navigate(MODULE_SALES_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  useEffect(() => {
    const addFilters = async () => {
      console.log(paramsQuery);
      for (const key of Object.keys(paramsQuery)) {
        await handleAddFilter(
          key as keyof z.infer<typeof formSchemaSearchBarSale>
        );
      }
    };

    if (queryCrops.isSuccess && queryClients.isSuccess && hasParamsQuery) {
      addFilters();
    }
  }, [queryCrops.isSuccess, queryClients.isSuccess, hasParamsQuery]);

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
                      {...formFieldsSearchBarSale.type_filter_date}
                      name="filter_by_date.type_filter_date"
                      control={form.control}
                    />
                    <FormFieldCalendar
                      disabled={false}
                      {...formFieldsSearchBarSale.date}
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
                label={'Clientes'}
                className=" lg:w-[280px]"
                content={
                  <>
                    <FormField
                      control={form.control}
                      name={`clients`}
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<any, any>;
                      }) => {
                        const currentEmployees = form.watch('clients');

                        return (
                          <FormItem className="">
                            <FormLabel className="block my-2">
                              {'Clientes involucrados:'}
                            </FormLabel>
                            <Popover
                              open={openPopoverClient}
                              onOpenChange={setOpenPopoverClient}
                              modal={true}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  {queryClients.isLoading ? (
                                    <div className="w-[200px]">
                                      <Loading className="" />
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openPopoverClient}
                                      className={` ${cn(
                                        'justify-between',
                                        !field.value && 'text-muted-foreground'
                                      )}`}
                                      ref={field.ref}
                                      onBlur={field.onBlur}
                                      disabled={readOnly}
                                    >
                                      {field.value.length > 0 &&
                                      !!queryClients.data
                                        ? `${
                                            currentEmployees!.length
                                          } seleccionado(s)`
                                        : 'Selecciona clientes'}

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
                                        'cliente'
                                      )} no encontrado`}</CommandEmpty>
                                      <CommandGroup>
                                        {queryClients?.data?.rows.map(
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
                                                      'clients',
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
                                                      'clients',
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
                                                  setOpenPopoverClient(false);
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
                actionOnSave={() => handleAddFilter('clients')}
                actionOnClose={() => handleClearErrorsForm('clients')}
              />
              <FilterDropdownItem
                label={'Cultivos'}
                className=" lg:w-[280px]"
                content={
                  <>
                    <FormField
                      control={form.control}
                      name={`crops`}
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<any, any>;
                      }) => {
                        const currentCrops = form.watch('crops');

                        return (
                          <FormItem className="">
                            <FormLabel className="block my-2">
                              {'Cultivos involucrados:'}
                            </FormLabel>
                            <Popover
                              open={openPopoverCrop}
                              onOpenChange={setOpenPopoverCrop}
                              modal={true}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  {queryCrops.isLoading ? (
                                    <div className="w-[200px]">
                                      <Loading className="" />
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openPopoverCrop}
                                      className={` ${cn(
                                        'justify-between',
                                        !field.value && 'text-muted-foreground'
                                      )}`}
                                      ref={field.ref}
                                      onBlur={field.onBlur}
                                      disabled={readOnly}
                                    >
                                      {field.value.length > 0 &&
                                      !!queryCrops.data
                                        ? `${
                                            currentCrops!.length
                                          } seleccionado(s)`
                                        : 'Selecciona cultivos'}

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
                                        {queryCrops?.data?.rows.map((item) => {
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
                                                    'crops',
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
                                                    'crops',
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
                                                setOpenPopoverClient(false);
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
                                                      return i.id === item?.id;
                                                    }
                                                  )
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                                )}
                                              />
                                            </CommandItem>
                                          );
                                        })}
                                      </CommandGroup>
                                    </ScrollArea>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              {'Cultivo(s) que han participado en la venta'}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </>
                }
                actionOnSave={() => handleAddFilter('crops')}
                actionOnClose={() => handleClearErrorsForm('crops')}
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
                      {...formFieldsSearchBarSale.type_filter_total}
                      control={form.control}
                      name="filter_by_total.type_filter_total"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarSale.total}
                      control={form.control}
                      type="number"
                      name="filter_by_total.total"
                    />
                  </>
                }
              />

              <FilterDropdownItem
                label={'Cantidad'}
                actionOnSave={() => handleAddFilter('filter_by_quantity')}
                actionOnClose={() =>
                  handleClearErrorsForm('filter_by_quantity')
                }
                content={
                  <>
                    <FormFieldSelect
                      disabled={false}
                      items={numberFilterOptions}
                      {...formFieldsSearchBarSale.type_filter_quantity}
                      control={form.control}
                      name="filter_by_quantity.type_filter_quantity"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarSale.quantity}
                      control={form.control}
                      type="number"
                      name="filter_by_quantity.quantity"
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
