import React, { createContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useClientForm } from '../../hooks/useClientForm';
import { MODULE_CLIENTS_PATHS } from '../../routes/pathRoutes';

export const FormClientContext = createContext<any>(null);

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

  const { hasPermission } = useAuthContext();

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

