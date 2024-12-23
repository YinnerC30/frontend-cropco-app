import React, { createContext } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { Employee } from '../../interfaces/Employee';
import { formSchemaEmployee } from '../../utils';
import { z } from 'zod';
import { toast } from 'sonner';

export type FormEmployeeProps = FormProps<
  z.infer<typeof formSchemaEmployee>,
  Employee
>;

interface FormEmployeeContextProps extends FormContextProps {
  onSubmit: (values: z.infer<typeof formSchemaEmployee>) => void;
}

export const FormEmployeeContext = createContext<
  FormEmployeeContextProps | undefined
>(undefined);

export const FormEmployeeProvider: React.FC<
  FormEmployeeProps & {
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
    schema: formSchemaEmployee,
    defaultValues,
  });

  const handleOnSubmit = (values: z.infer<typeof formSchemaEmployee>) => {
    if (!form.formState.isDirty) {
      return toast.info('No se han realizado cambios');
    }
    onSubmit(values);
  };

  return (
    <FormEmployeeContext.Provider
      value={{
        form,
        isSubmitting,
        readOnly,
        onSubmit: handleOnSubmit,
      }}
    >
      {children}
    </FormEmployeeContext.Provider>
  );
};
