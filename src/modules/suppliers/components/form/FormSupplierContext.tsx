import React, { createContext } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Supplier } from '../../interfaces/Supplier';
import { formSchemaSupplier } from '../../utils/formSchemaSupplier';

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
  defaultValues,
  isSubmitting = false,
  onSubmit = (values) => console.log(values),
  readOnly = false,
}) => {
  const form = useCreateForm({
    schema: formSchemaSupplier,
    defaultValues,
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
