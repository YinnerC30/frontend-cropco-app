import {
  Badge,
  Button,
  Form,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldInput,
  FormFieldSelect,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useGetAllCropsWithHarvest } from '@/modules/crops/hooks/queries/useGetAllCropsWithHarvest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, DollarSign, Filter, Search, Sigma, X } from 'lucide-react';
import { useState } from 'react';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { SearchbarHarvest } from '../../interfaces/SearchbarHarvest';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarHarvest } from '../../utils/formFieldsSearchBarHarvest';
import { formSchemaSearchBarHarvest } from '../../utils/formSchemaSearchBarHarvest';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FilterSearchBar {
  key: string;
  label: string;
}

export const HarvestModuleSearchbar = () => {
  const { paramsQuery } = useHarvestModuleContext();
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

  const addFilter = () => {
    const values = form.watch();
    const filters: FilterSearchBar[] = [];
    if (values.crop?.id) {
      const crop = queryCrops?.data?.rows.find(
        (row: any) => row.id === values.crop.id
      );
      filters.push({
        key: 'crop',
        label: `Cultivo: ${crop.name}`,
      });
    }

    if (values.type_filter_date && values.date) {
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
    handleSearch(form.watch());
  };

  // Función para manejar la eliminación de filtros individuales
  const removeFilter = (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
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
    handleSearch(form.watch());
  };

  // Función para procesar filtros y enviar parámetros a la URL
  const handleSearch = async (values: SearchbarHarvest) => {
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
    form.reset({
      crop: '',
      date: undefined,
      type_filter_date: undefined,
      total: 0,
      type_filter_total: undefined,
      value_pay: 0,
      type_filter_value_pay: undefined,
    });
    setAppliedFilters([]);
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  // Opciones predefinidas para Popover
  const numberFilterOptions = [
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
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSearch)}
        id="formSearch"
        className="flex flex-col w-[900px]"
      >
        <Collapsible>
          <div className="flex items-center justify-center gap-2 ">
            <FormFieldCommand
              data={queryCrops?.data?.rows || []}
              form={form}
              nameToShow="name"
              control={form.control}
              name="crop.id"
              placeholder={formFieldsSearchBarHarvest.crop.placeholder}
              className="w-[300px]"
              description={''}
              label={''}
              readOnly={false}
              actionFinal={addFilter}
            />
            <div className="flex gap-2">
              <Button type="submit" form="formSearch">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <X className="w-4 h-4 mr-2 " />
                Limpiar
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2 " />
                  Filtros
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent>
            <div className="flex gap-2 justify-evenly">
              {/** Popover para filtros */}
              <FilterPopover
                label={'Fecha:'}
                icon={<Calendar className="w-4 h-4 ml-2" />}
                content={
                  <>
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
                      readOnly={false}
                      {...formFieldsSearchBarHarvest.type_filter_date}
                      control={form.control}
                    />
                    <FormFieldCalendar
                      readOnly={false}
                      {...formFieldsSearchBarHarvest.date}
                      control={form.control}
                    />
                  </>
                }
                actionOnSave={addFilter}
              />
              <FilterPopover
                label={'Total:'}
                icon={<Sigma className="w-4 h-4 ml-2" />}
                actionOnSave={addFilter}
                content={
                  <>
                    <FormFieldSelect
                      readOnly={false}
                      items={numberFilterOptions}
                      {...formFieldsSearchBarHarvest.type_filter_total}
                      control={form.control}
                    />
                    <FormFieldInput
                      readOnly={false}
                      {...formFieldsSearchBarHarvest.total}
                      control={form.control}
                      type="number"
                    />
                  </>
                }
              />
              <FilterPopover
                label={'Valor a pagar:'}
                icon={<DollarSign className="w-4 h-4 ml-2" />}
                actionOnSave={addFilter}
                content={
                  <>
                    <FormFieldSelect
                      readOnly={false}
                      items={numberFilterOptions}
                      {...formFieldsSearchBarHarvest.type_filter_value_pay}
                      control={form.control}
                    />
                    <FormFieldInput
                      readOnly={false}
                      {...formFieldsSearchBarHarvest.value_pay}
                      control={form.control}
                      type="number"
                    />
                  </>
                }
              />
            </div>
          </CollapsibleContent>

          {appliedFilters.length > 0 && (
            <div className="mt-2">
              <Label className="block">Filtros aplicados:</Label>
              <div className="flex flex-wrap items-center justify-center gap-2 my-4">
                {appliedFilters.map((filter, index) => (
                  <Badge key={index} variant="secondary">
                    {filter.label}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFilter(filter)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Collapsible>
      </form>
    </Form>
  );
};

// Componente genérico para los Popovers
const FilterPopover = ({
  label,
  icon,
  content,
  actionOnSave,
}: {
  label: string;
  icon: JSX.Element;
  content: JSX.Element;
  actionOnSave: () => void;
}) => {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-between w-auto"
          onClick={() => setOpenPopover(!openPopover)}
        >
          {label} {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] flex flex-col">
        {content}
        <Button
          className="self-end w-24 mt-4"
          onClick={() => {
            actionOnSave();
            setOpenPopover(false);
          }}
        >
          Guardar
        </Button>
      </PopoverContent>
    </Popover>
  );
};
