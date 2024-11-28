import React, { createContext, useContext } from 'react';
import { useUserForm } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';
import { FormUserProps } from '../../interfaces/FormUserProps';
import { useAuthenticationContext } from '@/modules/authentication/hooks';

const FormUserContext = createContext<any>(null);

export const FormUserProvider = ({
  children,
  defaultValues,
  hiddenPassword,
  isSubmitting,
  onSubmit,
  readOnly,
  showAlert,
}: FormUserProps & { children: React.ReactNode }) => {
  const formState = useUserForm({
    hiddenPassword,
    formValues: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthenticationContext();

  const handleReturnToModule = () => {
    navigate(MODULE_USER_PATHS.ViewAll);
  };

  return (
    <FormUserContext.Provider
      value={{
        ...formState,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hiddenPassword,
        hasPermission,
        showAlert,
      }}
    >
      {children}
    </FormUserContext.Provider>
  );
};

export const useFormUserContext = () => {
  const context = useContext(FormUserContext);
  if (!context) {
    throw new Error(
      'useFormUserContext must be used within a FormUserProvider'
    );
  }
  return context;
};
