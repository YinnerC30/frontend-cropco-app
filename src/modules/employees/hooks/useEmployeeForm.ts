import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { formSchemaEmployee } from '../utils';

export const defaultValues = {
  first_name: 'demo',
  last_name: 'demo',
  email: 'demo@gmail.com',
  cell_phone_number: '3147746549',
  address: 'ddfsfdfsfsdfdsfdsf',
};

export const useEmployeeForm = ({ values = defaultValues }: any) => {
  const form = useCreateForm({
    schema: formSchemaEmployee,
    defaultValues: values,
  });
  return {
    form,
  };
};
