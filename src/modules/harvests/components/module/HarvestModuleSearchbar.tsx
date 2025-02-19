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
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldInput,
  FormFieldSelect,
  Loading,
  ToolTipTemplate,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useGetAllCropsWithHarvest } from '@/modules/crops/hooks/queries/useGetAllCropsWithHarvest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { CapitalizeFirstWord } from '@/auth/helpers';
import { cn } from '@/lib/utils';
import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { formatTypeFilterNumber } from '@/modules/core/helpers/formatting/formatTypeFilterNumber';
import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import {
  dateFilterOptions,
  numberFilterOptions,
} from '@/modules/core/interfaces/queries/FilterOptions';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { useGetAllEmployeesWithHarvests } from '@/modules/payments/hooks/queries/useGetAllEmployeesWithHarvests';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckIcon, Filter, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarHarvest } from '../../utils/formFieldsSearchBarHarvest';
import { formSchemaSearchBarHarvest } from '../../utils/formSchemaSearchBarHarvest';

const valuesResetForm = {
  crop: {
    id: '',
    name: '',
  },
  filter_by_date: {
    date: undefined,
    type_filter_date: TypeFilterDate.after,
  },
  filter_by_total: {
    type_filter_total: TypeFilterNumber.MIN,
    total: 0,
  },
  filter_by_value_pay: {
    type_filter_value_pay: TypeFilterNumber.MIN,
    value_pay: 0,
  },
  employees: [],
};

export const HarvestModuleSearchbar: React.FC = () => {
  const {
    paramsQuery,
    hasParamsQuery,
    actionsHarvestsModule,
    appliedFilters,
    setAppliedFilters,
  } = useHarvestModuleContext();
  const readOnly = !actionsHarvestsModule['find_all_harvests'];
  const navigate = useNavigate();

  const { query: queryCrops } = useGetAllCropsWithHarvest({
    queryValue: '',
    allRecords: true,
  });

  const queryEmployees = useGetAllEmployeesWithHarvests();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarHarvest>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarHarvest,
    defaultValues: paramsQuery,
    skiptDirty: true,
    validationMode: 'onSubmit',
  });

  const handleAddFilter = async (name: string): Promise<boolean> => {
    const isValid = await form.trigger(
      name as unknown as keyof z.infer<typeof formSchemaSearchBarHarvest>
    );
    if (!isValid) return false;

    const {
      crop,
      filter_by_date,
      filter_by_total,
      filter_by_value_pay,
      employees = [],
    } = form.watch();

    const filters: FilterSearchBar[] = [];

    if (crop?.id) {
      filters.push({
        key: 'crop',
        label: `Cultivo: ${
          !crop.name
            ? queryCrops.data?.rows.find((c) => c.id === crop.id)?.name
            : crop?.name
        }`,
      });
    }
    if (employees?.length > 0) {
      filters.push({
        key: 'employees',
        label: `Empleados: ${
          employees.some((e) => !e.first_name === true)
            ? employees
                .map((e) => {
                  return queryEmployees.data?.rows.find((em) => em.id === e.id)
                    ?.first_name;
                })
                .join(', ')
            : employees.map((e) => e.first_name).join(', ')
        }`,
      });
    }

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

    setAppliedFilters(filters);
    setOpenDropDownMenu(false);
    handleSearch(form.watch());
    return true;
  };
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleClearErrorsForm = (name: string) => {
    form.clearErrors(
      name as unknown as keyof z.infer<typeof formSchemaSearchBarHarvest>
    );
  };

  const handleRemoveFilter = (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
    switch (filter.key) {
      case 'crop':
        form.setValue('crop', { id: '', name: '' }, { shouldDirty: false });
        break;
      case 'employees':
        form.setValue('employees', [], { shouldDirty: false });
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
      case 'value_pay':
        form.setValue('filter_by_value_pay.type_filter_value_pay', undefined, {
          shouldDirty: false,
        });
        form.setValue('filter_by_value_pay.value_pay', 0, {
          shouldDirty: false,
        });
        break;
    }
    handleSearch(form.watch());
  };

  const handleSearch = (values: z.infer<typeof formSchemaSearchBarHarvest>) => {
    const params = new URLSearchParams();

    if (values.crop?.id) {
      params.append('crop', values.crop.id);
    }
    if (values.employees!.length > 0) {
      params.append('employees', values.employees!.map((e) => e.id).join(','));
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
    navigate(`?${params.toString()}`);
  };

  const handleResetForm = () => {
    setAppliedFilters([]);
    form.reset(valuesResetForm, {
      keepErrors: false,
      keepDirty: false,
    });
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  const [openPopover, setOpenPopover] = useState(false);

  useEffect(() => {
    const addFilters = async () => {
      for (const key of Object.keys(paramsQuery)) {
        await handleAddFilter(key);
      }
    };
    if (queryCrops.isSuccess && queryEmployees.isSuccess && hasParamsQuery) {
      addFilters();
    }
  }, [queryCrops.isSuccess, queryEmployees.isSuccess]);

  return (
    <div className="flex flex-col items-start justify-start my-4 ">
      <DropdownMenu open={openDropDownMenu} modal={false}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            id="formSearch"
            className="flex flex-col w-full "
          >
            <div className="flex flex-col items-center justify-center md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <FormFieldCommand
                  data={queryCrops?.data?.rows || []}
                  form={form}
                  nameToShow={'name'}
                  control={form.control}
                  name={'crop'}
                  placeholder={formFieldsSearchBarHarvest.crop.placeholder}
                  className="lg:w-[300px]"
                  description={''}
                  label={''}
                  disabled={readOnly}
                  actionFinal={() => handleAddFilter('crop.id')}
                  isLoading={queryCrops.isLoading}
                />

                <div className="flex gap-2">
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
              </div>

              <div className="self-start mb-2 sm:self-center sm:m-0">
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
                label={'Empleados'}
                className=" lg:w-[280px]"
                content={
                  <>
                    <FormField
                      control={form.control}
                      name={`employees`}
                      render={({
                        field,
                      }: {
                        field: ControllerRenderProps<any, any>;
                      }) => {
                        const currentEmployees = form.watch('employees');

                        return (
                          <FormItem className="">
                            <FormLabel className="block my-2">
                              {'Empleados involucrados:'}
                            </FormLabel>
                            <Popover
                              open={openPopover}
                              onOpenChange={setOpenPopover}
                              modal={true}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  {queryEmployees.isLoading ? (
                                    <div className="w-[200px]">
                                      <Loading className="" />
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openPopover}
                                      className={` ${cn(
                                        'justify-between',
                                        !field.value && 'text-muted-foreground'
                                      )}`}
                                      ref={field.ref}
                                      onBlur={field.onBlur}
                                      disabled={readOnly}
                                    >
                                      {field.value.length > 0 &&
                                      !!queryEmployees.data
                                        ? `${
                                            currentEmployees!.length
                                          } seleccionado(s)`
                                        : 'Selecciona empleados'}

                                      <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                    </Button>
                                  )}
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder={`Buscar empleado...`}
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <ScrollArea className="w-auto h-56 p-1 pr-2">
                                      <CommandEmpty>{`${CapitalizeFirstWord(
                                        'empleado'
                                      )} no encontrado`}</CommandEmpty>
                                      <CommandGroup>
                                        {queryEmployees?.data?.rows.map(
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
                                                      'employees',
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
                                                      'employees',
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
                                                  setOpenPopover(false);
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
                              {
                                'Empleado(s) que han participado en el trabajo de cosecha en el cultivo'
                              }
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </>
                }
                actionOnSave={() => handleAddFilter('employees')}
                actionOnClose={() => handleClearErrorsForm('employees')}
              />
              <FilterDropdownItem
                label={'Fecha'}
                content={
                  <>
                    <FormFieldSelect
                      items={dateFilterOptions}
                      disabled={false}
                      {...formFieldsSearchBarHarvest.type_filter_date}
                      name="filter_by_date.type_filter_date"
                      control={form.control}
                    />
                    <FormFieldCalendar
                      disabled={false}
                      {...formFieldsSearchBarHarvest.date}
                      control={form.control}
                      name="filter_by_date.date"
                      className="w-[95%]"
                    />
                  </>
                }
                actionOnSave={() => handleAddFilter('filter_by_date')}
                actionOnClose={() => handleClearErrorsForm('filter_by_date')}
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
                      {...formFieldsSearchBarHarvest.type_filter_total}
                      control={form.control}
                      name="filter_by_total.type_filter_total"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarHarvest.total}
                      control={form.control}
                      type="number"
                      name="filter_by_total.total"
                    />
                  </>
                }
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
                      {...formFieldsSearchBarHarvest.type_filter_value_pay}
                      control={form.control}
                      name="filter_by_value_pay.type_filter_value_pay"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarHarvest.value_pay}
                      control={form.control}
                      type="number"
                      name="filter_by_value_pay.value_pay"
                    />
                  </>
                }
              />
            </DropdownMenuContent>

            <FiltersBadgedList
              filters={appliedFilters}
              handleRemove={handleRemoveFilter}
            />
          </form>
        </Form>
      </DropdownMenu>
    </div>
  );
};
