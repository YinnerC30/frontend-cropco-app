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
import { Filter, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import {
  dateFilterOptions,
  numberFilterOptions,
} from '@/modules/core/interfaces/queries/FilterOptions';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';
import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarPayment } from '../../utils/formFieldsSearchBarPayment';
import {
  formSchemaSearchBarPayment,
  MethodOfPaymentSearchBar,
} from '../../utils/formSchemaSearchBarPayment';

export const PaymentModuleSearchbar: React.FC = () => {
  const { paramsQuery, actionsPaymentsModule, queryEmployees, hasParamsQuery } =
    usePaymentModuleContext();
  const readOnly = !actionsPaymentsModule['find_all_payments'];
  const navigate = useNavigate();

  const form = useCreateForm({
    schema: formSchemaSearchBarPayment,
    defaultValues: paramsQuery,
    skipDirty: true,
    validationMode: 'onSubmit',
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleAddFilter = async (name = '') => {
    const isValid = await form.trigger(name);
    if (!isValid) return false;

    const {
      filter_by_value_pay,
      employee,
      filter_by_date,
      filter_by_method_of_payment,
    } = form.watch();

    const filters: FilterSearchBar[] = [];

    

    if (employee?.id) {
      filters.push({
        key: 'employee',
        label: `Empleado: ${employee.full_name}`,
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

    if (
      filter_by_method_of_payment.method_of_payment !==
        MethodOfPaymentSearchBar.NONE &&
      filter_by_method_of_payment.method_of_payment !== undefined
    ) {
      filters.push({
        key: 'method_of_payment',
        label: `Metodo de pago: ${filter_by_method_of_payment.method_of_payment}`,
      });
    }

    setAppliedFilters(filters);
    setOpenDropDownMenu(false);
    await handleSearch(form.watch());
    return true;
  };

  const handleClearErrorsForm = (name = '') => {
    form.clearErrors(name);
  };

  const handleRemoveFilter = (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
    switch (filter.key) {
      case 'employee':
        form.setValue('employee', { id: '', name: '' }, { shouldDirty: false });
        break;
      case 'date':
        form.setValue('filter_by_date.type_filter_date', undefined, {
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
      case 'method_of_payment':
        form.setValue(
          'filter_by_method_of_payment.method_of_payment',
          MethodOfPaymentSearchBar.NONE,
          {
            shouldDirty: false,
          }
        );
        break;
    }
    handleSearch(form.watch());
  };

  const handleSearch = async (values: any) => {
    const params = new URLSearchParams();

    if (values.employee?.id) {
      params.append('employee', values.employee.id);
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
      values.filter_by_method_of_payment.method_of_payment !==
        MethodOfPaymentSearchBar.NONE &&
      values.filter_by_method_of_payment.method_of_payment !== undefined
    ) {
      params.append('filter_by_method_of_payment', 'true');
      params.append(
        'method_of_payment',
        `${values.filter_by_method_of_payment.method_of_payment}`
      );
    }

    navigate(`?${params.toString()}`);
  };

  const handleResetForm = () => {
    setAppliedFilters([]);
    form.reset(
      {
        employee: {
          id: '',
          name: '',
        },
        filter_by_date: {
          date: undefined,
          type_filter_date: TypeFilterDate.after,
        },
        filter_by_value_pay: {
          type_filter_value_pay: TypeFilterNumber.MIN,
          value_pay: 0,
        },
      },
      {
        keepErrors: false,
        keepDirty: false,
      }
    );
    navigate(MODULE_PAYMENTS_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  useEffect(() => {
    const addFilters = async () => {
      for (const key of Object.keys(paramsQuery)) {
        await handleAddFilter(key);
      }
    };
    if (hasParamsQuery) {
      addFilters();
    }
  }, []);

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
                <FormFieldCommand
                  data={queryEmployees?.data?.records || []}
                  form={form}
                  nameToShow="full_name"
                  control={form.control}
                  name="employee"
                  placeholder={formFieldsSearchBarPayment.employee.placeholder}
                  className="w-auto lg:w-[300px]"
                  description={''}
                  label={''}
                  disabled={readOnly}
                  actionFinal={() => handleAddFilter('employee.id')}
                  isLoading={
                    queryEmployees.isLoading || queryEmployees.isFetching
                  }
                  reloadData={async () => {
                    await queryEmployees.refetch();
                  }}
                  contentTooltip="Actualizar datos de empleados involucrados"
                />

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
                label={'Fecha'}
                content={
                  <>
                    <FormFieldSelect
                      items={dateFilterOptions}
                      disabled={false}
                      {...formFieldsSearchBarPayment.type_filter_date}
                      name="filter_by_date.type_filter_date"
                      control={form.control}
                    />
                    <FormFieldCalendar
                      disabled={false}
                      {...formFieldsSearchBarPayment.date}
                      control={form.control}
                      name="filter_by_date.date"
                    />
                  </>
                }
                actionOnSave={() => handleAddFilter('filter_by_date')}
                actionOnClose={() => handleClearErrorsForm('filter_by_date')}
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
                      {...formFieldsSearchBarPayment.type_filter_value_pay}
                      control={form.control}
                      name="filter_by_value_pay.type_filter_value_pay"
                    />
                    <FormFieldInput
                      disabled={false}
                      {...formFieldsSearchBarPayment.value_pay}
                      control={form.control}
                      type="number"
                      name="filter_by_value_pay.value_pay"
                    />
                  </>
                }
              />
              <FilterDropdownItem
                label={'Metodo de pago'}
                actionOnSave={() =>
                  handleAddFilter('filter_by_method_of_payment')
                }
                actionOnClose={() =>
                  handleClearErrorsForm('filter_by_method_of_payment')
                }
                content={
                  <>
                    <FormFieldSelect
                      disabled={false}
                      items={[
                        {
                          key: MethodOfPaymentSearchBar.EFECTIVO,
                          value: MethodOfPaymentSearchBar.EFECTIVO,
                          label: 'Efectivo',
                        },
                        {
                          key: MethodOfPaymentSearchBar.INTERCAMBIO,
                          value: MethodOfPaymentSearchBar.INTERCAMBIO,
                          label: 'Intercambio',
                        },
                        {
                          key: MethodOfPaymentSearchBar.TRANSFERENCIA,
                          value: MethodOfPaymentSearchBar.TRANSFERENCIA,
                          label: 'Transferencia',
                        },
                        {
                          key: MethodOfPaymentSearchBar.NONE,
                          value: MethodOfPaymentSearchBar.NONE,
                          label: 'Ninguno',
                        },
                      ]}
                      {...formFieldsSearchBarPayment.method_of_payment}
                      control={form.control}
                      name="filter_by_method_of_payment.method_of_payment"
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
