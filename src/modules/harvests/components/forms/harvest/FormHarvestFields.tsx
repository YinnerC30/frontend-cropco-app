import { Badge, Form, Label } from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldDataTable,
  FormFieldTextArea,
} from '@/modules/core/components';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { formFieldsHarvest } from '@/modules/harvests/utils';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { FormHarvestDataTable } from './FormHarvestDataTable';

export const FormHarvestFields = () => {
  const {
    form,
    onSubmit,
    readOnly,
    detailsHarvest,
    total,
    value_pay,
    executeValidationFormHarvest,
  } = useFormHarvestContext();

  const { query: queryCrops } = useGetAllCrops({
    searchParameter: '',
    allRecords: true,
    canExecuteQuery: !readOnly,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (formData: any) => {
          const result = await executeValidationFormHarvest();
          if (result) {
            onSubmit(formData, detailsHarvest, total, value_pay);
          }
        })}
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
            name={'crop.id'}
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

          <Label>Total:</Label>
          <Badge
            className="block h-8 my-2 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(total)}
          </Badge>
          <p className="text-[0.8rem] text-muted-foreground">
            {formFieldsHarvest.total.description}
          </p>

          <Label>Valor a pagar:</Label>
          <Badge
            className="block h-8 my-2 text-base text-center w-28"
            variant={'indigo'}
          >
            {FormatMoneyValue(value_pay)}
          </Badge>
          <p className="text-[0.8rem] text-muted-foreground">
            {formFieldsHarvest.value_pay.description}
          </p>
        </div>
      </form>
    </Form>
  );
};
