import React, { createContext } from 'react';

import { useCreateForm } from '@/modules/core/hooks';
import { FormContextProps, FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { Supply } from '../../interfaces/Supply';
import { formSchemaSupply } from '../../utils';

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
  defaultValues,
  isSubmitting = false,
  onSubmit = (values) => console.log(values),
  readOnly = false,
}) => {
  const form = useCreateForm({
    schema: formSchemaSupply,
    defaultValues,
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
