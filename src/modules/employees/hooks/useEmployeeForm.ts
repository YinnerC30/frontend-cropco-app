import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { formSchemaEmployee } from '../utils';

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  address: '',
};

export const useEmployeeForm = () => {
  const form = useCreateForm({ schema: formSchemaEmployee, defaultValues });
  return {
    form,
  };
};
