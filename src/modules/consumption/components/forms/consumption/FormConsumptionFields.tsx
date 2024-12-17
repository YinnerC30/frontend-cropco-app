import { Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldDataTable
} from '@/modules/core/components';

import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { formFieldsConsumption } from '@/modules/consumption/utils';
import { FormConsumptionDataTable } from './FormConsumptionDataTable';

export const FormConsumptionFields = () => {
  const { form, onSubmit, readOnly } = useFormConsumptionContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          // Fix: No se envia ID de harvestDetail
          const data = form.watch();
          onSubmit(data);
        })}
        id="formConsumption"
        className=""
      >
        <FormFieldCalendar
          control={form.control}
          description={formFieldsConsumption.date.description}
          label={formFieldsConsumption.date.label}
          name={'date'}
          placeholder={formFieldsConsumption.date.placeholder}
          readOnly={readOnly}
        />
        <div className="sm:w-[600px] mt-4">
          <FormFieldDataTable
            control={form.control}
            description={''}
            label={formFieldsConsumption.details.label}
            name={'details'}
            placeholder={''}
            readOnly={readOnly}
          >
            <FormConsumptionDataTable />
          </FormFieldDataTable>
        </div>
      </form>
    </Form>
  );
};
