import { useCreateForm } from '@/modules/core/hooks/useCreateForm';
import { formSchemaSupply } from '../utils';
import { Supply } from '../interfaces/Supply';

export const defaultValues: Supply = {
  name: '',
  brand: '',
  unit_of_measure: undefined,
  observation: '',
};

export const useSupplyForm = ({
  values = defaultValues,
}: {
  values: Supply;
}) => {
  const form = useCreateForm({
    schema: formSchemaSupply,
    defaultValues: values,
  });
  return {
    form,
  };
};
