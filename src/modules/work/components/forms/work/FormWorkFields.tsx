import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldDataTable,
  FormFieldInput,
  FormFieldTextArea,
} from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';
import { formFieldsWork } from '@/modules/work/utils/formFieldsWork';
import { FormWorkDataTable } from './FormWorkDataTable';

export const FormWorkFields: React.FC = () => {
  const { formWork, onSubmit, readOnly, total } = useFormWorkContext();

  const { query: queryCrops } = useGetAllCrops({
    queryValue: '',
    allRecords: true,
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
            readOnly={readOnly}
          />
          <FormFieldCommand
            data={queryCrops?.data?.rows || []}
            form={formWork}
            nameToShow={'name'}
            control={formWork.control}
            description={formFieldsWork.crop.description}
            label={formFieldsWork.crop.label}
            name={'crop'}
            placeholder={formFieldsWork.crop.placeholder}
            readOnly={readOnly}
            isLoading={queryCrops.isLoading}
            nameEntity="cultivo"
            className="w-52"
          />
          <FormFieldTextArea
            className="w-72"
            control={formWork.control}
            description={formFieldsWork.description.description}
            label={formFieldsWork.description.label}
            name={'description'}
            placeholder={formFieldsWork.description.placeholder}
            readOnly={readOnly}
          />
        </div>

        <div className="lg:w-[50%]">
          <FormFieldDataTable
            control={formWork.control}
            description={''}
            label={formFieldsWork.details.label}
            name={'details'}
            placeholder={''}
            readOnly={readOnly}
          >
            <FormWorkDataTable />
          </FormFieldDataTable>

          <FormFieldInput
            control={formWork.control}
            description={formFieldsWork.total.description}
            label={formFieldsWork.total.label}
            name={'total'}
            placeholder={formFieldsWork.total.placeholder}
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
        </div>
      </form>
    </Form>
  );
};
