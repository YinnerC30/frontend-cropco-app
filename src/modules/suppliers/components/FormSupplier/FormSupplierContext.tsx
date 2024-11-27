import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthorization } from '@/modules/authentication/hooks';

import { MODULE_SUPPLIER_PATHS } from '../../routes/pathRoutes';
import { useSupplierForm } from '../../hooks';

const FormSupplierContext = createContext<any>(null);

export const FormSupplierProvider = ({
  children,
  defaultValues,
  hiddenPassword,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useSupplierForm({
    values: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthorization();

  const handleReturnToModule = () => {
    navigate(MODULE_SUPPLIER_PATHS.ViewAll);
  };

  return (
    <FormSupplierContext.Provider
      value={{
        ...formState,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hiddenPassword,
        hasPermission,
      }}
    >
      {children}
    </FormSupplierContext.Provider>
  );
};

export const useFormSupplierContext = () => {
  const context = useContext(FormSupplierContext);
  if (!context) {
    throw new Error(
      'useFormSupplierContext must be used within a FormSupplierProvider'
    );
  }
  return context;
};