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
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';
import { MODULE_WORKS_PATHS } from '../../routes/pathRoutes';
import { formSchemaSearchBarWork } from '../../utils/formSchemaSearchBarWork';

import { ButtonClearAllFilters } from '@/modules/core/components/search-bar/ButtonClearAllFilters';
import { WorkSearchBarCropFilter } from './search-bar/WorkSearchBarCropFilter';
import { WorkSearchBarDateFilter } from './search-bar/WorkSearchBarDateFilter';
import { WorkSearchBarEmployeesFilter } from './search-bar/WorkSearchBarEmployeesFilter';
import { WorkSearchBarValuePayFilter } from './search-bar/WorkSearchBarValuePayFilter';

const valuesResetForm = {
  crop: {
    id: '',
    name: '',
  },
  filter_by_date: {
    date: undefined,
    type_filter_date: TypeFilterDate.AFTER,
  },
  filter_by_value_pay: {
    type_filter_value_pay: TypeFilterNumber.LESS_THAN,
    value_pay: 0,
  },
  employees: [],
};

export const WorkModuleSearchbar: React.FC = () => {
  const {
    paramsQuery,
    hasParamsQuery,
    actionsWorksModule,
    appliedFilters,
    setAppliedFilters,
    queryCrops,
    queryEmployees,
  } = useWorkModuleContext();
  const readOnly = !actionsWorksModule['find_all_works'];
  const navigate = useNavigate();

  const form: UseFormReturn<
    z.infer<typeof formSchemaSearchBarWork>,
    unknown
  > = useCreateForm({
    schema: formSchemaSearchBarWork,
    defaultValues: paramsQuery,
    skipDirty: true,
    validationMode: 'onSubmit',
  });

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const handleAddFilter = async (name: string): Promise<boolean> => {
    const isValid = await form.trigger(
      name as unknown as keyof z.infer<typeof formSchemaSearchBarWork>
    );
    if (!isValid) return false;

    const {
      crop,
      filter_by_date,
      filter_by_value_pay,
      employees = [],
    } = form.watch();

    const filters: FilterSearchBar[] = [];

    if (crop?.id) {
      filters.push({
        key: 'crop',
        label: `Cultivo: ${
          !crop.name
            ? queryCrops.data?.records.find((c) => c.id === crop.id)?.name
            : crop?.name
        }`,
      });
    }
    if (employees?.length > 0) {
      filters.push({
        key: 'employees',
        label: `Empleados: ${
          employees.some((e) => !e.full_name === true)
            ? employees
                .map((e) => {
                  return queryEmployees.data?.records.find(
                    (em) => em.id === e.id
                  )?.full_name;
                })
                .join(', ')
            : employees.map((e) => e.full_name).join(', ')
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

  const handleSearch = (values: z.infer<typeof formSchemaSearchBarWork>) => {
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
                <WorkSearchBarCropFilter
                  formSearchBar={form}
                  onAddFilter={handleAddFilter}
                  onClearErrors={handleClearErrorsForm}
                  paramsQuery={paramsQuery}
                  queryCrops={queryCrops}
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
                      data-testid="btn-works-filters"
                    >
                      <Filter className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </ToolTipTemplate>
              </div>
            </div>

            <DropdownMenuContent
              className="w-auto"
              onPointerDownOutside={() => {
                // Prevent default behavior
              }}
            >
              <WorkSearchBarEmployeesFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                queryEmployees={queryEmployees}
                disabled={readOnly}
                formSearchBar={form}
              />
              <WorkSearchBarDateFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                paramsQuery={paramsQuery}
                disabled={readOnly}
                formSearchBar={form}
              />
              <WorkSearchBarValuePayFilter
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
