import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useFormChange } from '../components/form/FormChangeContext';

interface Props {
  schema: z.ZodObject<any> | any;
  defaultValues: any;
  skiptDirty?: boolean;
  validationMode?: 'onChange' | 'onSubmit' | 'onBlur' | 'all' | 'onTouched';
}

// TODO: Agregar tipado a los fields de useForm
export const useCreateForm = ({
  schema,
  defaultValues,
  skiptDirty = false,
  validationMode = 'onChange',
}: Props): UseFormReturn<any, any, undefined> => {
  const { markChanges } = useFormChange();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: validationMode,
  });

  const { isDirty, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (!skiptDirty) {
      isDirty ? markChanges(true) : markChanges(false);
    }
  }, [isDirty]);

  useEffect(() => {
    isSubmitSuccessful && markChanges(false);
  }, [isSubmitSuccessful]);

  return form;
};
