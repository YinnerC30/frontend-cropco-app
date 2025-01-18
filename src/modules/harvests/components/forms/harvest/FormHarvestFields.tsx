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

export const FormHarvestFields: React.FC = () => {
  const { formHarvest, onSubmit, readOnly, total, value_pay } =
    useFormHarvestContext();

  const disabledCropField =
    formHarvest.formState.defaultValues?.crop?.id !== '';

  const { query: queryCrops } = useGetAllCrops({
    queryValue: '',
    allRecords: true,
  });

  return (
    <Form {...formHarvest}>
      <form
        onSubmit={formHarvest.handleSubmit(onSubmit)}
        id="formHarvest"
        className="flex flex-col lg:justify-evenly lg:flex-row"
      >
        <div className="w-3/4 lg:w-[40%]">
          <FormFieldCalendar
            control={formHarvest.control}
            description={formFieldsHarvest.date.description}
            label={formFieldsHarvest.date.label}
            name={'date'}
            placeholder={formFieldsHarvest.date.placeholder}
            disabled={readOnly}
          />
          <FormFieldCommand
            data={queryCrops?.data?.rows || []}
            form={formHarvest}
            nameToShow={'name'}
            control={formHarvest.control}
            description={formFieldsHarvest.crop.description}
            label={formFieldsHarvest.crop.label}
            name={'crop'}
            placeholder={formFieldsHarvest.crop.placeholder}
            disabled={readOnly || disabledCropField}
            isLoading={queryCrops.isLoading}
            nameEntity="cultivo"
            className="w-52"
          />
          <FormFieldTextArea
            className="w-72"
            control={formHarvest.control}
            description={formFieldsHarvest.observation.description}
            label={formFieldsHarvest.observation.label}
            name={'observation'}
            placeholder={formFieldsHarvest.observation.placeholder}
            disabled={readOnly}
          />
        </div>

        <div className="lg:w-[50%]">
          <FormFieldDataTable
            control={formHarvest.control}
            description={''}
            label={formFieldsHarvest.details.label}
            name={'details'}
            placeholder={''}
            disabled={readOnly}
          >
            <FormHarvestDataTable />
          </FormFieldDataTable>

          <FormFieldInput
            control={formHarvest.control}
            description={formFieldsHarvest.total.description}
            label={formFieldsHarvest.total.label}
            name={'total'}
            placeholder={formFieldsHarvest.total.placeholder}
            disabled={true}
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
            control={formHarvest.control}
            description={formFieldsHarvest.value_pay.description}
            label={formFieldsHarvest.value_pay.label}
            name={'value_pay'}
            placeholder={formFieldsHarvest.value_pay.placeholder}
            disabled={true}
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
