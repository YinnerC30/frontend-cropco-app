import React, { createContext } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Crop } from '../../interfaces/Crop';
import { formSchemaCrop } from '../../utils';

export type FormCropProps = FormProps<z.infer<typeof formSchemaCrop>, Crop>;

export interface FormCropContextProps extends FormContextProps {
  onSubmit: (values: z.infer<typeof formSchemaCrop>) => void;
}

export const FormCropContext = createContext<FormCropContextProps | undefined>(
  undefined
);

export const FormCropProvider: React.FC<
  FormCropProps & {
    children: React.ReactNode;
  }
> = ({
  children,
  defaultValues,
  isSubmitting = false,
  onSubmit = (values) => console.log(values),
  readOnly = false,
}) => {
  const form = useCreateForm({ schema: formSchemaCrop, defaultValues });

  return (
    <FormCropContext.Provider
      value={{
        form,
        isSubmitting,
        onSubmit,
        readOnly,
      }}
    >
      {children}
    </FormCropContext.Provider>
  );
};
