import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Form,
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
import { useGetAllCropsWithWork } from '@/modules/crops/hooks/queries/useGetAllCropsWithWork';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { formatTypeFilterNumber } from '@/modules/core/helpers/formatting/formatTypeFilterNumber';
import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Filter, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import {
  dateFilterOptions,
  numberFilterOptions,
} from '@/modules/core/interfaces/queries/FilterOptions';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';
import { MODULE_WORKS_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarWork } from '../../utils/formFieldsSearchBarWork';
import { formSchemaSearchBarWork } from '../../utils/formSchemaSearchBarWork';

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
import { useGetAllEmployeesWithWorks } from '@/modules/payments/hooks/queries/useGetAllEmployeesWithWorks';

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
  employees: [],
};

export const WorkModuleSearchbar = () => {
  const { paramsQuery, actionsWorksModule, hasParamsQuery } =
    useWorkModuleContext();
  const readOnly = !actionsWorksModule['find_all_works'];
  const [openPopover, setOpenPopover] = useState(false);
  const navigate = useNavigate();
  const queryCrops = useGetAllCropsWithWork();

  const queryEmployees = useGetAllEmployeesWithWorks();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarWork>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarWork,
    defaultValues: paramsQuery,
    skiptDirty: true,
    validationMode: 'onSubmit',
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleAddFilter = async (name: string) => {
    const isValid = await form.trigger(
      name as unknown as keyof z.infer<typeof formSchemaSearchBarWork>
    );
    if (!isValid) return false;

    const {
      crop,
      filter_by_date,
      filter_by_total,
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

    setAppliedFilters(filters);
    setOpenDropDownMenu(false);
    handleSearch(form.watch());
    return true;
  };

  const handleClearErrorsForm = (name: string) => {
    form.clearErrors(
      name as unknown as keyof z.infer<typeof formSchemaSearchBarWork>
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
    }
    handleSearch(form.watch());
  };

  const handleSearch = async (
    values: z.infer<typeof formSchemaSearchBarWork>
  ) => {
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

    navigate(`?${params.toString()}`);
  };

  const handleResetForm = (): void => {
    setAppliedFilters([]);
    form.reset(valuesResetForm, {
      keepErrors: false,
      keepDirty: false,
    });
    navigate(MODULE_WORKS_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  useEffect(() => {
    const addFilters = async () => {
      for (const key of Object.keys(paramsQuery)) {
        await handleAddFilter(key);
      }
    };
    if (queryCrops.isSuccess && queryEmployees.isSuccess && hasParamsQuery) {
      addFilters();
    }
  }, [queryCrops.isSuccess, queryEmployees.isSuccess, hasParamsQuery]);

  return (
    <div className="flex flex-col items-start justify-start my-4 sm:w-full">
      <DropdownMenu open={openDropDownMenu} modal={false}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            id="formSearch"
            className="flex flex-col w-full"
          >
            <div className="flex flex-col items-center justify-center  md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <FormFieldCommand
                  data={queryCrops?.data?.rows || []}
                  form={form}
                  nameToShow="name"
                  control={form.control}
                  name="crop"
                  placeholder={formFieldsSearchBarWork.crop.placeholder}
                  className="w-auto lg:w-[300px]"
                  description={''}
                  label={''}
                  disabled={readOnly}
                  actionFinal={() => handleAddFilter('crop.id')}
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
                              {'Empleado(s) que han participado en trabajos'}
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
                      {...formFieldsSearchBarWork.type_filter_date}
                      name="filter_by_date.type_filter_date"
                      control={form.control}
                    />
                    <FormFieldCalendar
                      disabled={false}
                      {...formFieldsSearchBarWork.date}
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
                      {...formFieldsSearchBarWork.type_filter_total}
                      control={form.control}
                      name="filter_by_total.type_filter_total"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarWork.total}
                      control={form.control}
                      type="number"
                      name="filter_by_total.total"
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
