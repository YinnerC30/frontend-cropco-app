import React, { createContext, useMemo } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Tenant } from '../../interfaces/Tenant';
import { formSchemaTenant } from '../../utils/formSchemaTenant';

// Definición de los valores por defecto a nivel de módulo
export const moduleDefaultValues: Partial<z.infer<typeof formSchemaTenant>> = {
  subdomain: '',
  company_name: '',
  email: '',
  cell_phone_number: '',
};

export type FormTenantProps = FormProps<
  z.infer<typeof formSchemaTenant>,
  Tenant
>;

export interface FormTenantContextProps extends FormContextProps {
  onSubmit: (values: z.infer<typeof formSchemaTenant>) => void;
}

export const FormTenantContext = createContext<
  FormTenantContextProps | undefined
>(undefined);

export const FormTenantProvider: React.FC<
  FormTenantProps & {
    children: React.ReactNode;
  }
> = ({
  children,
  defaultValues: propsDefaultValues,
  isSubmitting = false,
  onSubmit = (values) => {},
  readOnly = false,
}) => {
  const combinedDefaultValues = useMemo(
    () => ({
      ...moduleDefaultValues,
      ...(propsDefaultValues || {}),
    }),
    [propsDefaultValues]
  );

  const form = useCreateForm({
    schema: formSchemaTenant,
    defaultValues: combinedDefaultValues,
  });

  return (
    <FormTenantContext.Provider
      value={{
        form,
        isSubmitting,
        onSubmit,
        readOnly,
      }}
    >
      {children}
    </FormTenantContext.Provider>
  );
};
