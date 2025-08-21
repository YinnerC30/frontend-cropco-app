import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Form,
} from '@/components';
import { ToolTipTemplate } from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { formatTypeFilterNumber } from '@/modules/core/helpers/formatting/formatTypeFilterNumber';
import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';
import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';
import {
  formSchemaSearchBarPayment,
  MethodOfPaymentSearchBar,
} from '../../utils/formSchemaSearchBarPayment';

import { ButtonClearAllFilters } from '@/modules/core/components/search-bar/ButtonClearAllFilters';
import {
  PaymentSearchBarEmployeeFilter,
  PaymentSearchBarDateFilter,
  PaymentSearchBarValuePayFilter,
  PaymentSearchBarMethodOfPaymentFilter,
} from './search-bar';

const valuesResetForm = {
  employee: {
    id: '',
  },
  filter_by_date: {
    date: undefined,
    type_filter_date: TypeFilterDate.AFTER,
  },
  filter_by_value_pay: {
    type_filter_value_pay: TypeFilterNumber.LESS_THAN,
    value_pay: 0,
  },
  filter_by_method_of_payment: {
    method_of_payment: MethodOfPaymentSearchBar.NONE,
  },
};

export const PaymentModuleSearchbar: React.FC = () => {
  const {
    paramsQuery,
    hasParamsQuery,
    actionsPaymentsModule,
    appliedFilters,
    setAppliedFilters,
    queryEmployees,
  } = usePaymentModuleContext();
  const readOnly = !actionsPaymentsModule['find_all_payments'];
  const navigate = useNavigate();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarPayment>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarPayment,
    defaultValues: paramsQuery,
    skipDirty: true,
    validationMode: 'onSubmit',
  });

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleAddFilter = async (name: string): Promise<boolean> => {
    const isValid = await form.trigger(
      name as unknown as keyof z.infer<typeof formSchemaSearchBarPayment>
    );
    if (!isValid) return false;

    const {
      filter_by_value_pay,
      employee,
      filter_by_date,
      filter_by_method_of_payment,
    } = form.watch();

    const filters: FilterSearchBar[] = [];

    if (employee?.id) {
      const employeeData = queryEmployees.data?.records.find(
        (e) => e.id === employee.id
      );
      filters.push({
        key: 'employee',
        label: `Empleado: ${
          employeeData?.full_name || 'Empleado seleccionado'
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
        label: `Método de pago: ${filter_by_method_of_payment.method_of_payment}`,
      });
    }

    setAppliedFilters(filters);
    setOpenDropDownMenu(false);
    handleSearch(form.watch());
    return true;
  };

  const handleClearErrorsForm = (name: string) => {
    form.clearErrors(
      name as unknown as keyof z.infer<typeof formSchemaSearchBarPayment>
    );
  };

  const handleRemoveFilter = (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
    switch (filter.key) {
      case 'employee':
        form.setValue('employee', { id: '' }, { shouldDirty: false });
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

  const handleSearch = (values: z.infer<typeof formSchemaSearchBarPayment>) => {
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
    form.reset(valuesResetForm, {
      keepErrors: false,
      keepDirty: false,
    });
    navigate(MODULE_PAYMENTS_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  useEffect(() => {
    const addFilters = async () => {
      for (const key of Object.keys(paramsQuery)) {
        await handleAddFilter(key);
      }
    };
    if (queryEmployees.isSuccess && hasParamsQuery) {
      addFilters();
    }
  }, [queryEmployees.isSuccess, hasParamsQuery]);

  return (
    <div className="flex flex-col items-start justify-start my-4 sm:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          id="formSearch"
          className="flex flex-col w-full"
        >
          <DropdownMenu
            open={openDropDownMenu}
            onOpenChange={setOpenDropDownMenu}
            modal={false}
          >
            <div className="flex flex-col items-center justify-center md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <PaymentSearchBarEmployeeFilter
                  formSearchBar={form}
                  onAddFilter={handleAddFilter}
                  onClearErrors={handleClearErrorsForm}
                  paramsQuery={paramsQuery}
                  queryEmployees={queryEmployees}
                  disabled={readOnly}
                />

                <ButtonClearAllFilters
                  onClearValues={handleResetForm}
                  disabled={readOnly}
                />
              </div>

              <div className="self-start my-2 sm:self-center sm:m-0">
                <ToolTipTemplate content="Filtros">
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size={'icon'}
                      type="button"
                      disabled={readOnly}
                      data-testid="btn-payments-filters"
                    >
                      <Filter className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </ToolTipTemplate>
              </div>
            </div>

            <DropdownMenuContent
              className="w-auto"
              onPointerDownOutside={(e) => {
                // e.preventDefault();
                // e.stopImmediatePropagation();
              }}
            >
              <PaymentSearchBarDateFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                paramsQuery={paramsQuery}
                disabled={readOnly}
                formSearchBar={form}
              />
              <PaymentSearchBarValuePayFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                disabled={readOnly}
                formSearchBar={form}
              />
              <PaymentSearchBarMethodOfPaymentFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                disabled={readOnly}
                formSearchBar={form}
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
