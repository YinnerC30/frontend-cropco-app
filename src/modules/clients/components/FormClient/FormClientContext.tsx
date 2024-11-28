import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthenticationContext } from '@/modules/authentication/hooks';
import { useClientForm } from '../../hooks/useClientForm';
import { MODULE_CLIENTS_PATHS } from '../../routes/pathRoutes';

const FormClientContext = createContext<any>(null);

export const FormClientProvider = ({
  children,
  defaultValues,

  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useClientForm({
    values: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthenticationContext();

  const handleReturnToModule = () => {
    navigate(MODULE_CLIENTS_PATHS.ViewAll);
  };

  return (
    <FormClientContext.Provider
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
    </FormClientContext.Provider>
  );
};

export const useFormClientContext = () => {
  const context = useContext(FormClientContext);
  if (!context) {
    throw new Error(
      'useFormClientContext must be used within a FormClientProvider'
    );
  }
  return context;
};
