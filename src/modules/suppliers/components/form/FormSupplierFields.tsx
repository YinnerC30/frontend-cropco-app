import { useFormSupplierContext } from '../../hooks';

import { Form } from '@/components';
import { FormFieldInput, FormFieldTextArea } from '@/modules/core/components';
import { formFieldsSupplier } from '../../utils/formFieldsSupplier';

export const FormSupplierFields: React.FC = () => {
  const { form, onSubmit, readOnly } = useFormSupplierContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formSupplier"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.first_name.description}
          label={formFieldsSupplier.first_name.label}
          name={'first_name'}
          placeholder={formFieldsSupplier.first_name.placeholder}
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.last_name.description}
          label={formFieldsSupplier.last_name.label}
          name={'last_name'}
          placeholder={formFieldsSupplier.last_name.placeholder}
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.email.description}
          label={formFieldsSupplier.email.label}
          name={'email'}
          placeholder={formFieldsSupplier.email.placeholder}
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.cell_phone_number.description}
          label={formFieldsSupplier.cell_phone_number.label}
          name={'cell_phone_number'}
          placeholder={formFieldsSupplier.cell_phone_number.placeholder}
          disabled={readOnly}
        />

        <FormFieldTextArea
          control={form.control}
          description={formFieldsSupplier.address.description}
          label={formFieldsSupplier.address.label}
          name={'address'}
          placeholder={formFieldsSupplier.address.placeholder}
          disabled={readOnly}
          className='sm:w-2/4'
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.company_name.description}
          label={formFieldsSupplier.company_name.label}
          name={'company_name'}
          placeholder={formFieldsSupplier.company_name.placeholder}
          disabled={readOnly}
        />
      </form>
    </Form>
  );
};
