import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { formSchemaClient } from '../utils';

export const defaultValues = {
  first_name: 'demo',
  last_name: 'demo apellido',
  email: 'demo@gmail.com',
  cell_phone_number: '3142345432',
  address: 'no se .... dfdfdfdf',
};

export const useClientForm = ({ values = defaultValues }: any) => {
  const form = useCreateForm({
    schema: formSchemaClient,
    defaultValues: values,
  });
  return {
    form,
  };
};
