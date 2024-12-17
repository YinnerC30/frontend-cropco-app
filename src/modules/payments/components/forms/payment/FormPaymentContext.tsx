import { useCreateForm } from '@/modules/core/hooks';
import { formSchemaPayments } from '@/modules/payments/utils';
import React, { createContext } from 'react';

export const FormPaymentContext = createContext<any>(null);

export const defaultValuesany: any = {};

export const FormPaymentProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formPayments = useCreateForm({
    schema: formSchemaPayments,
    defaultValues: {
      date: undefined,
      method_of_payment: undefined,
      employee: undefined,
      total: 0,
    },
    validationMode: 'onSubmit',
  });

  return (
    <FormPaymentContext.Provider
      value={{
        form: formPayments,
        employeeId: formPayments.getValues('employee.id') ?? '',
      }}
    >
      {children}
    </FormPaymentContext.Provider>
  );
};
