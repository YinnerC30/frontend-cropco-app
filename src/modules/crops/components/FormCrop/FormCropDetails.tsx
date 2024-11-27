import { useFormCropContext } from './FormCropContext';

import { Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldInput,
  FormFieldTextArea,
} from '@/modules/core/components';
import { formFieldsCrop } from '../../utils';

export const FormCropDetails = () => {
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
          readOnly={readOnly}
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsCrop.description.description}
          label={formFieldsCrop.description.label}
          name={'description'}
          placeholder={formFieldsCrop.description.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsCrop.units.description}
          label={formFieldsCrop.units.label}
          name={'units'}
          placeholder={formFieldsCrop.units.placeholder}
          readOnly={readOnly}
          type="number"
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsCrop.location.description}
          label={formFieldsCrop.location.label}
          name={'location'}
          placeholder={formFieldsCrop.location.placeholder}
          readOnly={readOnly}
        />
        <FormFieldCalendar
          control={form.control}
          description={formFieldsCrop.date_of_creation.description}
          label={formFieldsCrop.date_of_creation.label}
          name={'dates.date_of_creation'}
          placeholder={formFieldsCrop.date_of_creation.placeholder}
          readOnly={readOnly}
        />

        <FormFieldCalendar
          control={form.control}
          description={formFieldsCrop.date_of_termination.description}
          label={formFieldsCrop.date_of_termination.label}
          name={'dates.date_of_termination'}
          placeholder={formFieldsCrop.date_of_termination.placeholder}
          readOnly={readOnly}
        />
      </form>
    </Form>
  );
};
