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
import { useSaleModuleContext } from '../../../hooks/context/useSaleModuleContext';
import { MODULE_SALES_PATHS } from '../../../routes/pathRoutes';
import { formSchemaSearchBarSale } from '../../../utils/formSchemaSearchBarSale';

import { ButtonClearAllFilters } from '@/modules/core/components/search-bar/ButtonClearAllFilters';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { SaleSearchBarDateFilter } from './SaleSearchBarDateFilter';
import { SaleSearchBarClientsFilter } from './SaleSearchBarClientsFilter';
import { SaleSearchBarCropsFilter } from './SaleSearchBarCropsFilter';
import { SaleSearchBarValuePayFilter } from './SaleSearchBarValuePayFilter';
import { SaleSearchBarAmountFilter } from './SaleSearchBarAmountFilter';

const valuesResetForm = {
  filter_by_date: {
    date: undefined,
    type_filter_date: TypeFilterDate.AFTER,
  },
  filter_by_value_pay: {
    type_filter_value_pay: TypeFilterNumber.LESS_THAN,
    value_pay: 0,
  },
  filter_by_amount: {
    type_filter_amount: TypeFilterNumber.LESS_THAN,
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
        form.setValue('filter_by_date.type_filter_date', TypeFilterDate.AFTER, {
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
          <DropdownMenu
            open={openDropDownMenu}
            onOpenChange={setOpenDropDownMenu}
            modal={false}
          >
            <div className="flex flex-col items-center justify-center  md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <SaleSearchBarDateFilter
                  formSearchBar={form}
                  onAddFilter={handleAddFilter}
                  onClearErrors={handleClearErrorsForm}
                  paramsQuery={paramsQuery}
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
                      data-testid="btn-sales-filters"
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
                e.preventDefault();
                e.stopImmediatePropagation();
              }}
              // onCloseAutoFocus={(e) => {
              //   e.preventDefault();
              //   e.stopImmediatePropagation();
              // }}
            >
              <SaleSearchBarClientsFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                queryClients={queryClients}
                disabled={readOnly}
                formSearchBar={form}
              />
              <SaleSearchBarCropsFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                queryCrops={queryCrops}
                disabled={readOnly}
                formSearchBar={form}
              />
              <SaleSearchBarValuePayFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                disabled={readOnly}
                formSearchBar={form}
              />

              <SaleSearchBarAmountFilter
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
