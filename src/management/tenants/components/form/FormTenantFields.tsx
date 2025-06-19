import { useFormTenantContext } from '../../hooks';

import { Form } from '@/components';
import {
  FormFieldInput,
} from '@/modules/core/components';

import React from 'react';
import { formFieldsTenant } from '../../utils/formFieldsTenant';

export const FormTenantFields: React.FC = () => {
  const { form, onSubmit, readOnly } = useFormTenantContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formTenant"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsTenant.subdomain.description}
          label={formFieldsTenant.subdomain.label}
          name={'subdomain'}
          placeholder={formFieldsTenant.subdomain.placeholder}
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsTenant.company_name.description}
          label={formFieldsTenant.company_name.label}
          name={'company_name'}
          placeholder={formFieldsTenant.company_name.placeholder}
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsTenant.email.description}
          label={formFieldsTenant.email.label}
          name={'email'}
          placeholder={formFieldsTenant.email.placeholder}
          disabled={readOnly}
          // type="email"
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsTenant.cell_phone_number.description}
          label={formFieldsTenant.cell_phone_number.label}
          name={'cell_phone_number'}
          placeholder={formFieldsTenant.cell_phone_number.placeholder}
          disabled={readOnly}
          // type="tel"
        />
      </form>
    </Form>
  );
}; 