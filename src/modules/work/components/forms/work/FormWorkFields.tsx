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

export const FormWorkFields = () => {
  const { form, onSubmit, readOnly, total } = useFormWorkContext();

  const { query: queryCrops } = useGetAllCrops({
    searchParameter: '',
    allRecords: true,
    canExecuteQuery: !readOnly,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formWork"
        className="flex flex-col lg:justify-evenly lg:flex-row"
      >
        <div className="w-3/4 lg:w-[40%]">
          <FormFieldCalendar
            control={form.control}
            description={formFieldsWork.date.description}
            label={formFieldsWork.date.label}
            name={'date'}
            placeholder={formFieldsWork.date.placeholder}
            readOnly={readOnly}
          />
          <FormFieldCommand
            data={queryCrops?.data?.rows || []}
            form={form}
            nameToShow={'name'}
            control={form.control}
            description={formFieldsWork.crop.description}
            label={formFieldsWork.crop.label}
            name={'crop.id'}
            placeholder={formFieldsWork.crop.placeholder}
            readOnly={readOnly}
            isLoading={queryCrops.isLoading}
            nameEntity="cultivo"
            className="w-52"
          />
          <FormFieldTextArea
            className="w-72"
            control={form.control}
            description={formFieldsWork.description.description}
            label={formFieldsWork.description.label}
            name={'description'}
            placeholder={formFieldsWork.description.placeholder}
            readOnly={readOnly}
          />
        </div>

        <div className="lg:w-[50%]">
          <FormFieldDataTable
            control={form.control}
            description={''}
            label={formFieldsWork.details.label}
            name={'details'}
            placeholder={''}
            readOnly={readOnly}
          >
            <FormWorkDataTable />
          </FormFieldDataTable>

          <FormFieldInput
            control={form.control}
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
