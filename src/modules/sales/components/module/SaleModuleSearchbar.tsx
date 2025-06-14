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
  ButtonRefetchData,
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

import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import {
  dateFilterOptions,
  numberFilterOptions,
} from '@/modules/core/interfaces/queries/FilterOptions';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
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
import {
  MassUnitOfMeasure,
  UnitsType,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { CaretSortIcon } from '@radix-ui/react-icons';

const valuesResetForm = {
  filter_by_date: {
    date: undefined,
    type_filter_date: TypeFilterDate.after,
  },
  filter_by_value_pay: {
    type_filter_value_pay: TypeFilterNumber.MIN,
    value_pay: 0,
  },
  filter_by_amount: {
    type_filter_amount: TypeFilterNumber.MIN,
    type_unit_of_measure: MassUnitOfMeasure.KILOGRAMOS,
    amount: 0,
  },
  clients: [],
  crops: [],
};

export const SaleModuleSearchbar: React.FC = () => {
  const {
    paramsQuery,
    actionsSalesModule,
    hasParamsQuery,
    queryClients,
    queryCrops,
  } = useSaleModuleContext();
  const readOnly = !actionsSalesModule['find_all_sales'];
  const navigate = useNavigate();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarSale>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarSale,
    defaultValues: paramsQuery,
    skipDirty: true,
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
      filter_by_date,
      filter_by_value_pay,
      filter_by_amount,
      clients = [],
      crops = [],
    } = form.watch();

    const filters: FilterSearchBar[] = [];

    const { type_filter_date, date } = filter_by_date;

    if (type_filter_date && date) {
      const typeFilter = formatTypeFilterDate(
        type_filter_date as TypeFilterDate
      );

      const formatDate = format(date, 'PPP', {
        locale: es,
      });

      filters.push({
        key: 'date',
        label: `Fecha: ${typeFilter} ${formatDate}`,
      });
    }

    if (clients?.length > 0) {
      filters.push({
        key: 'clients',
        label: `Clientes: ${
          clients.some((e) => !e.full_name === true)
            ? clients
                .map((e) => {
                  return queryClients.data?.records.find((cl) => cl.id === e.id)
                    ?.full_name;
                })
                .join(', ')
            : clients.map((e) => e.full_name).join(', ')
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
                  return queryCrops.data?.records.find((cr) => cr.id === e.id)
                    ?.name;
                })
                .join(', ')
            : crops.map((e) => e.name).join(', ')
        }`,
      });
    }

    const { type_filter_value_pay, value_pay } = filter_by_value_pay;
    if (type_filter_value_pay && value_pay) {
      const typeFilter = formatTypeFilterNumber(
        type_filter_value_pay as TypeFilterNumber
      );
      filters.push({
        key: 'value_pay',
        label: `Valor a pagar: ${typeFilter} ${filter_by_value_pay.value_pay}`,
      });
    }

    const { type_filter_amount, amount, type_unit_of_measure } =
      filter_by_amount;
    if (type_filter_amount && amount && type_unit_of_measure) {
      const typeFilter = formatTypeFilterNumber(
        type_filter_amount as TypeFilterNumber
      );
      filters.push({
        key: 'amount',
        label: `Cantidad: ${typeFilter} ${filter_by_amount.amount} ${type_unit_of_measure}`,
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
        form.setValue('filter_by_date.type_filter_date', TypeFilterDate.after, {
          shouldDirty: false,
        });
        form.setValue('filter_by_date.date', undefined, { shouldDirty: false });
        break;
      case 'value_pay':
        form.setValue('filter_by_value_pay.type_filter_value_pay', undefined, {
          shouldDirty: false,
        });
        form.setValue('filter_by_value_pay.value_pay', 0, {
          shouldDirty: false,
        });
        break;
      case 'amount':
        form.setValue('filter_by_amount.type_filter_amount', undefined, {
          shouldDirty: false,
        });
        form.setValue('filter_by_amount.amount', 0, { shouldDirty: false });
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
      values.filter_by_value_pay.type_filter_value_pay &&
      values.filter_by_value_pay.value_pay
    ) {
      params.append('filter_by_value_pay', 'true');
      params.append(
        'type_filter_value_pay',
        `${values.filter_by_value_pay.type_filter_value_pay}`
      );
      params.append('value_pay', `${values.filter_by_value_pay.value_pay}`);
    }
    if (
      values.filter_by_amount.type_filter_amount &&
      values.filter_by_amount.amount &&
      values.filter_by_amount.type_unit_of_measure
    ) {
      params.append('filter_by_amount', 'true');
      params.append(
        'type_filter_amount',
        `${values.filter_by_amount.type_filter_amount}`
      );
      params.append(
        'type_unit_of_measure',
        `${values.filter_by_amount.type_unit_of_measure}`
      );
      params.append('amount', `${values.filter_by_amount.amount}`);
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
                        onClick={async () => {
                          handleClearErrorsForm('filter_by_date');
                          await handleSearch(form.watch());
                          setOpenPopoverDate(false);
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
                    className="bg-destructive hover:bg-destructive/80"
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
                              <div className="flex gap-2">
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    {queryClients.isLoading ||
                                    queryClients.isFetching ? (
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
                                          !field.value &&
                                            'text-muted-foreground'
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
                                <ButtonRefetchData
                                  onClick={async () => {
                                    await queryClients.refetch();
                                  }}
                                  disabled={false}
                                  content="Actualizar datos de clientes involucrados"
                                />
                              </div>
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
                                        {queryClients?.data?.records.map(
                                          (item) => {
                                            return (
                                              <CommandItem
                                                value={item?.['full_name']}
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
                                                          full_name:
                                                            item['full_name'],
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
                                                  {item?.['full_name']}
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
                              {'Cliente(s) que han participado en las ventas'}
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
                              <div className="flex gap-2">
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    {queryCrops.isLoading ||
                                    queryCrops.isFetching ? (
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
                                          !field.value &&
                                            'text-muted-foreground'
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
                                <ButtonRefetchData
                                  onClick={async () => {
                                    await queryCrops.refetch();
                                  }}
                                  disabled={false}
                                  content="Actualizar datos de cultivos involucrados"
                                />
                              </div>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder={`Buscar cultivo...`}
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <ScrollArea className="w-auto h-56 p-1 pr-2">
                                      <CommandEmpty>{`${CapitalizeFirstWord(
                                        'cultivo'
                                      )} no encontrado`}</CommandEmpty>
                                      <CommandGroup>
                                        {queryCrops?.data?.records.map(
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
                                                  setOpenPopoverCrop(false);
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
                label={'Valor a pagar'}
                actionOnSave={() => handleAddFilter('filter_by_value_pay')}
                actionOnClose={() =>
                  handleClearErrorsForm('filter_by_value_pay')
                }
                content={
                  <>
                    <FormFieldSelect
                      disabled={false}
                      items={numberFilterOptions}
                      {...formFieldsSearchBarSale.type_filter_value_pay}
                      control={form.control}
                      name="filter_by_value_pay.type_filter_value_pay"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarSale.value_pay}
                      control={form.control}
                      type="number"
                      name="filter_by_value_pay.value_pay"
                    />
                  </>
                }
              />

              <FilterDropdownItem
                label={'Cantidad'}
                actionOnSave={() => handleAddFilter('filter_by_amount')}
                actionOnClose={() => handleClearErrorsForm('filter_by_amount')}
                content={
                  <>
                    <FormFieldSelect
                      disabled={false}
                      items={numberFilterOptions}
                      {...formFieldsSearchBarSale.type_filter_amount}
                      control={form.control}
                      name="filter_by_amount.type_filter_amount"
                    />
                    <FormFieldSelect
                      disabled={false}
                      items={UnitsType[MassUnitOfMeasure.GRAMOS]}
                      {...formFieldsSearchBarSale.type_unit_of_measure}
                      control={form.control}
                      name="filter_by_amount.type_unit_of_measure"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarSale.amount}
                      control={form.control}
                      type="number"
                      name="filter_by_amount.amount"
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
