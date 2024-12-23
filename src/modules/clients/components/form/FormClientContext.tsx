import React, { createContext } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Client } from '../../interfaces/Client';
import { formSchemaClient } from '../../utils';

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
  defaultValues,
  isSubmitting = false,
  onSubmit = (values) => console.log(values),
  readOnly = false,
}) => {
  const form = useCreateForm({
    schema: formSchemaClient,
    defaultValues,
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
