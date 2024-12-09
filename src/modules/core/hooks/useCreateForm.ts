import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormChange } from '../components/form/FormChangeContext';

interface Props {
  schema: z.ZodObject<any> | any;
  defaultValues: any;
  skiptDirty?: boolean;
}

export const useCreateForm = ({
  schema,
  defaultValues,
  skiptDirty = false,
}: Props) => {
  const { markChanges } = useFormChange();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (!skiptDirty) {
      isDirty ? markChanges(true) : markChanges(false);
    }
  }, [isDirty]);

  return form;
};
