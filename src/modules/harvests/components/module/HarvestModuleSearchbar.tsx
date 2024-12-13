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
  ToolTipTemplate,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useGetAllCropsWithHarvest } from '@/modules/crops/hooks/queries/useGetAllCropsWithHarvest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { formatTypeFilterDate } from '@/modules/core/helpers/formatting/formatTypeFilterDate';
import { formatTypeFilterNumber } from '@/modules/core/helpers/formatting/formatTypeFilterNumber';
import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Filter, Search, X } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarHarvest } from '../../utils/formFieldsSearchBarHarvest';
import { formSchemaSearchBarHarvest } from '../../utils/formSchemaSearchBarHarvest';

interface FilterSearchBar {
  key: string;
  label: string;
}

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

const dateFilterOptions = [
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
];

export const HarvestModuleSearchbar = () => {
  const { paramsQuery, permissionsHarvest } = useHarvestModuleContext();
  const readOnly = !permissionsHarvest['find_all_harvests'];
  const navigate = useNavigate();
  const { query: queryCrops } = useGetAllCropsWithHarvest({
    searchParameter: '',
    allRecords: true,
  });
  const form = useCreateForm({
    schema: formSchemaSearchBarHarvest,
    defaultValues: paramsQuery,
    skiptDirty: true,
    validationMode: 'onSubmit',
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterSearchBar[]>([]);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const findCropInData = useCallback(
    (id: string) => {
      return queryCrops?.data?.rows.find((row: any) => row.id === id);
    },
    [queryCrops]
  );

  const handleAddFilter = async (name = '') => {
    const isValid = await form.trigger(name);
    if (!isValid) return false;

    const { crop, filter_by_date, filter_by_total, filter_by_value_pay } =
      form.watch();

    const filters: FilterSearchBar[] = [];

    if (crop?.id) {
      const data = findCropInData(crop.id);
      filters.push({
        key: 'crop',
        label: `Cultivo: ${data.name}`,
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

  const handleClearErrorsForm = (name = '') => {
    form.clearErrors(name);
  };

  const handleRemoveFilter = (filter: FilterSearchBar) => {
    setAppliedFilters((prev) => prev.filter((f) => f.key !== filter.key));
    switch (filter.key) {
      case 'crop':
        form.setValue('crop.id', '', { shouldDirty: false });
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

  const handleSearch = async (values: any) => {
    const params = new URLSearchParams();

    if (values.crop?.id) {
      params.append('crop', values.crop.id);
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
    form.reset(
      {
        crop: '',
        filter_by_date: {
          date: undefined,
          type_filter_date: TypeFilterDate.after,
        },
        filter_by_total: {
          type_filter_total: TypeFilterNumber.MIN,
          total: 0,
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
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  return (
    <div className="flex flex-col items-start justify-start w-[1000px]">
      <DropdownMenu open={openDropDownMenu} modal={false}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            id="formSearch"
            className="flex flex-col w-full"
          >
            <div className="flex flex-col items-center justify-center w-screen md:gap-1 sm:w-[100%] sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
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
                  readOnly={readOnly}
                  actionFinal={() => handleAddFilter('crop.id')}
                />
                <div className="flex gap-2">
                  <ToolTipTemplate content="Ejecutar consulta">
                    <Button
                      type="submit"
                      form="formSearch"
                      size={'icon'}
                      disabled={readOnly}
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </ToolTipTemplate>

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
                label={'Fecha'}
                content={
                  <>
                    <FormFieldSelect
                      items={dateFilterOptions}
                      readOnly={false}
                      {...formFieldsSearchBarHarvest.type_filter_date}
                      name="filter_by_date.type_filter_date"
                      control={form.control}
                    />
                    <FormFieldCalendar
                      readOnly={false}
                      {...formFieldsSearchBarHarvest.date}
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
                      readOnly={false}
                      items={numberFilterOptions}
                      {...formFieldsSearchBarHarvest.type_filter_total}
                      control={form.control}
                      name="filter_by_total.type_filter_total"
                    />
                    <FormFieldInput
                      readOnly={false}
                      {...formFieldsSearchBarHarvest.total}
                      control={form.control}
                      type="number"
                      name="filter_by_total.total"
                    />
                  </>
                }
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
                      readOnly={false}
                      items={numberFilterOptions}
                      {...formFieldsSearchBarHarvest.type_filter_value_pay}
                      control={form.control}
                      name="filter_by_value_pay.type_filter_value_pay"
                    />
                    <FormFieldInput
                      readOnly={false}
                      {...formFieldsSearchBarHarvest.value_pay}
                      control={form.control}
                      type="number"
                      name="filter_by_value_pay.value_pay"
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

const FilterDropdownItem = memo(
  ({
    label,
    content,
    actionOnSave,
    actionOnClose,
  }: {
    label: string;
    content: JSX.Element;
    actionOnSave: () => Promise<boolean>;
    actionOnClose: () => void;
  }) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <DropdownMenuSub open={openMenu} onOpenChange={setOpenMenu}>
        <DropdownMenuSubTrigger>{label}</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent
            className="w-[250px] p-4 ml-2"
            avoidCollisions
            sideOffset={0}
          >
            {content}
            <div className="flex justify-center gap-2">
              <Button
                className="self-end w-24 mt-4"
                onClick={async (e) => {
                  e.preventDefault();
                  const value = await actionOnSave();
                  setOpenMenu(!value);
                }}
              >
                Aplicar
              </Button>
              <Button
                variant={'destructive'}
                className="self-end w-24 mt-4"
                onClick={() => {
                  setOpenMenu(false);
                  actionOnClose();
                }}
              >
                Cerrar
              </Button>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  }
);

interface Props {
  filters: FilterSearchBar[];
  handleRemove: any;
}

const FiltersBadgedList = ({ filters, handleRemove }: Props) => {
  if (!(filters.length > 0)) {
    return;
  }
  return (
    <div className="mt-2 ">
      <Label className="block">Filtros aplicados:</Label>
      <div className="flex flex-wrap gap-2 my-4 ">
        {filters.map((filter, index) => (
          <Badge key={index} variant="secondary">
            {filter.label}
            <ToolTipTemplate content="Eliminar filtro">
              <Button
                className="ml-3"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(filter)}
              >
                <X className="w-3 h-3" />
              </Button>
            </ToolTipTemplate>
          </Badge>
        ))}
      </div>
    </div>
  );
};
