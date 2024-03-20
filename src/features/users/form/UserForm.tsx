import { FormTemplate } from '@/components/form/FormTemplate';
import { Button } from '@/components/ui/button';

import { Link } from 'react-router-dom';
import { UserFormProps } from '../interfaces/UserFormProps';
import { defaultValues, formFields, formSchema } from './ElementsUserForm';

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
        nameButtonReset="Borrar formulario"
      />
      <Button asChild>
        <Link to="../">Cancelar</Link>
      </Button>
    </>
  );
};
