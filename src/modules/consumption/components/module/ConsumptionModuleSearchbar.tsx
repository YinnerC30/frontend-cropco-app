import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components';
import {
  ButtonRefetchData,
  FormFieldCalendar,
  FormFieldSelect,
  Loading,
  ToolTipTemplate,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { TypeFilterDate } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, CheckIcon, Filter, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { CapitalizeFirstWord } from '@/auth';
import { cn } from '@/lib/utils';
import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import { dateFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarConsumption } from '../../utils/formFieldsSearchBarConsumption';
import { formSchemaSearchBarConsumption } from '../../utils/formSchemaSearchBarConsumption';

export const ConsumptionModuleSearchbar: React.FC = () => {
  const {
    paramsQuery,
    actionsConsumptionsModule,
    hasParamsQuery,
    querySupplies,
    queryCrops,
  } = useConsumptionModuleContext();
  const readOnly = !actionsConsumptionsModule['find_all_supplies_consumption'];
  const navigate = useNavigate();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarConsumption>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarConsumption,
    defaultValues: paramsQuery,
    skipDirty: true,
    validationMode: 'onSubmit',
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const [openPopoverDate, setOpenPopoverDate] = useState(false);
  const [openPopoverSupply, setOpenPopoverSupply] = useState(false);
  const [openPopoverSupplier, setOpenPopoverSupplier] = useState(false);

  const handleAddFilter = async (
    name: keyof z.infer<typeof formSchemaSearchBarConsumption>
  ) => {
    const isValid = await form.trigger(name);
    if (!isValid) return false;

    const { supplies = [], crops = [], filter_by_date } = form.watch();

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

    if (supplies?.length > 0) {
      filters.push({
        key: 'supplies',
        label: `Insumos: ${
          supplies.some((e) => !e.name === true)
            ? supplies
                .map((e) => {
                  return querySupplies.data?.records.find(
                    (cr) => cr.id === e.id
                  )?.name;
                })
                .join(', ')
            : supplies.map((e) => e.name).join(', ')
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

    setAppliedFilters(filters);

    setOpenDropDownMenu(false);
    await handleSearch(form.watch());
    return true;
  };

  const handleRemoveFilter = async (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
    switch (filter.key) {
      case 'crops':
        form.setValue('crops', [], { shouldDirty: false });
        break;
      case 'supplies':
        form.setValue('supplies', [], { shouldDirty: false });
        break;
      case 'date':
        form.setValue('filter_by_date.type_filter_date', TypeFilterDate.after, {
          shouldDirty: false,
        });
        form.setValue('filter_by_date.date', undefined, { shouldDirty: false });
        break;
    }
    await handleSearch(form.watch());
  };

  const handleClearErrorsForm = (
    name: keyof z.infer<typeof formSchemaSearchBarConsumption>
  ) => {
    form.clearErrors(name);
  };

  const handleSearch = async (
    values: z.infer<typeof formSchemaSearchBarConsumption>
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

    if (values.crops!.length > 0) {
      params.append('crops', values.crops!.map((e) => e.id).join(','));
    }
    if (values.supplies!.length > 0) {
      params.append('supplies', values.supplies!.map((e) => e.id).join(','));
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
        supplies: [],
        crops: [],
      },
      {
        keepErrors: false,
        keepDirty: false,
      }
    );
    navigate(MODULE_CONSUMPTION_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  useEffect(() => {
    const addFilters = async () => {
      for (const key of Object.keys(paramsQuery)) {
        await handleAddFilter(
          key as keyof z.infer<typeof formSchemaSearchBarConsumption>
        );
      }
    };

    if (queryCrops.isSuccess && querySupplies.isSuccess && hasParamsQuery) {
      addFilters();
    }
  }, [queryCrops.isSuccess, querySupplies.isSuccess, hasParamsQuery]);

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
                      {...formFieldsSearchBarConsumption.type_filter_date}
                      name="filter_by_date.type_filter_date"
                      control={form.control}
                    />
                    <FormFieldCalendar
                      disabled={false}
                      {...formFieldsSearchBarConsumption.date}
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
                        const currentEmployees = form.watch('crops');

                        return (
                          <FormItem className="">
                            <FormLabel className="block my-2">
                              {'Cultivos involucrados:'}
                            </FormLabel>
                            <Popover
                              open={openPopoverSupplier}
                              onOpenChange={setOpenPopoverSupplier}
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
                                        aria-expanded={openPopoverSupplier}
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
                                              currentEmployees!.length
                                            } seleccionado(s)`
                                          : 'Selecciona cultivo'}

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
                                  content="Actualizar datos de cultivo"
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
                                                        ...(currentEmployees ||
                                                          []),
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
                                                  setOpenPopoverSupplier(false);
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
                              {'Cultivos(s) que han participado en el consumo'}
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
                              <div className="flex gap-2">
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    {querySupplies.isLoading ||
                                    querySupplies.isFetching ? (
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
                                          !field.value &&
                                            'text-muted-foreground'
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
                                <ButtonRefetchData
                                  onClick={async () => {
                                    await querySupplies.refetch();
                                  }}
                                  disabled={false}
                                  content="Actualizar datos de insumos involucrados"
                                />
                              </div>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder={`Buscar insumo...`}
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <ScrollArea className="w-auto h-56 p-1 pr-2">
                                      <CommandEmpty>{`${CapitalizeFirstWord(
                                        'insumo'
                                      )} no encontrado`}</CommandEmpty>
                                      <CommandGroup>
                                        {querySupplies?.data?.records.map(
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
                              {'Insumos(s) que han participado en el consumo'}
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
