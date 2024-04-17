import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../utils';

export const defaultValues = {
  name: '',
  brand: '',
  unit_of_measure: undefined,
  observation: '',
};

export const useSupplyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return {
    form,
  };
};
