import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldDataTable,
  FormFieldInput,
  FormFieldTextArea,
} from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';
import { formFieldsWork } from '@/modules/work/utils/formFieldsWork';
import { FormWorkDataTable } from './FormWorkDataTable';

export const FormWorkFields: React.FC = () => {
  const { formWork, onSubmit, readOnly, value_pay } = useFormWorkContext();

  const disabledCropField = formWork.formState.defaultValues?.crop?.id !== '';

  const { query: queryCrops } = useGetAllCrops({
    queryValue: '',
    all_records: true,
  });

  return (
    <Form {...formWork}>
      <form
        onSubmit={formWork.handleSubmit(onSubmit)}
        id="formWork"
        className="flex flex-col lg:justify-evenly lg:flex-row"
      >
        <div className="w-3/4 lg:w-[40%]">
          <FormFieldCalendar
            control={formWork.control}
            description={formFieldsWork.date.description}
            label={formFieldsWork.date.label}
            name={'date'}
            placeholder={formFieldsWork.date.placeholder}
            disabled={readOnly}
            className="w-[240px]"
          />
          <FormFieldCommand
            data={
              queryCrops.isSuccess
                ? [
                    ...queryCrops.data?.records,
                    formWork.formState.defaultValues?.crop,
                  ]
                : []
            }
            form={formWork}
            nameToShow={'name'}
            control={formWork.control}
            description={formFieldsWork.crop.description}
            label={formFieldsWork.crop.label}
            name={'crop'}
            placeholder={formFieldsWork.crop.placeholder}
            disabled={readOnly || disabledCropField}
            isLoading={queryCrops.isLoading || queryCrops.isFetching}
            nameEntity="cultivo"
            className="w-52"
            reloadData={async () => {
              await queryCrops.refetch();
            }}
          />
          <FormFieldTextArea
            className="w-72"
            control={formWork.control}
            description={formFieldsWork.description.description}
            label={formFieldsWork.description.label}
            name={'description'}
            placeholder={formFieldsWork.description.placeholder}
            disabled={readOnly}
          />
        </div>

        <div className="lg:w-[50%]">
          <FormFieldDataTable
            control={formWork.control}
            description={''}
            label={formFieldsWork.details.label}
            name={'details'}
            placeholder={''}
            disabled={readOnly}
          >
            <FormWorkDataTable />
          </FormFieldDataTable>

          <FormFieldInput
            control={formWork.control}
            description={formFieldsWork.value_pay.description}
            label={formFieldsWork.value_pay.label}
            name={'value_pay'}
            placeholder={formFieldsWork.value_pay.placeholder}
            disabled={true}
            type="number"
            hiddenInput
          >
            <Badge
              className="block h-8 text-base text-center w-28"
              variant={'cyan'}
            >
              {FormatMoneyValue(value_pay)}
            </Badge>
          </FormFieldInput>
        </div>
      </form>
    </Form>
  );
};
