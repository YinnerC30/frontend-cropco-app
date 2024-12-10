import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Form,
  Label,
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

const FilterDropdownItem = ({
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
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <DropdownMenuSub open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuSubTrigger>{label}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="p-4 ml-2">
          {content}
          <div className="flex justify-center gap-2">
            <Button
              className="self-end w-24 mt-4"
              onClick={() => {
                actionOnSave();
                setOpenMenu(false);
              }}
            >
              Aplicar
            </Button>
            <Button
              variant={'destructive'}
              className="self-end w-24 mt-4"
              onClick={() => {
                setOpenMenu(false);
              }}
            >
              Cerrar
            </Button>
          </div>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

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

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

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
          ? 'Despues del'
          : 'Antes del';
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
    setOpenDropDownMenu(false);
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

    if (values.crop?.id) {
      params.append('crop', values.crop.id);
    }

    if (values.type_filter_date && values.date) {
      params.append('filter_by_date', 'true');
      params.append('type_filter_date', `${values.type_filter_date}`);
      params.append('date', values.date.toISOString());
    }

    if (values.type_filter_total && values.total) {
      params.append('filter_by_total', 'true');
      params.append('type_filter_total', `${values.type_filter_total}`);
      params.append('total', `${values.total}`);
    }

    if (values.type_filter_value_pay && values.value_pay) {
      params.append('filter_by_value_pay', 'true');
      params.append('type_filter_value_pay', `${values.type_filter_value_pay}`);
      params.append('value_pay', `${values.value_pay}`);
    }

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
    <DropdownMenu
      open={openDropDownMenu}
      onOpenChange={setOpenDropDownMenu}
      modal={false}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          id="formSearch"
          className="flex flex-col w-full"
        >
          <div className="flex items-center gap-2 ">
            <FormFieldCommand
              data={queryCrops?.data?.rows || []}
              form={form}
              nameToShow="name"
              control={form.control}
              name="crop.id"
              placeholder={formFieldsSearchBarHarvest.crop.placeholder}
              className="w-auto lg:w-[300px]"
              description={''}
              label={''}
              readOnly={false}
              actionFinal={addFilter}
            />
            <div className="flex gap-2">
              <Button type="submit" form="formSearch" size={'icon'}>
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={handleReset} size={'icon'}>
                <X className="w-4 h-4" />
              </Button>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setOpenDropDownMenu(true)}
                  size={'icon'}
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
            </div>
          </div>

          <DropdownMenuContent
            className="w-56"
            side="right"
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <FilterDropdownItem
              label={'Fecha'}
              icon={<Calendar className="w-4 h-4 ml-2" />}
              content={
                <>
                  <FormFieldSelect
                    items={[
                      {
                        key: TypeFilterDate.after,
                        value: TypeFilterDate.after,
                        label: 'Despues del',
                      },
                      {
                        key: TypeFilterDate.before,
                        value: TypeFilterDate.before,
                        label: 'Antes del',
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
            <FilterDropdownItem
              label={'Total'}
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
            <FilterDropdownItem
              label={'Valor a pagar'}
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
          </DropdownMenuContent>

          {appliedFilters.length > 0 && (
            <div className="mt-2 ">
              <Label className="block">Filtros aplicados:</Label>
              <div className="flex flex-wrap gap-2 my-4 ">
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
        </form>
      </Form>
    </DropdownMenu>
  );
};
