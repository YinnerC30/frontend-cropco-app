import React, { createContext, useMemo } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Supplier } from '../../interfaces/Supplier';
import { formSchemaSupplier } from '../../utils/formSchemaSupplier';

// Definición de los valores por defecto a nivel de módulo
// El usuario deberá ajustar estos campos según la estructura de Supplier/formSchemaSupplier
export const moduleDefaultValues: Partial<z.infer<typeof formSchemaSupplier>> = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  address: '',
  company_name: '',
  // Asegúrate de que todos los campos de formSchemaSupplier estén aquí
  // con un valor inicial definido (ej. '', 0, false, [], etc.)
};

export type FormSupplierProps = FormProps<
  z.infer<typeof formSchemaSupplier>,
  Supplier
>;

export interface FormSupplierContextProps extends FormContextProps {
  onSubmit: (values: z.infer<typeof formSchemaSupplier>) => void;
}

export const FormSupplierContext = createContext<
  FormSupplierContextProps | undefined
>(undefined);

export const FormSupplierProvider: React.FC<
  FormSupplierProps & {
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
    schema: formSchemaSupplier,
    defaultValues: combinedDefaultValues, // Usar los valores combinados
  });

  return (
    <FormSupplierContext.Provider
      value={{
        form,
        isSubmitting,
        onSubmit,
        readOnly,
      }}
    >
      {children}
    </FormSupplierContext.Provider>
  );
};
