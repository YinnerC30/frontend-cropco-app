import { Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldDataTable,
} from '@/modules/core/components';

import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { formFieldsConsumption } from '@/modules/consumption/utils';
import { FormConsumptionDataTable } from './FormConsumptionDataTable';

export const FormConsumptionFields: React.FC = () => {
  const { formConsumption, onSubmit, readOnly } =
    useFormConsumptionContext();

  return (
    <Form {...formConsumption}>
      <form
        onSubmit={formConsumption.handleSubmit(onSubmit)}
        id="formConsumption"
        className=""
      >
        <FormFieldCalendar
          control={formConsumption.control}
          description={formFieldsConsumption.date.description}
          label={formFieldsConsumption.date.label}
          name={'date'}
          placeholder={formFieldsConsumption.date.placeholder}
          disabled={readOnly}
          className='w-[240px]'
        />
        <div className="sm:w-[600px] mt-4">
          <FormFieldDataTable
            control={formConsumption.control}
            description={''}
            label={formFieldsConsumption.details.label}
            name={'details'}
            placeholder={''}
            disabled={readOnly}
          >
            <FormConsumptionDataTable />
          </FormFieldDataTable>
        </div>
      </form>
    </Form>
  );
};
