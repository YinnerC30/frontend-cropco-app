import { useFormCropContext } from '../../hooks';

import { Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldInput,
  FormFieldTextArea,
} from '@/modules/core/components';
import { formFieldsCrop } from '../../utils';
import React from 'react';

export const FormCropFields: React.FC = () => {
  const { form, onSubmit, readOnly } = useFormCropContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formCrop"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsCrop.name.description}
          label={formFieldsCrop.name.label}
          name={'name'}
          placeholder={formFieldsCrop.name.placeholder}
          disabled={readOnly}
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsCrop.description.description}
          label={formFieldsCrop.description.label}
          name={'description'}
          placeholder={formFieldsCrop.description.placeholder}
          disabled={readOnly}
          className="sm:w-2/4"
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsCrop.units.description}
          label={formFieldsCrop.units.label}
          name={'units'}
          placeholder={formFieldsCrop.units.placeholder}
          disabled={readOnly}
          type="number"
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsCrop.location.description}
          label={formFieldsCrop.location.label}
          name={'location'}
          placeholder={formFieldsCrop.location.placeholder}
          disabled={readOnly}
          className="sm:w-2/4"
        />
        <FormFieldCalendar
          control={form.control}
          description={formFieldsCrop.date_of_creation.description}
          label={formFieldsCrop.date_of_creation.label}
          name={'dates.date_of_creation'}
          placeholder={formFieldsCrop.date_of_creation.placeholder}
          disabled={readOnly}
          className='w-[240px]'
        />

        <FormFieldCalendar
          control={form.control}
          description={formFieldsCrop.date_of_termination.description}
          label={formFieldsCrop.date_of_termination.label}
          name={'dates.date_of_termination'}
          placeholder={formFieldsCrop.date_of_termination.placeholder}
          disabled={readOnly}
          className='w-[240px]'
        />
      </form>
    </Form>
  );
};
