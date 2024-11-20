import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormChange } from '../components/form/FormChangeContext';

interface Props {
  schema: z.ZodObject<any> | any;
  defaultValues: any;
}

export const useCreateForm = ({ schema, defaultValues }: Props) => {
  const { markChanges } = useFormChange();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { isDirty, dirtyFields } = form.formState;

  console.log({ isDirty, dirtyFields });

  useEffect(() => {
    isDirty ? markChanges(true) : markChanges(false);
  }, [isDirty]);

  return form;
};
