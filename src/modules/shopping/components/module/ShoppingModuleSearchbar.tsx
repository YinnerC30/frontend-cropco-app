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
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';
import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';
import { formSchemaSearchBarShopping } from '../../utils/formSchemaSearchBarShopping';

import { ButtonClearAllFilters } from '@/modules/core/components/search-bar/ButtonClearAllFilters';
import { ShoppingSearchBarDateFilter } from './search-bar/ShoppingSearchBarDateFilter';
import { ShoppingSearchBarSuppliersFilter } from './search-bar/ShoppingSearchBarSuppliersFilter';
import { ShoppingSearchBarSuppliesFilter } from './search-bar/ShoppingSearchBarSuppliesFilter';
import { ShoppingSearchBarValuePayFilter } from './search-bar/ShoppingSearchBarValuePayFilter';

const valuesResetForm = {
  filter_by_date: {
    date: undefined,
    type_filter_date: TypeFilterDate.AFTER,
  },
  filter_by_value_pay: {
    type_filter_value_pay: TypeFilterNumber.LESS_THAN,
    value_pay: 0,
  },
  suppliers: [],
  supplies: [],
};

export const ShoppingModuleSearchbar: React.FC = () => {
  const {
    paramsQuery,
    actionsShoppingModule,
    hasParamsQuery,
    querySupplies,
    querySuppliers,
  } = useShoppingModuleContext();
  const readOnly = !actionsShoppingModule['find_all_supplies_shopping'];
  const navigate = useNavigate();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarShopping>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarShopping,
    defaultValues: paramsQuery,
    skipDirty: true,
    validationMode: 'onChange',
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleAddFilter = async (
    name: keyof z.infer<typeof formSchemaSearchBarShopping>
  ) => {
    const isValid = await form.trigger(name);
    if (!isValid) return false;

    const {
      filter_by_date,
      filter_by_value_pay,
      suppliers = [],
      supplies = [],
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

    if (suppliers?.length > 0) {
      filters.push({
        key: 'suppliers',
        label: `Proveedores: ${
          suppliers.some((e) => !e.full_name === true)
            ? suppliers
                .map((e) => {
                  return querySuppliers.data?.records.find(
                    (cl) => cl.id === e.id
                  )?.full_name;
                })
                .join(', ')
            : suppliers.map((e) => e.full_name).join(', ')
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
                  return querySupplies.data?.records.find(
                    (cr) => cr.id === e.id
                  )?.name;
                })
                .join(', ')
            : supplies.map((e) => e.name).join(', ')
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

    setAppliedFilters(filters);
    setOpenDropDownMenu(false);
    await handleSearch(form.watch());
    return true;
  };

  const handleClearErrorsForm = (
    name: keyof z.infer<typeof formSchemaSearchBarShopping>
  ) => {
    form.clearErrors(name);
  };

  const handleRemoveFilter = (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
    switch (filter.key) {
      case 'suppliers':
        form.setValue('suppliers', [], { shouldDirty: false });
        break;
      case 'supplies':
        form.setValue('supplies', [], { shouldDirty: false });
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
    }
    handleSearch(form.watch());
  };

  const handleSearch = async (
    values: z.infer<typeof formSchemaSearchBarShopping>
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

    if (values.suppliers!.length > 0) {
      params.append('suppliers', values.suppliers!.map((e) => e.id).join(','));
    }
    if (values.supplies!.length > 0) {
      params.append('supplies', values.supplies!.map((e) => e.id).join(','));
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
    navigate(MODULE_SHOPPING_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
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
          <DropdownMenu
            open={openDropDownMenu}
            onOpenChange={setOpenDropDownMenu}
            modal={false}
          >
            <div className="flex flex-col items-center justify-center  md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <ShoppingSearchBarDateFilter
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
                      data-testid="btn-shopping-filters"
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
              // onCloseAutoFocus={(e) => {
              //   e.preventDefault();
              //   e.stopImmediatePropagation();
              // }}
            >
              <ShoppingSearchBarSuppliersFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                querySuppliers={querySuppliers}
                disabled={readOnly}
                formSearchBar={form}
              />
              <ShoppingSearchBarSuppliesFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                querySupplies={querySupplies}
                disabled={readOnly}
                formSearchBar={form}
              />
              <ShoppingSearchBarValuePayFilter
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
