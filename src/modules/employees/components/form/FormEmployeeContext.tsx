import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useEmployeeForm } from '../../hooks/useEmployeeForm';
import { MODULE_EMPLOYEE_PATHS } from '../../routes/pathRoutes';

export const FormEmployeeContext = createContext<any>(null);

export const FormEmployeeProvider = ({
  children,
  defaultValues,

  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useEmployeeForm({
    values: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

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
        hasPermission,
      }}
    >
      {children}
    </FormEmployeeContext.Provider>
  );
};
