import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useFormChange } from '../components/form/FormChangeContext';
import { toast } from 'sonner';

interface Props {
  schema: z.ZodObject<any> | any;
  defaultValues: any;
  skipDirty?: boolean;
  validationMode?: 'onChange' | 'onSubmit' | 'onBlur' | 'all' | 'onTouched';
}

// TODO: Agregar tipado a los fields de useForm
export const useCreateForm = ({
  schema,
  defaultValues,
  skipDirty = false,
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
    const hasCustomErrors = Object.values(errors).some(
      (propiedad) => propiedad && propiedad.type === 'custom'
    );

    if (
      Object.keys(errors).length > 0 &&
      skipDirty === false &&
      !hasCustomErrors
    ) {
      console.log(form.watch())
      toast.error('Faltan campos por rellenar en el formulario');
    }
  }, [errors]);

  useEffect(() => {
    if (skipDirty === false) {
      isDirty ? markChanges(true) : null;
    }
    return () => {
      markChanges(false);
    };
  }, [isDirty]);

  return form;
};
