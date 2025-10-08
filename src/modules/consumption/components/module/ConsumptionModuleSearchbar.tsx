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
import { TypeFilterDate } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { FiltersBadgedList } from '@/modules/core/components/search-bar/FiltersBadgedList';
import { FilterSearchBar } from '@/modules/core/interfaces/queries/FilterSearchBar';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';
import { formSchemaSearchBarConsumption } from '../../utils/formSchemaSearchBarConsumption';

import { ButtonClearAllFilters } from '@/modules/core/components/search-bar/ButtonClearAllFilters';
import { ConsumptionSearchBarDateFilter } from './search-bar/ConsumptionSearchBarDateFilter';
import { ConsumptionSearchBarCropsFilter } from './search-bar/ConsumptionSearchBarCropsFilter';
import { ConsumptionSearchBarSuppliesFilter } from './search-bar/ConsumptionSearchBarSuppliesFilter';

const valuesResetForm = {
  filter_by_date: {
    date: undefined,
    type_filter_date: TypeFilterDate.AFTER,
  },
  supplies: [],
  crops: [],
};

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
        form.setValue('filter_by_date.type_filter_date', TypeFilterDate.AFTER, {
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
    form.reset(valuesResetForm, {
      keepErrors: false,
      keepDirty: false,
    });
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
          <DropdownMenu
            open={openDropDownMenu}
            onOpenChange={setOpenDropDownMenu}
            modal={false}
          >
            <div className="flex flex-col items-center justify-center  md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <ConsumptionSearchBarDateFilter
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
                      data-testid="btn-consumption-filters"
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
              <ConsumptionSearchBarCropsFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                queryCrops={queryCrops}
                disabled={readOnly}
                formSearchBar={form}
              />
              <ConsumptionSearchBarSuppliesFilter
                onAddFilter={handleAddFilter}
                onClearErrors={handleClearErrorsForm}
                querySupplies={querySupplies}
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
