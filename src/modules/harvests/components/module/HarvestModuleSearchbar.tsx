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

import {
  DateTimeSelection,
  MinorOrMajorSelection,
} from '@/modules/core/interfaces';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { formFieldsSearchBarHarvest } from '../../utils/formFieldsSearchBarHarvest';
import { formSchemaSearchBarHarvest } from '../../utils/formSchemaSearchBarHarvest';

const defaultValues = {
  crop: { id: '' },
  filter_by_date: false,
  date: undefined,
  date_time_selection: undefined,
  filter_by_total: false,
  total: undefined,
  minor_or_major_selection: undefined,
  filter_by_value_pay: false,
  value_pay: undefined,
  minor_or_major_value_pay_selection: undefined,
};

export const HarvestModuleSearchbar = () => {
  const { paramsQuery } = useHarvestModuleContext();

  const navigate = useNavigate();

  const { query: queryCrops } = useGetAllCropsWithHarvest({
    searchParameter: '',
    allRecords: true,
  });

  const { after_date = undefined, before_date = undefined } = paramsQuery;
  const isAfterDateValid =
    after_date !== undefined && before_date === undefined;
  const isBeforeDateValid =
    before_date !== undefined && after_date === undefined;

  const currentDate = new Date();

  const form = useCreateForm({
    schema: formSchemaSearchBarHarvest,
    defaultValues: {
      'crop.id': paramsQuery.crop,
      filter_by_date: isAfterDateValid || isBeforeDateValid,
      date_time_selection: isAfterDateValid
        ? DateTimeSelection.after
        : isBeforeDateValid
        ? DateTimeSelection.before
        : undefined,
      date: isAfterDateValid
        ? new Date(after_date)
        : isBeforeDateValid
        ? new Date(before_date)
        : currentDate,
      filter_by_total: paramsQuery.total,
      minor_or_major_selection: MinorOrMajorSelection.MAJOR,
      total: paramsQuery.total,
      filter_by_value_pay: paramsQuery.value_pay,
      minor_or_major_value_pay_selection: MinorOrMajorSelection.MAJOR,
      value_pay: paramsQuery.value_pay,
    },
  });

  const onSubmit = (values: any) => {
    const params = new URLSearchParams();
    if (values.crop?.id) {
      params.append('crop', values.crop.id);
    }
    if (values.filter_by_date && values.date) {
      const dateParam =
        values.date_time_selection === DateTimeSelection.after
          ? 'after_date'
          : 'before_date';
      params.append(dateParam, values.date.toISOString());
    }

    if (values.filter_by_total && values.total) {
      const totalParam =
        values.minor_or_major_selection === MinorOrMajorSelection.MINOR
          ? 'minor_total'
          : 'major_total';
      params.append(totalParam, values.total.toString());
    }

    if (values.filter_by_value_pay && values.value_pay) {
      const valuePayParam =
        values.minor_or_major_value_pay_selection ===
        MinorOrMajorSelection.MINOR
          ? 'minor_value_pay'
          : 'major_value_pay';
      params.append(valuePayParam, values.value_pay.toString());
    }
    navigate(`?${params.toString()}`);
  };

  const handleReset = () => {
    form.reset(defaultValues);
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
        onSubmit={form.handleSubmit((e) => {
          console.log('Se llamo');
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
                  items={[DateTimeSelection.after, DateTimeSelection.before]}
                  control={form.control}
                  description={
                    formFieldsSearchBarHarvest.date_time_selection.description
                  }
                  label={formFieldsSearchBarHarvest.date_time_selection.label}
                  name="date_time_selection"
                  placeholder={
                    formFieldsSearchBarHarvest.date_time_selection.placeholder
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
                    MinorOrMajorSelection.MINOR,
                    MinorOrMajorSelection.MAJOR,
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarHarvest.minor_or_major_selection
                      .description
                  }
                  label={
                    formFieldsSearchBarHarvest.minor_or_major_selection.label
                  }
                  name="minor_or_major_selection"
                  placeholder={
                    formFieldsSearchBarHarvest.minor_or_major_selection
                      .placeholder
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
                    MinorOrMajorSelection.MINOR,
                    MinorOrMajorSelection.MAJOR,
                  ]}
                  control={form.control}
                  description={
                    formFieldsSearchBarHarvest
                      .minor_or_major_value_pay_selection.description
                  }
                  label={
                    formFieldsSearchBarHarvest
                      .minor_or_major_value_pay_selection.label
                  }
                  name="minor_or_major_value_pay_selection"
                  placeholder={
                    formFieldsSearchBarHarvest
                      .minor_or_major_value_pay_selection.placeholder
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
