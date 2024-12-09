import { Button, Form, Label, Separator } from '@/components';
import { FormFieldCalendar } from '@/modules/core/components/form/fields/FormFieldCalendar';
import { FormFieldCommand } from '@/modules/core/components/form/fields/FormFieldCommand';
import { FormFieldInput } from '@/modules/core/components/form/fields/FormFieldInput';
import { FormFieldSelect } from '@/modules/core/components/form/fields/FormFieldSelect';
import { FormFieldSwitch } from '@/modules/core/components/form/fields/FormFieldSwitch';
import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { useGetAllCropsWithHarvest } from '@/modules/crops/hooks/queries/useGetAllCropsWithHarvest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { TypeFilterDate, TypeFilterNumber } from '@/modules/core/interfaces';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { SearchbarHarvest } from '../../interfaces/SearchbarHarvest';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarHarvest } from '../../utils/formFieldsSearchBarHarvest';
import { formSchemaSearchBarHarvest } from '../../utils/formSchemaSearchBarHarvest';

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

  const onSubmit = async (values: SearchbarHarvest) => {
    const params = new URLSearchParams();

    if (values.crop?.id) {
      params.append('crop', values.crop.id);
    }

    if (values.filter_by_date && values.date) {
      params.append('filter_by_date', 'true');
      params.append('type_filter_date', `${values.type_filter_date}`);
      params.append('date', values.date.toISOString());
    }

    if (values.filter_by_total && values.total) {
      params.append('filter_by_total', 'true');
      params.append('type_filter_total', `${values.type_filter_total}`);
      params.append('total', `${values.total}`);
    }

    if (values.filter_by_value_pay && values.value_pay) {
      params.append('filter_by_value_pay', 'true');
      params.append('type_filter_value_pay', `${values.type_filter_value_pay}`);
      params.append('value_pay', `${values.value_pay}`);
    }

    navigate(`?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset(defaultValuesSearchbar);
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
    toast.success('Se han limpiado los filtros');
  };

  const isFilterByDate = form.watch('filter_by_date');
  const isFilterByTotal = form.watch('filter_by_total');
  const isFilterByValuePay = form.watch('filter_by_value_pay');

  return (
    <Form {...form}>
      <Label className="text-lg">Barra de filtrado de registros:</Label>
      <form
        onSubmit={form.handleSubmit(async (e) => {
          onSubmit(e);
        })}
        id="formSearch"
        className="flex flex-col gap-3 ml-2"
      >
        <FormFieldCommand
          data={queryCrops?.data?.rows || []}
          form={form}
          nameToShow="name"
          control={form.control}
          description={''}
          label={formFieldsSearchBarHarvest.crop.label}
          name="crop.id"
          placeholder={formFieldsSearchBarHarvest.crop.placeholder}
          readOnly={false}
        />
        <div className="flex flex-col gap-5">
          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={''}
              label={formFieldsSearchBarHarvest.filter_by_date.label}
              name="filter_by_date"
              placeholder={
                formFieldsSearchBarHarvest.filter_by_date.placeholder
              }
              readOnly={false}
            />
            {isFilterByDate && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[TypeFilterDate.after, TypeFilterDate.before]}
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
            )}
          </div>

          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={''}
              label={formFieldsSearchBarHarvest.filter_by_total.label}
              name="filter_by_total"
              placeholder={
                formFieldsSearchBarHarvest.filter_by_total.placeholder
              }
              readOnly={false}
            />
            {isFilterByTotal && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[
                    TypeFilterNumber.MIN,
                    TypeFilterNumber.MAX,
                    TypeFilterNumber.EQUAL,
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
            )}
          </div>

          <div className="p-3 border rounded-lg shadow-sm w-[320px]">
            <FormFieldSwitch
              control={form.control}
              description={''}
              label={formFieldsSearchBarHarvest.filter_by_value_pay.label}
              name="filter_by_value_pay"
              placeholder={
                formFieldsSearchBarHarvest.filter_by_value_pay.placeholder
              }
              readOnly={false}
            />
            {isFilterByValuePay && (
              <div className="flex flex-col gap-5">
                <Separator className="mt-2" />
                <FormFieldSelect
                  items={[
                    TypeFilterNumber.MIN,
                    TypeFilterNumber.MAX,
                    TypeFilterNumber.EQUAL,
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
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" form="formSearch">
              Buscar
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              Borrar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
