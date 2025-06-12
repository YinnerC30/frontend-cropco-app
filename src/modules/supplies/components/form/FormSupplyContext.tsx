import React, { createContext, useMemo } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Supply } from '../../interfaces/Supply';
import { formSchemaSupply } from '../../utils';

// Definición de los valores por defecto a nivel de módulo
// El usuario deberá ajustar estos campos según la estructura de Supply/formSchemaSupply
export const moduleDefaultValues: Partial<z.infer<typeof formSchemaSupply>> = {
  name: '',
  brand: '',
  unit_of_measure: undefined,
  observation: '',
  // Asegúrate de que todos los campos de formSchemaSupply estén aquí
  // con un valor inicial definido (ej. '', 0, false, [], etc.)
};

export type FormSupplyProps = FormProps<
  z.infer<typeof formSchemaSupply>,
  Supply
>;

export interface FormSupplyContextProps extends FormContextProps {
  onSubmit: (values: z.infer<typeof formSchemaSupply>) => void;
}

export const FormSupplyContext = createContext<
  FormSupplyContextProps | undefined
>(undefined);

export const FormSupplyProvider: React.FC<
  FormSupplyProps & {
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
    schema: formSchemaSupply,
    defaultValues: combinedDefaultValues, // Usar los valores combinados
  });

  return (
    <FormSupplyContext.Provider
      value={{
        form,
        isSubmitting,
        onSubmit,
        readOnly,
      }}
    >
      {children}
    </FormSupplyContext.Provider>
  );
};
