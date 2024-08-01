import { Button } from '@/components';
import { Form } from '@/components/ui/form';
import { ButtonsForm } from '@/modules/core/components/ButtonsForm';
import { FormFieldCalendar } from '@/modules/core/components/form/FormFieldCalendar';
import { FormFieldInput } from '@/modules/core/components/form/FormFieldInput';
import { FormFieldTextArea } from '@/modules/core/components/form/FormFieldTextArea';
import { FormProps } from '@/modules/core/interfaces/FormProps';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCropForm } from '../hooks/useCropForm';
import { formFieldsCrop } from '../utils';
export const FormCrop = ({
  onSubmit,
  isPending,
  defaultValues,
  readOnly = false,
}: FormProps) => {
  const { form } = useCropForm();
  const navigate = useNavigate();

  useEffect(() => {
    defaultValues && form.reset(defaultValues);
  }, []);
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

      {!readOnly && (
        <ButtonsForm
          isPending={isPending ?? false}
          formId={'formCrop'}
          className={'flex w-48 gap-2 mt-2'}
        />
      )}

      {readOnly && (
        <Button className="my-2" onClick={() => navigate(-1)}>
          Volver
        </Button>
      )}
    </Form>
  );
};
