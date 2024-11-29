import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useCropForm } from '../../hooks/useCropForm';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

export const FormCropContext = createContext<any>(null);

export const FormCropProvider = ({
  children,
  defaultValues,

  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useCropForm({
    values: defaultValues,
  });
  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_CROPS_PATHS.ViewAll);
  };

  return (
    <FormCropContext.Provider
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
    </FormCropContext.Provider>
  );
};