import { useFormEmployeeContext } from '../../hooks';

import { Form } from '@/components';
import { FormFieldInput, FormFieldTextArea } from '@/modules/core/components';
import { formFieldsEmployee } from '../../utils';

export const FormEmployeeFields: React.FC = () => {
  const { form, onSubmit, readOnly } = useFormEmployeeContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formEmployee"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployee.first_name.description}
          label={formFieldsEmployee.first_name.label}
          name={'first_name'}
          placeholder={formFieldsEmployee.first_name.placeholder}
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployee.last_name.description}
          label={formFieldsEmployee.last_name.label}
          name={'last_name'}
          placeholder={formFieldsEmployee.last_name.placeholder}
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployee.email.description}
          label={formFieldsEmployee.email.label}
          name={'email'}
          placeholder={formFieldsEmployee.email.placeholder}
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployee.cell_phone_number.description}
          label={formFieldsEmployee.cell_phone_number.label}
          name={'cell_phone_number'}
          placeholder={formFieldsEmployee.cell_phone_number.placeholder}
          disabled={readOnly}
        />

        <FormFieldTextArea
          control={form.control}
          description={formFieldsEmployee.address.description}
          label={formFieldsEmployee.address.label}
          name={'address'}
          placeholder={formFieldsEmployee.address.placeholder}
          disabled={readOnly}
          className="sm:w-2/4"
        />
      </form>
    </Form>
  );
};
