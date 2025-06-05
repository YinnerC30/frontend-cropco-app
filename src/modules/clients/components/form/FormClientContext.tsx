import React, { createContext, useMemo } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Client } from '../../interfaces/Client';
import { formSchemaClient } from '../../utils';

// Definición de los valores por defecto a nivel de módulo
// El usuario deberá ajustar estos campos según la estructura de Client/formSchemaClient
export const moduleDefaultValues: Partial<z.infer<typeof formSchemaClient>> = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  address: '',
  // Asegúrate de que todos los campos de formSchemaClient estén aquí
  // con un valor inicial definido (ej. '', 0, false, [], etc.)
};

export type FormClientProps = FormProps<
  z.infer<typeof formSchemaClient>,
  Client
>;

export interface FormClientContextProps extends FormContextProps {
  onSubmit: (values: z.infer<typeof formSchemaClient>) => void;
}

export const FormClientContext = createContext<
  FormClientContextProps | undefined
>(undefined);

export const FormClientProvider: React.FC<
  FormClientProps & {
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
    schema: formSchemaClient,
    defaultValues: combinedDefaultValues, // Usar los valores combinados
  });

  return (
    <FormClientContext.Provider
      value={{
        form,
        isSubmitting,
        onSubmit,
        readOnly,
      }}
    >
      {children}
    </FormClientContext.Provider>
  );
};
