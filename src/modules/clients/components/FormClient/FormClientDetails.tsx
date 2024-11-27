import { useFormClientContext } from './FormClientContext';

import { Form } from '@/components';
import { FormFieldInput, FormFieldTextArea } from '@/modules/core/components';
import { formFieldsClient } from '../../utils';

export const FormClientDetails = () => {
  const { form, onSubmit, readOnly } = useFormClientContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formClient"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsClient.first_name.description}
          label={formFieldsClient.first_name.label}
          name={'first_name'}
          placeholder={formFieldsClient.first_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsClient.last_name.description}
          label={formFieldsClient.last_name.label}
          name={'last_name'}
          placeholder={formFieldsClient.last_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsClient.email.description}
          label={formFieldsClient.email.label}
          name={'email'}
          placeholder={formFieldsClient.email.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsClient.cell_phone_number.description}
          label={formFieldsClient.cell_phone_number.label}
          name={'cell_phone_number'}
          placeholder={formFieldsClient.cell_phone_number.placeholder}
          readOnly={readOnly}
        />

        <FormFieldTextArea
          control={form.control}
          description={formFieldsClient.address.description}
          label={formFieldsClient.address.label}
          name={'address'}
          placeholder={formFieldsClient.address.placeholder}
          readOnly={readOnly}
        />
      </form>
    </Form>
  );
};