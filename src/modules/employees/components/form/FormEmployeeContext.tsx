import React, { createContext } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { Employee } from '../../interfaces/Employee';
import { formSchemaEmployee } from '../../utils';

interface FormEmployeeContextProps extends FormContextProps {
  onSubmit: (values: Employee) => Promise<void>;
}

export const FormEmployeeContext = createContext<
  FormEmployeeContextProps | undefined
>(undefined);

export const FormEmployeeProvider = ({
  children,
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps & { children: React.ReactNode }) => {
  const form = useCreateForm({
    schema: formSchemaEmployee,
    defaultValues,
  });

  return (
    <FormEmployeeContext.Provider
      value={{
        form,
        isSubmitting,
        onSubmit,
        readOnly,
      }}
    >
      {children}
    </FormEmployeeContext.Provider>
  );
};
