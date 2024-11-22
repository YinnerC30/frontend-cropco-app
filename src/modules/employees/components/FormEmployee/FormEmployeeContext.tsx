import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthorization } from '@/modules/authentication/hooks';
import { useEmployeeForm } from '../../hooks/useEmployeeForm';
import { MODULE_EMPLOYEE_PATHS } from '../../routes/pathRoutes';

const FormEmployeeContext = createContext<any>(null);

export const FormEmployeeProvider = ({
  children,
  defaultValues,
  hiddenPassword,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useEmployeeForm({
    values: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthorization();

  const handleReturnToModule = () => {
    navigate(MODULE_EMPLOYEE_PATHS.ViewAll);
  };

  return (
    <FormEmployeeContext.Provider
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
    </FormEmployeeContext.Provider>
  );
};

export const useFormEmployeeContext = () => {
  const context = useContext(FormEmployeeContext);
  if (!context) {
    throw new Error(
      'useFormEmployeeContext must be used within a FormEmployeeProvider'
    );
  }
  return context;
};
