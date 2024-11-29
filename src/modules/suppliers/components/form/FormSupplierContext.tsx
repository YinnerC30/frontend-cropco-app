import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';

import { MODULE_SUPPLIER_PATHS } from '../../routes/pathRoutes';
import { useSupplierForm } from '../../hooks';

export const FormSupplierContext = createContext<any>(null);

export const FormSupplierProvider = ({
  children,
  defaultValues,

  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useSupplierForm({
    values: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

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

        hasPermission,
      }}
    >
      {children}
    </FormSupplierContext.Provider>
  );
};
