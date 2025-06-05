import React, { createContext, useMemo } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Crop } from '../../interfaces/Crop';
import { formSchemaCrop } from '../../utils';

// Definición de los valores por defecto a nivel de módulo
// El usuario deberá ajustar estos campos según la estructura de Crop/formSchemaCrop
export const moduleDefaultValues: Partial<z.infer<typeof formSchemaCrop>> = {
  name: '',
  description: '',
  // Asegúrate de que todos los campos de formSchemaCrop estén aquí
  // con un valor inicial definido (ej. '', 0, false, [], etc.)
};

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
  defaultValues: propsDefaultValues, // Renombrado para claridad
  isSubmitting = false,
  onSubmit = (values) => {},
  readOnly = false,
}) => {
  const combinedDefaultValues = useMemo(() => ({
    ...moduleDefaultValues, // Usar los defaultValues del módulo como base
    ...(propsDefaultValues || {}), // Sobrescribir con los de las props si existen
  }), [propsDefaultValues]);

  const form = useCreateForm({ 
    schema: formSchemaCrop, 
    defaultValues: combinedDefaultValues // Usar los valores combinados
  });

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
