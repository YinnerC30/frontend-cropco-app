import { FormTemplate } from '@/components/form/FormTemplate';
import { Button } from '@/components/ui/button';

import { Link } from 'react-router-dom';
import { defaultValues, formFields, formSchema } from './ElementsForm';
import { UserFormProps } from './interfaces';

export const UserForm = ({
  values = defaultValues,
  nameButtonSubmit,
  onSubmit,
}: UserFormProps) => {
  return (
    <>
      <FormTemplate
        formSchema={formSchema}
        defaultValues={values}
        onSubmit={onSubmit}
        formFields={formFields}
        nameButtonSubmit={nameButtonSubmit}
      />
      <Button asChild>
        <Link to="../">Cancelar</Link>
      </Button>
    </>
  );
};
