import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { formSchemaSupplier } from '../utils/formSchemaSupplier';
import { Supplier } from '../interfaces/Supplier';

const defaultValues: Supplier = {
  first_name: 'demo',
  last_name: 'demo',
  email: 'demo@gmal.com',
  cell_phone_number: '3146547321',
  address: 'sdfsfsdfsdfsfsdfsdf',
  company_name: 'sfsfsdfsfsdfsd',
};

export const useSupplierForm = ({
  values = defaultValues,
}: {
  values: Supplier;
}) => {
  const form = useCreateForm({
    schema: formSchemaSupplier,
    defaultValues: values,
  });
  return {
    form,
  };
};
