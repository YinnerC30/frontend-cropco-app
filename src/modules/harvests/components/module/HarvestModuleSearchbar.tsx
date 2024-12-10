import {
  Badge,
  Button,
  Form,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components';
import { FormFieldCalendar } from '@/modules/core/components/form/fields/FormFieldCalendar';
import { FormFieldCommand } from '@/modules/core/components/form/fields/FormFieldCommand';
import { FormFieldInput } from '@/modules/core/components/form/fields/FormFieldInput';
import { FormFieldSelect } from '@/modules/core/components/form/fields/FormFieldSelect';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useGetAllCropsWithHarvest } from '@/modules/crops/hooks/queries/useGetAllCropsWithHarvest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, DollarSign, Search, Sigma, X } from 'lucide-react';
import { useState } from 'react';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { SearchbarHarvest } from '../../interfaces/SearchbarHarvest';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarHarvest } from '../../utils/formFieldsSearchBarHarvest';
import { formSchemaSearchBarHarvest } from '../../utils/formSchemaSearchBarHarvest';

interface FilterSearchBar {
  key: string;
  label: string;
}

export const HarvestModuleSearchbar = () => {
  const { paramsQuery, defaultValuesSearchbar } = useHarvestModuleContext();

  const navigate = useNavigate();

  const { query: queryCrops } = useGetAllCropsWithHarvest({
    searchParameter: '',
    allRecords: true,
  });

  const form = useCreateForm({
    schema: formSchemaSearchBarHarvest,
    defaultValues: paramsQuery,
    skiptDirty: true,
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const resetFilters = () => {
    setAppliedFilters([]);
  };

  const removeFilter = (filter: FilterSearchBar) => {
    const newFilters = appliedFilters.filter((f) => f.key !== filter.key);
    setAppliedFilters(newFilters);

    switch (filter.key) {
      case 'crop':
        form.setValue('crop.id', '');
        break;
      case 'date':
        form.setValue('type_filter_date', undefined);
        form.setValue('date', undefined);
        break;
      case 'total':
        form.setValue('type_filter_total', undefined);
        form.setValue('total', 0);
        break;
      case 'value_pay':
        form.setValue('type_filter_value_pay', undefined);
        form.setValue('value_pay', 0);
        break;
    }
    onSubmit(form.watch());
  };

  const onSubmit = async (values: SearchbarHarvest) => {
    const params = new URLSearchParams();
    const filters: FilterSearchBar[] = [];

    if (values.crop?.id) {
      params.append('crop', values.crop.id);
      const crop = queryCrops?.data?.rows.find(
        (row: any) => row.id === values.crop.id
      );
      filters.push({
        key: 'crop',
        label: `Cultivo: ${crop.name}`,
      });
    }

    if (values.type_filter_date && values.date) {
      params.append('filter_by_date', 'true');
      params.append('type_filter_date', `${values.type_filter_date}`);
      params.append('date', values.date.toISOString());
      const formatTypeFilterDate =
        values.type_filter_date === TypeFilterDate.after
          ? 'Despues de:'
          : 'Antes de:';
      const formatDate = format(values.date, 'PPP', { locale: es });

      filters.push({
        key: 'date',
        label: `Fecha: ${formatTypeFilterDate} ${formatDate}`,
      });
    }

    if (values.type_filter_total && values.total) {
      params.append('filter_by_total', 'true');
      params.append('type_filter_total', `${values.type_filter_total}`);
      params.append('total', `${values.total}`);

      const formatTypeFilterTotal =
        values.type_filter_total === TypeFilterNumber.MAX
          ? 'Mayor a:'
          : values.type_filter_total === TypeFilterNumber.MIN
          ? 'Menor a:'
          : 'Igual a:';
      filters.push({
        key: 'total',
        label: `Total: ${formatTypeFilterTotal} ${values.total}`,
      });
    }

    if (values.type_filter_value_pay && values.value_pay) {
      params.append('filter_by_value_pay', 'true');
      params.append('type_filter_value_pay', `${values.type_filter_value_pay}`);
      params.append('value_pay', `${values.value_pay}`);
      const formatTypeFilterValuePay =
        values.type_filter_value_pay === TypeFilterNumber.MAX
          ? 'Mayor a:'
          : values.type_filter_value_pay === TypeFilterNumber.MIN
          ? 'Menor a:'
          : 'Igual a:';
      filters.push({
        key: 'value_pay',
        label: `Valor a pagar: ${formatTypeFilterValuePay} ${values.value_pay}`,
      });
    }

    setAppliedFilters(filters);
    navigate(`?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset(defaultValuesSearchbar);
    resetFilters();
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (e) => {
          onSubmit(e);
        })}
        id="formSearch"
        className="flex flex-col w-[500px] border p-4 rounded-md"
      >
        <div className="flex items-center justify-between">
          <FormFieldCommand
            data={queryCrops?.data?.rows || []}
            form={form}
            nameToShow="name"
            control={form.control}
            description={''}
            label={''}
            name="crop.id"
            placeholder={formFieldsSearchBarHarvest.crop.placeholder}
            readOnly={false}
            className="w-full"
          />
          <div className="flex justify-end gap-2">
            <Button type="submit" form="formSearch">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </div>

        <div className="flex gap-5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className="flex justify-between font-normal w-52"
              >
                Fecha
                <Calendar className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]" align="start">
              <div className="flex flex-col gap-4">
                <FormFieldSelect
                  items={[
                    {
                      key: TypeFilterDate.after,
                      value: TypeFilterDate.after,
                      label: 'Despues de',
                    },
                    {
                      key: TypeFilterDate.before,
                      value: TypeFilterDate.before,
                      label: 'Antes de',
                    },
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarHarvest.type_filter_date.description
                  }
                  label={formFieldsSearchBarHarvest.type_filter_date.label}
                  name="type_filter_date"
                  placeholder={
                    formFieldsSearchBarHarvest.type_filter_date.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldCalendar
                  control={form.control}
                  description={formFieldsSearchBarHarvest.date.description}
                  label={formFieldsSearchBarHarvest.date.label}
                  name="date"
                  placeholder={formFieldsSearchBarHarvest.date.placeholder}
                  readOnly={false}
                />
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className="flex justify-between font-normal w-52"
              >
                Total
                <Sigma className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
              <div className="flex flex-col gap-4">
                <FormFieldSelect
                  items={[
                    {
                      key: TypeFilterNumber.MIN,
                      value: TypeFilterNumber.MIN,
                      label: 'Menor a',
                    },
                    {
                      key: TypeFilterNumber.EQUAL,
                      value: TypeFilterNumber.EQUAL,
                      label: 'Igual a',
                    },
                    {
                      key: TypeFilterNumber.MAX,
                      value: TypeFilterNumber.MAX,
                      label: 'Mayor a',
                    },
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarHarvest.type_filter_total.description
                  }
                  label={formFieldsSearchBarHarvest.type_filter_total.label}
                  name="type_filter_total"
                  placeholder={
                    formFieldsSearchBarHarvest.type_filter_total.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldInput
                  control={form.control}
                  description={formFieldsSearchBarHarvest.total.description}
                  label={formFieldsSearchBarHarvest.total.label}
                  name="total"
                  placeholder={formFieldsSearchBarHarvest.total.placeholder}
                  type="number"
                  readOnly={false}
                />
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className="flex justify-between font-normal w-52"
              >
                Valor a pagar
                <DollarSign className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]" align="end">
              <div className="flex flex-col gap-4">
                <FormFieldSelect
                  items={[
                    {
                      key: TypeFilterNumber.MIN,
                      value: TypeFilterNumber.MIN,
                      label: 'Menor a',
                    },
                    {
                      key: TypeFilterNumber.EQUAL,
                      value: TypeFilterNumber.EQUAL,
                      label: 'Igual a',
                    },
                    {
                      key: TypeFilterNumber.MAX,
                      value: TypeFilterNumber.MAX,
                      label: 'Mayor a',
                    },
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarHarvest.type_filter_value_pay.description
                  }
                  label={formFieldsSearchBarHarvest.type_filter_value_pay.label}
                  name="type_filter_value_pay"
                  placeholder={
                    formFieldsSearchBarHarvest.type_filter_value_pay.placeholder
                  }
                  readOnly={false}
                />
                <FormFieldInput
                  control={form.control}
                  description={formFieldsSearchBarHarvest.value_pay.description}
                  label={formFieldsSearchBarHarvest.value_pay.label}
                  name="value_pay"
                  placeholder={formFieldsSearchBarHarvest.value_pay.placeholder}
                  type="number"
                  readOnly={false}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {appliedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {appliedFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {filter.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 ml-1 hover:bg-transparent"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="w-3 h-3" />
                  <span className="sr-only">Remover filtro</span>
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </form>
    </Form>
  );
};
