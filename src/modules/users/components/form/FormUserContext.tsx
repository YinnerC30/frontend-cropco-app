import { useAuthContext } from '@/auth/hooks';
import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserForm } from '../../hooks';
import { FormUserProps } from '../../interfaces/FormUserProps';
import { MODULE_USER_PATHS } from '../../routes/pathsRoutes';

export const FormUserContext = createContext<any>(null);

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

  const { hasPermission } = useAuthContext();

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


