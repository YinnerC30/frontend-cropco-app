import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useFormChange } from '../components/form/FormChangeContext';
import { toast } from 'sonner';

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

  const { isDirty, errors } = form.formState;

  useEffect(() => {
    if (Object.keys(errors).length > 0 && skiptDirty === false) {
      toast.error('Faltan campos por rellenar en el formulario');
    }
  }, [errors]);

  useEffect(() => {
    if (skiptDirty === false) {
      isDirty ? markChanges(true) : null;
    }
  }, [isDirty]);

  return form;
};
