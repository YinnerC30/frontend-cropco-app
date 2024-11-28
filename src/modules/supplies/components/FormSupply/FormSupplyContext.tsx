import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/modules/authentication/hooks';
import { useSupplyForm } from '../../hooks/useSupplyForm';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';

const FormSupplyContext = createContext<any>(null);

export const FormSupplyProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useSupplyForm({
    values: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_SUPPLIES_PATHS.ViewAll);
  };

  return (
    <FormSupplyContext.Provider
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
    </FormSupplyContext.Provider>
  );
};

export const useFormSupplyContext = () => {
  const context = useContext(FormSupplyContext);
  if (!context) {
    throw new Error(
      'useFormSupplyContext must be used within a FormSupplyProvider'
    );
  }
  return context;
};
