import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldDataTable,
  FormFieldInput,
  FormFieldTextArea,
} from '@/modules/core/components';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { formFieldsHarvest } from '@/modules/harvests/utils';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { FormHarvestDataTable } from './FormHarvestDataTable';

export const FormHarvestFields = () => {
  const { form, onSubmit, readOnly, total, value_pay } =
    useFormHarvestContext();

  const { query: queryCrops } = useGetAllCrops({
    queryValue: '',
    allRecords: true,
    canExecuteQuery: !readOnly,
  });

  console.log(form.watch());

  console.log(form.formState);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formHarvest"
        className="flex flex-col lg:justify-evenly lg:flex-row"
      >
        <div className="w-3/4 lg:w-[40%]">
          <FormFieldCalendar
            control={form.control}
            description={formFieldsHarvest.date.description}
            label={formFieldsHarvest.date.label}
            name={'date'}
            placeholder={formFieldsHarvest.date.placeholder}
            readOnly={readOnly}
          />
          <FormFieldCommand
            data={queryCrops?.data?.rows || []}
            form={form}
            nameToShow={'name'}
            control={form.control}
            description={formFieldsHarvest.crop.description}
            label={formFieldsHarvest.crop.label}
            name={'crop'}
            placeholder={formFieldsHarvest.crop.placeholder}
            readOnly={readOnly}
            isLoading={queryCrops.isLoading}
            nameEntity="cultivo"
            className="w-52"
          />
          <FormFieldTextArea
            className="w-72"
            control={form.control}
            description={formFieldsHarvest.observation.description}
            label={formFieldsHarvest.observation.label}
            name={'observation'}
            placeholder={formFieldsHarvest.observation.placeholder}
            readOnly={readOnly}
          />
        </div>

        <div className="lg:w-[50%]">
          <FormFieldDataTable
            control={form.control}
            description={''}
            label={formFieldsHarvest.details.label}
            name={'details'}
            placeholder={''}
            readOnly={readOnly}
          >
            <FormHarvestDataTable />
          </FormFieldDataTable>

          <FormFieldInput
            control={form.control}
            description={formFieldsHarvest.total.description}
            label={formFieldsHarvest.total.label}
            name={'total'}
            placeholder={formFieldsHarvest.total.placeholder}
            readOnly={true}
            type="number"
            hiddenInput
          >
            <Badge
              className="block h-8 text-base text-center w-28"
              variant={'cyan'}
            >
              {FormatNumber(total)}
            </Badge>
          </FormFieldInput>

          {/* TODO: Refactor */}
          <FormFieldInput
            className=""
            control={form.control}
            description={formFieldsHarvest.value_pay.description}
            label={formFieldsHarvest.value_pay.label}
            name={'value_pay'}
            placeholder={formFieldsHarvest.value_pay.placeholder}
            readOnly={true}
            type="number"
            hiddenInput
          >
            <Badge
              className="block h-8 text-base text-center w-28"
              variant={'indigo'}
            >
              {FormatMoneyValue(value_pay)}
            </Badge>
          </FormFieldInput>
        </div>
      </form>
    </Form>
  );
};
